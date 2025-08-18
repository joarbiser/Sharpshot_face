import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, RefreshCw, Pause, Play, AlertCircle } from "lucide-react";
import { FilterBar, FilterState } from '../components/trading/FilterBar';
import { OpportunityTable, BettingOpportunity } from '../components/trading/OpportunityTable';
import { CategoryTabs } from '../components/CategoryTabs';
import { BetCategorizer, type BetCategory } from '../../../shared/betCategories';
import { CacheService } from '@/services/cacheService';
// import LaunchStatusWidget from '../components/LaunchStatusWidget';
import { formatDistanceToNow } from 'date-fns';

// Available sportsbooks for filtering
const AVAILABLE_BOOKS = [
  'FanDuel', 'DraftKings', 'BetMGM', 'Caesars', 'BetRivers', 'ESPN BET', 'Fanatics',
  'Fliff', 'PrizePicks', 'Underdog', 'Bettr', 'Bet365', 'Pinnacle', 'Bovada', 'BetOnline'
];

const AVAILABLE_LEAGUES = [
  'nfl', 'nba', 'mlb', 'nhl', 'ncaaf', 'ncaab', 'soccer', 'tennis', 'golf', 'mma', 'boxing'
];

// Transform backend data to table format
const transformOpportunityData = (backendData: any): BettingOpportunity[] => {
  // Handle different API response formats
  let dataArray = [];
  if (Array.isArray(backendData)) {
    dataArray = backendData;
  } else if (backendData?.opportunities && Array.isArray(backendData.opportunities)) {
    dataArray = backendData.opportunities;
  } else if (backendData) {
    console.log('Unexpected backend data format:', backendData);
    return [];
  }
  
  if (!dataArray || dataArray.length === 0) {
    return [];
  }
  
  return dataArray.map(item => ({
    id: item.id || `${item.game}-${item.market}-${Date.now()}`,
    event: {
      home: item.game?.split(' vs ')[0] || item.homeTeam || 'Team A',
      away: item.game?.split(' vs ')[1] || item.awayTeam || 'Team B',
      league: item.sport || 'unknown',
      startTime: item.gameTime || new Date().toISOString(),
      status: item.truthStatus === 'LIVE' ? 'live' : 'prematch'
    },
    market: {
      type: item.market?.toLowerCase() || 'moneyline',
      side: item.betType || item.line || 'home',
      line: typeof item.line === 'string' && item.line.includes('.') ? parseFloat(item.line) : undefined,
      player: item.playerName
    },
    fairOdds: item.fairOdds || (item.hit ? Math.round(100 / item.hit - 100) : 100),
    fairProbability: item.hit || item.impliedProbability || 0.5,
    evPercent: item.ev || 0,
    myPrice: {
      odds: item.mainBookOdds || item.oddsComparison?.[0]?.odds || 100,
      book: item.mainSportsbook || item.oddsComparison?.[0]?.sportsbook || 'Unknown',
      url: item.betUrl
    },
    fieldPrices: (item.oddsComparison || []).slice(1, 10).map((odds: any) => ({
      book: odds.sportsbook || 'Unknown',
      odds: odds.odds || 100,
      line: odds.line,
      url: odds.url
    })),
    consensus: item.oddsComparison?.length > 1 ? {
      count: item.oddsComparison.length,
      avgOdds: Math.round(item.oddsComparison.reduce((sum: number, o: any) => sum + (o.odds || 0), 0) / item.oddsComparison.length)
    } : undefined,
    updatedAt: item.lastUpdated || new Date().toISOString(),
    category: item.category || 'ev'
  }));
};

