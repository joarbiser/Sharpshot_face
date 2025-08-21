import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, RefreshCw, Pause, Play, AlertCircle } from "lucide-react";
import { FilterBar, FilterState } from '../components/trading/FilterBar';
import { BettingOpportunity } from '../components/trading/OpportunityTable';
import { TerminalTable } from '../components/trading/TerminalTable';
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
  
  return dataArray.map((item: any) => ({
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
      side: (() => {
        // For moneyline, extract team from line field
        if (item.market?.toLowerCase() === 'moneyline' && item.line) {
          const teams = item.line.split(' vs ');
          if (teams.length === 2) {
            // Return the first team as the side
            return teams[0].trim();
          }
        }
        
        // For totals: "O/U 2.5" format
        if (item.market?.toLowerCase() === 'total' && item.line) {
          if (item.line.includes('O/U') || item.line.includes('Over') || item.line.includes('Under')) {
            // Default to "over" for O/U format, could be refined based on odds analysis
            return 'over';
          }
        }
        
        // For spreads: "-0.5 spread" format
        if (item.market?.toLowerCase() === 'spread' && item.line) {
          const teams = item.game?.split(' vs ') || [];
          const lineMatch = item.line.match(/[-+]?(\d+\.?\d*)/);
          if (lineMatch) {
            const lineValue = parseFloat(lineMatch[0]);
            // Determine which team based on positive/negative spread
            return lineValue < 0 ? (teams[0] || 'home') : (teams[1] || 'away');
          }
        }
        
        return 'home';
      })(),
      line: (() => {
        // Extract numeric line from specific formats
        if (item.line && typeof item.line === 'string') {
          // For spreads: "-0.5 spread" -> -0.5
          if (item.line.includes('spread')) {
            const match = item.line.match(/[-+]?(\d+\.?\d*)/);
            if (match) {
              return parseFloat(match[0]);
            }
          }
          // For totals: "O/U 2.5" -> 2.5
          if (item.line.includes('O/U') || item.line.includes('Over') || item.line.includes('Under')) {
            const match = item.line.match(/(\d+\.?\d*)/);
            if (match) {
              return parseFloat(match[0]);
            }
          }
          // Generic numeric extraction
          const match = item.line.match(/[-+]?(\d+\.?\d*)/);
          if (match) {
            const numValue = parseFloat(match[0]);
            return !isNaN(numValue) ? numValue : undefined;
          }
        }
        return typeof item.line === 'number' ? item.line : undefined;
      })(),
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
    fieldPrices: (() => {
      const oddsComparison = item.oddsComparison || [];
      const seenBooks = new Set();
      const uniquePrices: Array<{book: string, odds: number, line?: number, url?: string}> = [];
      
      // Skip first item (that's the main book) and deduplicate the rest
      for (let i = 1; i < oddsComparison.length && uniquePrices.length < 10; i++) {
        const odds = oddsComparison[i];
        const bookName = odds.sportsbook || 'Unknown';
        
        // Only add if we haven't seen this book name before
        if (!seenBooks.has(bookName)) {
          seenBooks.add(bookName);
          uniquePrices.push({
            book: bookName,
            odds: odds.odds || 100,
            line: odds.line,
            url: odds.url
          });
        }
      }
      
      return uniquePrices;
    })(),
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
  const [density, setDensity] = useState<'comfortable' | 'compact'>('compact');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const cacheService = CacheService.getInstance();
  
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    leagues: [],
    markets: [],
    livePreMatch: 'all',
    oddsRange: [-Infinity, Infinity],
    minMaxOddsRange: [-Infinity, Infinity],
    minimumDataPoints: 1,
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
      minMaxOddsRange: [-Infinity, Infinity],
      minimumDataPoints: 1,
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
    staleTime: 25000
  });

  // Update lastUpdated when data changes
  React.useEffect(() => {
    if (rawOpportunities && Array.isArray(rawOpportunities) && rawOpportunities.length > 0) {
      setLastUpdated(new Date());
    }
  }, [rawOpportunities]);

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
      await cacheService.clearBettingCache();
      refetch();
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden font-mono">
      <div className="flex-1 flex flex-col p-3 space-y-3 min-h-0">
        {/* Header with Blotter Counters */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3">
          <div className="flex items-center justify-between">
            {/* Left: Blotter Counters */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 px-3 py-1 bg-zinc-900 border border-zinc-700 rounded-full text-xs">
                <span className="text-zinc-400">Books</span>
                <span className="text-white font-medium">{(terminalStats as any)?.booksScanned || 0}</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-zinc-900 border border-zinc-700 rounded-full text-xs">
                <span className="text-green-400">+EV</span>
                <span className="text-white font-medium">{(terminalStats as any)?.evSignals || 0}</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-zinc-900 border border-zinc-700 rounded-full text-xs">
                <span className="text-blue-400">Arb</span>
                <span className="text-white font-medium">{(terminalStats as any)?.arbitrage || 0}</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-zinc-900 border border-zinc-700 rounded-full text-xs">
                <span className="text-yellow-400">Mid</span>
                <span className="text-white font-medium">{(terminalStats as any)?.middling || 0}</span>
              </div>
            </div>
            
            {/* Right: Controls */}
            <div className="flex items-center gap-2">
              {lastUpdated && (
                <span className="text-xs text-zinc-400 font-mono">
                  Updated {formatDistanceToNow(lastUpdated, { addSuffix: true })}
                </span>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800 text-xs"
              >
                <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPaused(!isPaused)}
                className={`text-xs ${isPaused ? 'text-green-400 hover:bg-green-900/20' : 'text-orange-400 hover:bg-orange-900/20'}`}
              >
                {isPaused ? <Play className="h-3 w-3 mr-1" /> : <Pause className="h-3 w-3 mr-1" />}
                {isPaused ? 'Resume' : 'Pause'}
              </Button>
            </div>
          </div>
        </div>

        {/* Filters Bar - Terminal Style */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3">
          <FilterBar
            filters={filters}
            onFiltersChange={setFilters}
            onReset={resetFilters}
            availableLeagues={AVAILABLE_LEAGUES}
            availableBooks={AVAILABLE_BOOKS}
          />
        </div>

        {/* Trading Terminal Table */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <TerminalTable
            opportunities={opportunities}
            loading={isLoading}
            error={error ? 'Failed to load opportunities' : undefined}
            onRowClick={handleRowClick}
            className="h-full"
            density={density}
          />
        </div>

        {/* Bottom Status Bar */}
        <div className="flex justify-between items-center px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs font-mono">
          <div className="text-zinc-400">
            Showing <span className="text-white font-medium">{opportunities.length}</span> opportunities
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDensity(density === 'compact' ? 'comfortable' : 'compact')}
              className="text-zinc-400 hover:text-white text-xs"
            >
              Density: {density === 'compact' ? 'Compact' : 'Comfortable'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCache}
              className="text-zinc-400 hover:text-white text-xs"
            >
              Clear Cache
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}