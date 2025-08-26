import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, RefreshCw, Pause, Play, AlertCircle, Clock } from "lucide-react";
import { FilterBar, FilterState } from '../components/trading/FilterBar';
import { NewTerminalTable } from '../components/trading/NewTerminalTable';
import { BettingOpportunity } from '../../shared/schema';
import { CategoryTabs, CategoryBadge } from '../components/CategoryTabs';
import { BetCategorizer, type BetCategory } from '../../../shared/betCategories';
import { CacheService } from '@/services/cacheService';
import LaunchStatusWidget from '../components/LaunchStatusWidget';

// Available sportsbooks for filtering
const AVAILABLE_BOOKS = [
  'FanDuel', 'DraftKings', 'BetMGM', 'Caesars', 'BetRivers', 'ESPN BET', 'Fanatics',
  'Fliff', 'PrizePicks', 'Underdog', 'Bettr', 'Bet365', 'Pinnacle', 'Bovada', 'BetOnline'
];

const AVAILABLE_LEAGUES = [
  'nfl', 'nba', 'mlb', 'nhl', 'ncaaf', 'ncaab', 'soccer', 'tennis', 'golf', 'mma', 'boxing'
];

// Transform backend data to new table format
const transformOpportunityData = (backendData: any[]): BettingOpportunity[] => {
  return backendData.map(item => ({
    id: item.id || `${item.game}-${item.market}-${Date.now()}`,
    event: {
      home: item.game?.split(' vs ')[1] || item.homeTeam || 'Team B',
      away: item.game?.split(' vs ')[0] || item.awayTeam || 'Team A',
      sport: item.sport || 'unknown',
      league: item.sport || 'unknown',
      startTime: item.gameTime || new Date().toISOString(),
      status: item.truthStatus === 'LIVE' ? 'live' : 'prematch'
    },
    market: {
      type: item.market || 'Moneyline',
      side: item.betType || item.line || 'home',
      line: typeof item.line === 'string' && item.line.includes('.') ? parseFloat(item.line) : undefined,
      player: item.playerName,
      value: item.line
    },
    myPrice: {
      odds: item.mainBookOdds || item.oddsComparison?.[0]?.odds || 100,
      book: item.mainSportsbook || item.oddsComparison?.[0]?.sportsbook || 'Unknown'
    },
    fieldPrices: (item.oddsComparison || []).slice(1, 10).map((odds: any) => ({
      book: odds.sportsbook || 'Unknown',
      odds: odds.odds || 100
    })),
    evPercent: item.ev || 0,
    fairProbability: item.hit || item.impliedProbability || 0.5,
    updatedAt: item.lastUpdated || new Date().toISOString(),
    // Legacy fields for backward compatibility
    game: item.game,
    bet: item.bet,
    sportsbook: item.mainSportsbook,
    ev: item.ev,
    category: item.category || 'ev',
    sport: item.sport,
    league: item.sport,
    gameTime: item.gameTime,
    lastUpdated: item.lastUpdated,
    playerName: item.playerName,
    propType: item.propType,
    propValue: item.propValue,
    propDescription: item.propDescription
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
    minMaxOddsRange: [-1000, 1000],
    minimumDataPoints: 3,
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
      minMaxOddsRange: [-1000, 1000],
      minimumDataPoints: 3,
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

  // Transform and filter opportunities
  const opportunities = React.useMemo(() => {
    let transformed = transformOpportunityData(rawOpportunities);
    
    // Apply category filter
    if (activeCategory !== 'all') {
      transformed = transformed.filter(opp => opp.category === activeCategory);
    }
    
    return transformed;
  }, [rawOpportunities, activeCategory]);

  // Time display
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Clean Page Gradient - No overlapping text */}
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#D8AC35]/10">
        {/* Full-screen Trading Terminal */}
        <div className="min-h-screen">
          <Tabs defaultValue="opportunities" className="w-full min-h-screen">
            {/* Trading Terminal Design */}
            <div className="min-h-screen flex flex-col">
              {/* Terminal Header */}
              <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm px-8 py-6 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-6 w-6 text-[#D8AC35] dark:text-[#D8AC35]" />
                      <h2 className="text-2xl font-bold tracking-wide text-gray-900 dark:text-white">TRADING TERMINAL</h2>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#D8AC35] rounded-full animate-pulse"></div>
                      <span className="text-gray-600 dark:text-gray-300 font-mono">LIVE MARKET DATA</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                      <TabsList className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50">
                        <TabsTrigger value="opportunities" className="text-xs font-mono data-[state=active]:bg-[#D8AC35] data-[state=active]:text-white dark:data-[state=active]:bg-[#D8AC35] dark:data-[state=active]:text-black">LIVE OPPORTUNITIES</TabsTrigger>
                        <TabsTrigger value="calculator" className="text-xs font-mono data-[state=active]:bg-[#D8AC35] data-[state=active]:text-white dark:data-[state=active]:bg-[#D8AC35] dark:data-[state=active]:text-black">EV CALCULATOR</TabsTrigger>
                        <TabsTrigger value="comparison" className="text-xs font-mono data-[state=active]:bg-[#D8AC35] data-[state=active]:text-white dark:data-[state=active]:bg-[#D8AC35] dark:data-[state=active]:text-black">ODDS COMPARISON</TabsTrigger>
                        <TabsTrigger value="launch-status" className="text-xs font-mono data-[state=active]:bg-[#D8AC35] data-[state=active]:text-white dark:data-[state=active]:bg-[#D8AC35] dark:data-[state=active]:text-black">LAUNCH STATUS</TabsTrigger>
                      </TabsList>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                      {currentTime.toLocaleTimeString('en-US', { 
                        hour12: true,
                        hour: '2-digit',
                        minute: '2-digit', 
                        second: '2-digit',
                        timeZone: 'America/New_York'
                      })} EST
                    </div>
                    <div className="w-3 h-3 bg-[#D8AC35] dark:bg-[#D8AC35] rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <TabsContent value="opportunities" className="min-h-screen m-0 p-0 flex-1">
                <div className="flex flex-col min-h-screen">
                  <div className="flex-1 p-8 space-y-6">
                    {/* Category Navigation */}
                    <div className="flex items-center justify-between">
                      <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} opportunities={opportunities} />
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setIsPaused(!isPaused);
                            if (!isPaused) {
                              setLastUpdated(new Date());
                            }
                          }}
                          className="font-mono text-xs"
                        >
                          {isPaused ? <Play className="h-3 w-3 mr-2" /> : <Pause className="h-3 w-3 mr-2" />}
                          {isPaused ? 'RESUME' : 'PAUSE'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => refetch()}
                          className="font-mono text-xs"
                        >
                          <RefreshCw className="h-3 w-3 mr-2" />
                          REFRESH
                        </Button>
                      </div>
                    </div>

                    {/* New Professional Trading Terminal Table */}
                    <NewTerminalTable 
                      opportunities={opportunities}
                      loading={isLoading}
                      error={error?.message}
                      onRowClick={(opportunity) => {
                        // Handle row click if needed
                        console.log('Clicked opportunity:', opportunity);
                      }}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Other Tabs */}
              <TabsContent value="calculator" className="min-h-screen m-0 p-0 flex-1">
                <div className="p-8 space-y-6">
                  <div className="text-center py-16">
                    <h3 className="text-lg font-mono text-gray-600 dark:text-gray-400 mb-2">EV CALCULATOR</h3>
                    <p className="text-gray-500 dark:text-gray-500 font-mono text-sm">
                      Coming soon - advanced calculator features.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="comparison" className="min-h-screen m-0 p-0 flex-1">
                <div className="p-8">
                  <div className="text-center py-16">
                    <h3 className="text-lg font-mono text-gray-600 dark:text-gray-400 mb-2">ODDS COMPARISON</h3>
                    <p className="text-gray-500 dark:text-gray-500 font-mono text-sm">
                      Coming soon - comprehensive odds comparison tools.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="launch-status" className="min-h-screen m-0 p-0 flex-1">
                <div className="p-8">
                  <LaunchStatusWidget />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}