export default function TradingTerminal() {
  const [activeCategory, setActiveCategory] = useState<BetCategory>('all');
  const [isPaused, setIsPaused] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const cacheService = CacheService.getInstance();
  
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    leagues: [],
    markets: [],
    livePreMatch: 'all',
    oddsRange: [-Infinity, Infinity],
    myBooks: ['FanDuel'], // Default to FanDuel
    evThreshold: 3,
    search: ''
  });
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      leagues: [],
      markets: [],
      livePreMatch: 'all',
      oddsRange: [-Infinity, Infinity],
      myBooks: ['FanDuel'],
      evThreshold: 3,
      search: ''
    });
  };
  
  // Fetch opportunities from backend
  const { 
    data: rawOpportunities = [], 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['/api/betting/upcoming-opportunities'],
    refetchInterval: isPaused ? false : 30000,
    staleTime: 25000,
    onSuccess: () => {
      setLastUpdated(new Date());
    }
  });

  // Fetch stats
  const { data: terminalStats } = useQuery({
    queryKey: ['/api/betting/terminal-stats'],
    refetchInterval: 8000
  });

  // Transform and filter opportunities
  const opportunities = React.useMemo(() => {
    let transformed = transformOpportunityData(rawOpportunities);
    
    // Apply category filter
    if (activeCategory !== 'all') {
      transformed = transformed.filter(opp => opp.category === activeCategory);
    }
    
    // Apply filters
    return transformed.filter(opp => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch = [
          opp.event.home,
          opp.event.away,
          opp.event.league,
          opp.market.type,
          opp.market.player
        ].some(field => field?.toLowerCase().includes(searchTerm));
        if (!matchesSearch) return false;
      }
      
      // League filter
      if (filters.leagues.length > 0 && !filters.leagues.includes(opp.event.league)) {
        return false;
      }
      
      // Market filter
      if (filters.markets.length > 0 && filters.markets[0] !== 'all' && !filters.markets.includes(opp.market.type)) {
        return false;
      }
      
      // Live/Prematch filter
      if (filters.livePreMatch !== 'all' && opp.event.status !== filters.livePreMatch) {
        return false;
      }
      
      // EV threshold filter
      if (opp.evPercent < filters.evThreshold) {
        return false;
      }
      
      // Odds range filter
      if (opp.myPrice.odds < filters.oddsRange[0] || opp.myPrice.odds > filters.oddsRange[1]) {
        return false;
      }
      
      return true;
    });
  }, [rawOpportunities, activeCategory, filters]);

  const handleRowClick = (opportunity: BettingOpportunity) => {
    // Optional: Handle row click actions
    console.log('Row clicked:', opportunity);
  };

  const handleRefresh = () => {
    setIsPaused(false);
    refetch();
  };

  const clearCache = async () => {
    try {
      await cacheService.clearCache();
      refetch();
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Launch Status Widget - Temporarily disabled */}
      {/* <div className="fixed top-4 right-4 z-50">
        <LaunchStatusWidget />
      </div> */}

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Trading Terminal</h1>
            <p className="text-muted-foreground">Real-time betting opportunities with advanced analytics</p>
          </div>
          
          <div className="flex items-center gap-2">
            {lastUpdated && (
              <span className="text-sm text-muted-foreground">
                Updated {formatDistanceToNow(lastUpdated, { addSuffix: true })}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPaused(!isPaused)}
              className={isPaused ? 'text-green-600' : 'text-orange-600'}
            >
              {isPaused ? <Play className="h-4 w-4 mr-1" /> : <Pause className="h-4 w-4 mr-1" />}
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {terminalStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-[#D8AC35]" />
                  <div className="ml-2">
                    <p className="text-sm font-medium">Books Scanned</p>
                    <p className="text-2xl font-bold">{terminalStats.booksScanned || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-green-600" />
                  <div className="ml-2">
                    <p className="text-sm font-medium">+EV Signals</p>
                    <p className="text-2xl font-bold">{terminalStats.evSignals || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-blue-600 rounded-full" />
                  <div className="ml-2">
                    <p className="text-sm font-medium">Arbitrage</p>
                    <p className="text-2xl font-bold">{terminalStats.arbSignals || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-purple-600 rounded-full" />
                  <div className="ml-2">
                    <p className="text-sm font-medium">Middling</p>
                    <p className="text-2xl font-bold">{terminalStats.middleSignals || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Category Tabs */}
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          opportunities={opportunities}
          className="border-b"
        />

        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          onFiltersChange={setFilters}
          onReset={resetFilters}
          availableLeagues={AVAILABLE_LEAGUES}
          availableBooks={AVAILABLE_BOOKS}
        />

        {/* Opportunity Table */}
        <OpportunityTable
          opportunities={opportunities}
          loading={isLoading}
          error={error ? 'Failed to load opportunities' : undefined}
          onRowClick={handleRowClick}
        />

        {/* Cache Management */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {opportunities.length} opportunities
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearCache}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear Cache
          </Button>
        </div>
      </div>
    </div>
  );
}