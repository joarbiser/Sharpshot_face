import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { BettingPreset, PresetManager } from '../../../shared/presets';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Calculator as CalculatorIcon, Target, AlertCircle, ExternalLink, Clock } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { getSportsbookLogo, SportsbookDot } from '@/lib/sportsbookLogos';
import { SportsbookLogo } from '../components/SportsbookLogo';
import { routeToBet } from "@/lib/betRouting";
import { formatInUserTimezone, getUserTimezone, TimezoneInfo } from '@/lib/timezone';
import { CategoryTabs, CategoryBadge } from '../components/CategoryTabs';
import { BetCategorizer, type BetCategory } from '../../../shared/betCategories';

import { ArbitrageCalculator, MiddlingCalculator } from '@/components/ArbitrageCalculator';
import ImpliedProbabilityCalculator from '@/components/ImpliedProbabilityCalculator';
// Import sportsbooks data through a shared module
const SPORTSBOOKS = {
  'FanDuel': { name: 'FanDuel', logo: '/booklogos/fanduel.png', displayName: 'FanDuel' },
  'DraftKings': { name: 'DraftKings', logo: '/booklogos/draftkings.png', displayName: 'DraftKings' },
  'Caesars': { name: 'Caesars', logo: '/booklogos/ceasars.png', displayName: 'Caesars' },
  'BetRivers': { name: 'BetRivers', logo: '/booklogos/betrivers.png', displayName: 'BetRivers' },
  'ESPNBET': { name: 'ESPN BET', logo: '/booklogos/espnbet.png', displayName: 'ESPN BET' },
  'Fanatics': { name: 'Fanatics', logo: '/booklogos/fanatics.png', displayName: 'Fanatics' },
  'BetOnline': { name: 'BetOnline', logo: '/booklogos/betonline.jpg', displayName: 'BetOnline' },
  'Bovada': { name: 'Bovada', logo: '/booklogos/bovada.jpg', displayName: 'Bovada' },
  'PuntNow': { name: 'PuntNow', logo: '/booklogos/puntnow.png', displayName: 'PuntNow' },
  'Sportszino': { name: 'Sportszino', logo: '/booklogos/sportszino.jpg', displayName: 'Sportszino' },
  'SportTrade': { name: 'SportTrade', logo: '/booklogos/sporttrade.jpg', displayName: 'SportTrade' }
};

// Custom hook for live time
const useLiveTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return currentTime;
};

interface SportsbookOdds {
  sportsbook: string;
  odds: number;
  ev: number;
  isMainBook?: boolean;
}

interface BettingOpportunity {
  id: string;
  sport: string;
  game: string;
  market: string;
  betType: string;
  line: string;
  mainBookOdds: number;
  ev: number;
  hit: number;
  impliedProbability: number;
  gameTime: string;
  confidence: string;
  category?: BetCategory;
  arbitrageProfit?: number;
  oddsComparison: SportsbookOdds[];
}

export default function TradingTerminal() {
  const [selectedSport, setSelectedSport] = useState("all");
  const [minEV, setMinEV] = useState("3");
  const currentTime = useLiveTime();
  const [opportunities, setOpportunities] = useState<BettingOpportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [userTimezone, setUserTimezone] = useState<TimezoneInfo | null>(null);
  const [mainSportsbook, setMainSportsbook] = useState("all");
  const [activeCategory, setActiveCategory] = useState<BetCategory>('all');
  const [selectedSportsbooks, setSelectedSportsbooks] = useState<string[]>(['all']);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  // New filter states for improved UI
  const [selectedMarket, setSelectedMarket] = useState("all"); // Moneyline, Total, All
  const [selectedSportsbookFilter, setSelectedSportsbookFilter] = useState("all"); // Dropdown filter for books
  const [selectedEventLeague, setSelectedEventLeague] = useState("all"); // Event/League filter

  useEffect(() => {
    setUserTimezone(getUserTimezone());
  }, []);

  // Enhanced real-time opportunities with side-by-side odds comparison (15-second intervals)
  const { data: opportunitiesData, isLoading: isLoadingOpportunities, isRefetching, error: opportunitiesError } = useQuery({
    queryKey: ['/api/betting/live-opportunities'],
    queryFn: async () => {
      try {
        console.log('🔄 Fetching live betting opportunities with comprehensive side-by-side odds comparison...');
        const response = await fetch(`/api/betting/live-opportunities`);
        if (!response.ok) {
          throw new Error('Failed to fetch betting opportunities');
        }
        const data = await response.json();
        console.log(`✅ Received ${data.opportunities?.length || 0} opportunities with side-by-side odds from multiple sportsbooks`);
        return data;
      } catch (error) {
        console.error('❌ Error fetching betting opportunities:', error);
        // Return fallback empty structure instead of throwing
        return { opportunities: [] };
      }
    },
    refetchInterval: 15000, // Enhanced: Real-time updates every 15 seconds for live odds
    retry: 3, // Retry failed requests
    staleTime: 10000, // Consider data fresh for 10 seconds  
    refetchOnWindowFocus: false, // Disable to prevent Suspense issues
    refetchOnMount: true   // Always fetch fresh data on mount
  });

  // Get live terminal stats
  const { data: terminalStats } = useQuery({
    queryKey: ['/api/betting/terminal-stats'],
    queryFn: async () => {
      const response = await fetch('/api/betting/terminal-stats');
      if (!response.ok) {
        throw new Error('Failed to fetch terminal stats');
      }
      return response.json();
    },
    refetchInterval: 15000, // Refetch every 15 seconds for real-time updates
  });

  // Dynamic EV color function - darker green for higher EV, fading to yellow then red
  const getEVColor = (ev: number) => {
    if (ev >= 15) return 'bg-green-900 text-white dark:bg-green-800 dark:text-white';
    if (ev >= 10) return 'bg-green-800 text-white dark:bg-green-700 dark:text-white';
    if (ev >= 8) return 'bg-green-700 text-white dark:bg-green-600 dark:text-white';
    if (ev >= 5) return 'bg-green-600 text-white dark:bg-green-500 dark:text-white';
    if (ev >= 3) return 'bg-green-500 text-white dark:bg-green-400 dark:text-white';
    if (ev >= 1) return 'bg-yellow-500 text-white dark:bg-yellow-400 dark:text-white';
    if (ev >= 0) return 'bg-yellow-400 text-white dark:bg-yellow-300 dark:text-white';
    if (ev >= -2) return 'bg-orange-400 text-white dark:bg-orange-400 dark:text-white';
    if (ev >= -5) return 'bg-red-500 text-white dark:bg-red-500 dark:text-white';
    return 'bg-red-600 text-white dark:bg-red-600 dark:text-white';
  };

  useEffect(() => {
    if (opportunitiesData?.opportunities) {
      setOpportunities(opportunitiesData.opportunities);
      setLastUpdated(new Date()); // Update timestamp when new data arrives
    }
    setLoading(isLoadingOpportunities);
  }, [opportunitiesData, isLoadingOpportunities]);

  const formatOdds = (odds: number) => {
    return odds > 0 ? `+${odds}` : `${odds}`;
  };

  // Calculate average odds from competitor books (excluding main book)
  const calculateFieldAverage = (oddsComparison: SportsbookOdds[]) => {
    if (!oddsComparison || oddsComparison.length === 0) return 0;
    
    const allOdds = oddsComparison.map(book => book.odds);
    const sum = allOdds.reduce((acc, odds) => acc + odds, 0);
    return Math.round(sum / allOdds.length);
  };

  // Get competitor sportsbook names (excluding main book)
  const getCompetitorBooks = (oddsComparison: SportsbookOdds[]) => {
    return oddsComparison
      .filter(book => !book.isMainBook)
      .map(book => book.sportsbook)
      .slice(0, 4); // Show first 4 competitors
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "High": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Apply all filters in the correct order
  const filteredOpportunities = opportunities.filter(opportunity => {
    // Filter by market type (new dropdown filter)
    if (selectedMarket !== 'all') {
      const oppMarket = opportunity.market?.toLowerCase() || '';
      if (selectedMarket === 'moneyline' && !oppMarket.includes('moneyline') && !oppMarket.includes('ml')) {
        return false;
      }
      if (selectedMarket === 'total' && !oppMarket.includes('total') && !oppMarket.includes('over') && !oppMarket.includes('under')) {
        return false;
      }
      if (selectedMarket === 'spread' && !oppMarket.includes('spread') && !oppMarket.includes('point')) {
        return false;
      }
    }
    
    // Filter by event/league (new dropdown filter)
    if (selectedEventLeague !== 'all' && opportunity.sport.toLowerCase() !== selectedEventLeague.toLowerCase()) {
      return false;
    }
    
    // Filter by sportsbook (new dropdown filter)
    if (selectedSportsbookFilter !== 'all') {
      const hasBook = opportunity.oddsComparison?.some(book => 
        book.sportsbook === selectedSportsbookFilter
      );
      if (!hasBook) {
        return false;
      }
    }
    
    // Then filter by category - exact matching
    if (activeCategory !== 'all') {
      const oppCategory = opportunity.category || '';
      if (oppCategory !== activeCategory) {
        return false;
      }
    }
    
    // Then filter by minimum EV - apply to all opportunities when not filtering by category or when filtering by EV category
    if (parseFloat(minEV) > 0 && (activeCategory === 'all' || activeCategory === 'ev') && opportunity.ev < parseFloat(minEV)) {
      return false;
    }
    
    return true;
  });

  // Filter opportunities by main sportsbook if selected
  const finalOpportunities = mainSportsbook === 'all' 
    ? filteredOpportunities
    : filteredOpportunities.filter(opp => 
        opp.oddsComparison?.some(book => book.sportsbook === mainSportsbook && book.isMainBook)
      );

  return (
    <div className="min-h-screen">
      {/* Large Page Gradient */}
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#00ff41]/10">
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
                      <TrendingUp className="h-6 w-6 text-[#D8AC35] dark:text-[#00ff41]" />
                      <h2 className="text-2xl font-bold tracking-wide text-gray-900 dark:text-white">TRADING TERMINAL</h2>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full animate-pulse"></div>
                      <span className="text-gray-600 dark:text-gray-300 font-mono">LIVE MARKET DATA</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                      <TabsList className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50">
                        <TabsTrigger value="opportunities" className="text-xs font-mono data-[state=active]:bg-[#D8AC35] data-[state=active]:text-white dark:data-[state=active]:bg-[#00ff41] dark:data-[state=active]:text-black">LIVE OPPORTUNITIES</TabsTrigger>
                        <TabsTrigger value="calculator" className="text-xs font-mono data-[state=active]:bg-[#D8AC35] data-[state=active]:text-white dark:data-[state=active]:bg-[#00ff41] dark:data-[state=active]:text-black">EV CALCULATOR</TabsTrigger>
                        <TabsTrigger value="comparison" className="text-xs font-mono data-[state=active]:bg-[#D8AC35] data-[state=active]:text-white dark:data-[state=active]:bg-[#00ff41] dark:data-[state=active]:text-black">ODDS COMPARISON</TabsTrigger>
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
                    <div className="w-3 h-3 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              <TabsContent value="opportunities" className="min-h-screen m-0 p-0 flex-1">

                {/* Market Stats Dashboard */}
                <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm px-8 py-6 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                      <div className="text-gray-600 dark:text-gray-400 text-sm font-mono uppercase tracking-wider mb-3">BOOKS SCANNED</div>
                      <div className="text-4xl font-bold font-mono text-gray-900 dark:text-white">{terminalStats?.booksScanned || '--'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600 dark:text-gray-400 text-sm font-mono uppercase tracking-wider mb-3">+EV SIGNALS</div>
                      <div className="text-4xl font-bold font-mono text-[#D8AC35] dark:text-[#00ff41]">{terminalStats?.evSignals?.toLocaleString() || '--'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600 dark:text-gray-400 text-sm font-mono uppercase tracking-wider mb-3">AVG CLV</div>
                      <div className="text-4xl font-bold font-mono text-[#D8AC35] dark:text-[#00ff41]">+{terminalStats?.averageCLV || '--'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600 dark:text-gray-400 text-sm font-mono uppercase tracking-wider mb-3">WIN RATE</div>
                      <div className="text-4xl font-bold font-mono text-[#D8AC35] dark:text-[#00ff41]">{terminalStats?.winRate ? `${terminalStats.winRate}%` : '--'}</div>
                    </div>
                  </div>
                </div>

                {/* Simplified Control Panel - Just EV Threshold */}
                <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm px-8 py-4 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-4">
                        <div className="text-[#D8AC35] dark:text-[#00ff41] text-sm font-mono uppercase tracking-wider">+EV THRESHOLD</div>
                        <div className="flex items-center space-x-4">
                          <div className="w-32">
                            <Slider
                              value={[parseFloat(minEV)]}
                              onValueChange={(value) => setMinEV(value[0].toString())}
                              max={20}
                              min={0}
                              step={0.5}
                              className="w-full"
                            />
                          </div>
                          <span className="text-[#D8AC35] dark:text-[#00ff41] font-mono text-lg font-bold min-w-16">+{minEV}%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${isRefetching ? 'bg-yellow-500 animate-pulse' : 'bg-[#D8AC35] dark:bg-[#00ff41] animate-pulse'}`}></div>
                        <span className="text-[#D8AC35] dark:text-[#00ff41] font-mono text-sm">
                          {isRefetching ? 'UPDATING...' : 'LIVE'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                      {finalOpportunities.length} opportunities found
                    </div>
                  </div>
                </div>



                {/* Trading Data Grid */}
                <div className="flex-1">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div className="relative">
                        <div className="w-16 h-16 border-6 border-gray-300 dark:border-gray-700 border-t-[#D8AC35] dark:border-t-[#00ff41] rounded-full animate-spin shadow-lg"></div>
                        <div className="w-12 h-12 border-6 border-gray-200 dark:border-gray-800 border-t-[#D8AC35] dark:border-t-[#00ff41] rounded-full animate-spin absolute top-2 left-2 shadow-md" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                      </div>
                      <p className="text-[#D8AC35] dark:text-[#00ff41] font-mono text-sm mt-4 animate-pulse">ANALYZING MARKET CONDITIONS...</p>
                      <p className="text-gray-600 dark:text-gray-400 font-mono text-xs mt-1">Scanning 47 sportsbooks for arbitrage opportunities</p>
                    </div>
                  ) : (
                    <div 
                      className="overflow-x-auto"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        const container = e.currentTarget;
                        if (e.key === 'ArrowRight') container.scrollLeft += 100;
                        if (e.key === 'ArrowLeft') container.scrollLeft -= 100;
                      }}
                    >
                      <div className="min-w-[1400px] p-8">
                        
                        {/* Category Filter Tabs */}
                        <div className="mb-6">
                          <CategoryTabs 
                            activeCategory={activeCategory}
                            onCategoryChange={setActiveCategory}
                            opportunities={opportunities}
                            className="justify-center"
                          />
                          {(activeCategory === 'arbitrage' || activeCategory === 'middling') && (
                            <div className="mt-4 text-center">
                              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <span className="text-gray-600 dark:text-gray-400 font-medium">
                                  {activeCategory === 'arbitrage' ? 'Arbitrage' : 'Middling'} detection coming soon
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        {/* Professional Trading Grid Header */}
                        <div className="mb-4">
                          {/* Header with Enhanced Real-Time Status */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-4">
                              <h3 className="text-lg font-mono text-gray-800 dark:text-gray-200 font-semibold">LIVE BETTING OPPORTUNITIES</h3>
                              <div className="flex items-center space-x-2">
                                {isRefetching && (
                                  <div className="flex items-center space-x-1">
                                    <div className="w-3 h-3 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full animate-pulse"></div>
                                    <span className="text-xs font-mono text-[#D8AC35] dark:text-[#00ff41]">UPDATING...</span>
                                  </div>
                                )}
                                <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                                  Auto-refresh: 15s | Side-by-side odds
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="text-xs font-mono text-gray-500 dark:text-gray-400">
                                {finalOpportunities.length} opportunities
                              </div>
                              <button
                                onClick={async () => {
                                  setLoading(true);
                                  try {
                                    await new Promise(resolve => setTimeout(resolve, 500));
                                    window.location.reload();
                                  } catch (error) {
                                    console.error("Failed to refresh odds:", error);
                                    setLoading(false);
                                  }
                                }}
                                disabled={loading || isRefetching}
                                className="px-4 py-2 rounded-lg bg-[#D8AC35] dark:bg-[#00ff41] hover:bg-[#C4982A] dark:hover:bg-[#00e639] text-black font-mono font-semibold shadow-lg hover:shadow-[#D8AC35]/50 dark:hover:shadow-[#00ff41]/50 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Manual refresh odds data"
                              >
                                {loading || isRefetching ? 'REFRESHING...' : 'REFRESH'}
                              </button>
                            </div>
                          </div>

                          {/* Filter Header Row - Replace Column Headers */}
                          <div className="grid grid-cols-[80px_2fr_120px_1fr_5fr] gap-4 items-center border-b border-gray-200/50 dark:border-gray-700/50 pb-3 mb-4">
                            {/* EV% Threshold */}
                            <div className="text-center">
                              <div className="text-xs text-[#D8AC35] dark:text-[#00ff41] font-mono mb-1">EV%</div>
                              <div className="text-sm font-mono text-white">+{minEV}%</div>
                            </div>
                            
                            {/* EVENT / LEAGUE Dropdown */}
                            <div>
                              <Select value={selectedEventLeague} onValueChange={setSelectedEventLeague}>
                                <SelectTrigger className="bg-transparent border-0 shadow-none text-white font-mono text-sm h-8 focus:ring-0 p-0">
                                  <div className="flex items-center gap-1">
                                    <span className="text-xs text-[#D8AC35] dark:text-[#00ff41]">EVENT/LEAGUE:</span>
                                    <SelectValue />
                                  </div>
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-600">
                                  <SelectItem value="all" className="text-white font-mono text-xs">ALL</SelectItem>
                                  <SelectItem value="mlb" className="text-white font-mono text-xs">MLB</SelectItem>
                                  <SelectItem value="nba" className="text-white font-mono text-xs">NBA</SelectItem>
                                  <SelectItem value="nfl" className="text-white font-mono text-xs">NFL</SelectItem>
                                  <SelectItem value="nhl" className="text-white font-mono text-xs">NHL</SelectItem>
                                  <SelectItem value="soccer" className="text-white font-mono text-xs">SOCCER</SelectItem>
                                  <SelectItem value="mma" className="text-white font-mono text-xs">MMA</SelectItem>
                                  <SelectItem value="golf" className="text-white font-mono text-xs">GOLF</SelectItem>
                                  <SelectItem value="cfl" className="text-white font-mono text-xs">CFL</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            {/* MARKET Dropdown */}
                            <div>
                              <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                                <SelectTrigger className="bg-transparent border-0 shadow-none text-white font-mono text-sm h-8 focus:ring-0 p-0">
                                  <div className="flex items-center gap-1">
                                    <span className="text-xs text-[#D8AC35] dark:text-[#00ff41]">MARKET:</span>
                                    <SelectValue />
                                  </div>
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-600">
                                  <SelectItem value="all" className="text-white font-mono text-xs">ALL</SelectItem>
                                  <SelectItem value="moneyline" className="text-white font-mono text-xs">MONEYLINE</SelectItem>
                                  <SelectItem value="total" className="text-white font-mono text-xs">TOTAL</SelectItem>
                                  <SelectItem value="spread" className="text-white font-mono text-xs">SPREAD</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            {/* AVG Label */}
                            <div className="text-center">
                              <div className="text-xs text-[#D8AC35] dark:text-[#00ff41] font-mono">AVG</div>
                            </div>
                            
                            {/* SPORTSBOOKS Dropdown */}
                            <div>
                              <Select value={selectedSportsbookFilter} onValueChange={setSelectedSportsbookFilter}>
                                <SelectTrigger className="bg-transparent border-0 shadow-none text-white font-mono text-sm h-8 focus:ring-0 p-0">
                                  <div className="flex items-center gap-1">
                                    <span className="text-xs text-[#D8AC35] dark:text-[#00ff41]">BOOKS:</span>
                                    <SelectValue />
                                  </div>
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-600">
                                  <SelectItem value="all" className="text-white font-mono text-xs">ALL (CLICK ODDS TO BET)</SelectItem>
                                  <SelectItem value="FanDuel" className="text-white font-mono text-xs">FANDUEL</SelectItem>
                                  <SelectItem value="DraftKings" className="text-white font-mono text-xs">DRAFTKINGS</SelectItem>
                                  <SelectItem value="BetMGM" className="text-white font-mono text-xs">BETMGM</SelectItem>
                                  <SelectItem value="Caesars" className="text-white font-mono text-xs">CAESARS</SelectItem>
                                  <SelectItem value="BetRivers" className="text-white font-mono text-xs">BETRIVERS</SelectItem>
                                  <SelectItem value="ESPNBET" className="text-white font-mono text-xs">ESPN BET</SelectItem>
                                  <SelectItem value="Pinnacle" className="text-white font-mono text-xs">PINNACLE</SelectItem>
                                  <SelectItem value="Bet365" className="text-white font-mono text-xs">BET365</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        {/* Dashboard-Style Trading Grid - Matching Reference Images */}
                        <div className="bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden">
                          {(activeCategory === 'arbitrage' || activeCategory === 'middling') ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                              <Clock className="h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
                              <h3 className="text-lg font-mono text-gray-600 dark:text-gray-400 mb-2">
                                {activeCategory === 'arbitrage' ? 'ARBITRAGE' : 'MIDDLING'} COMING SOON
                              </h3>
                              <p className="text-gray-500 dark:text-gray-500 font-mono text-sm">
                                Advanced {activeCategory} detection algorithms are currently in development.
                              </p>
                            </div>
                          ) : finalOpportunities.length === 0 ? (
                            <div className="text-center py-16">
                              <AlertCircle className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                              <h3 className="text-xl font-mono text-gray-700 dark:text-gray-300 mb-2">NO OPPORTUNITIES FOUND</h3>
                              <p className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                                {activeCategory === 'all' 
                                  ? "Try adjusting your filters or check back in a moment." 
                                  : `No ${activeCategory} opportunities match your current filters.`
                                }
                              </p>
                            </div>
                          ) : (
                            <>
                              {/* Professional Trading Grid Data Rows */}

                              {/* Professional Trading Grid Data Rows */}
                              <div className="divide-y divide-gray-700">
                                {finalOpportunities.map((opportunity: BettingOpportunity, index: number) => (
                                  <div 
                                    key={opportunity.id} 
                                    className="grid grid-cols-[80px_2fr_120px_1fr_5fr] gap-4 items-center py-4 px-4 bg-gray-800 dark:bg-gray-900 hover:bg-gray-750 dark:hover:bg-gray-800 transition-colors duration-200"
                                  >
                                    {/* EV% Column - Centered */}
                                    <div className="text-center">
                                      <div className={`inline-flex items-center justify-center px-3 py-1 rounded-full font-mono text-sm font-bold ${
                                        opportunity.ev >= 5 ? 'bg-green-600 text-white' :
                                        opportunity.ev >= 3 ? 'bg-green-500 text-white' :
                                        opportunity.ev >= 1 ? 'bg-yellow-500 text-black' :
                                        'bg-gray-600 text-white'
                                      }`}>
                                        +{opportunity.ev.toFixed(1)}%
                                      </div>
                                    </div>

                                    {/* Event Column with Team Logos */}
                                    <div className="flex items-center space-x-3">
                                      {/* Team Logos */}
                                      <div className="flex items-center space-x-1">
                                        {(() => {
                                          const gameTitle = opportunity.game;
                                          const vsMatch = gameTitle.match(/(.+?)\s+vs\s+(.+)/i);
                                          if (vsMatch) {
                                            const awayTeam = vsMatch[1].trim();
                                            const homeTeam = vsMatch[2].trim();
                                            return (
                                              <>
                                                <img 
                                                  src={(() => {
                                                    const sport = opportunity.sport.toLowerCase();
                                                    const teamSlug = awayTeam.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
                                                    
                                                    if (sport.includes('baseball')) return `https://a.espncdn.com/i/teamlogos/mlb/500/${teamSlug}.png`;
                                                    if (sport.includes('basketball')) return `https://a.espncdn.com/i/teamlogos/nba/500/${teamSlug}.png`;
                                                    if (sport.includes('football')) return `https://a.espncdn.com/i/teamlogos/nfl/500/${teamSlug}.png`;
                                                    if (sport.includes('hockey')) return `https://a.espncdn.com/i/teamlogos/nhl/500/${teamSlug}.png`;
                                                    return `https://ui-avatars.com/api/?name=${encodeURIComponent(awayTeam.slice(0, 2))}&background=1f2937&color=ffffff&size=24`;
                                                  })()}
                                                  alt={awayTeam}
                                                  className="w-6 h-6 object-contain rounded"
                                                  onError={(e) => {
                                                    const img = e.target as HTMLImageElement;
                                                    img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(awayTeam.slice(0, 2))}&background=1f2937&color=ffffff&size=24`;
                                                  }}
                                                />

                                                <img 
                                                  src={(() => {
                                                    const sport = opportunity.sport.toLowerCase();
                                                    const teamSlug = homeTeam.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
                                                    
                                                    if (sport.includes('baseball')) return `https://a.espncdn.com/i/teamlogos/mlb/500/${teamSlug}.png`;
                                                    if (sport.includes('basketball')) return `https://a.espncdn.com/i/teamlogos/nba/500/${teamSlug}.png`;
                                                    if (sport.includes('football')) return `https://a.espncdn.com/i/teamlogos/nfl/500/${teamSlug}.png`;
                                                    if (sport.includes('hockey')) return `https://a.espncdn.com/i/teamlogos/nhl/500/${teamSlug}.png`;
                                                    return `https://ui-avatars.com/api/?name=${encodeURIComponent(homeTeam.slice(0, 2))}&background=1f2937&color=ffffff&size=24`;
                                                  })()}
                                                  alt={homeTeam}
                                                  className="w-6 h-6 object-contain rounded"
                                                  onError={(e) => {
                                                    const img = e.target as HTMLImageElement;
                                                    img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(homeTeam.slice(0, 2))}&background=1f2937&color=ffffff&size=24`;
                                                  }}
                                                />
                                              </>
                                            );
                                          } else {
                                            // Fallback sport icon
                                            return (
                                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#D8AC35] to-[#C9A242] dark:from-[#00ff41] dark:to-[#00e639] flex items-center justify-center text-white font-bold text-xs">
                                                {opportunity.sport.slice(0, 2).toUpperCase()}
                                              </div>
                                            );
                                          }
                                        })()}
                                      </div>
                                      <div className="flex flex-col">
                                        <div className="flex items-center gap-2 mb-1">
                                          <div className="text-white font-medium text-sm">
                                            {opportunity.gameTime && opportunity.gameTime !== 'tbd' && opportunity.gameTime !== 'TBD' 
                                              ? opportunity.gameTime 
                                              : 'Live'}
                                          </div>
                                          <div className="px-2 py-1 rounded text-xs font-mono font-bold bg-[#D8AC35] dark:bg-[#00ff41] text-black">
                                            {(() => {
                                              const sport = opportunity.sport.toLowerCase();
                                              if (sport.includes('baseball')) return 'MLB';
                                              if (sport.includes('basketball')) return 'NBA';
                                              if (sport.includes('football') && !sport.includes('soccer')) return 'NFL';
                                              if (sport.includes('hockey')) return 'NHL';
                                              if (sport.includes('soccer') || sport.includes('football')) return 'SOCCER';
                                              if (sport.includes('tennis')) return 'TENNIS';
                                              if (sport.includes('golf')) return 'GOLF';
                                              if (sport.includes('mma') || sport.includes('ufc')) return 'UFC';
                                              if (sport.includes('boxing')) return 'BOXING';
                                              if (sport.includes('cricket')) return 'CRICKET';
                                              return opportunity.sport.toUpperCase().slice(0, 6);
                                            })()}
                                          </div>
                                        </div>
                                        <div className="text-white font-bold text-base">
                                          {/* Clean game title - remove ALL clutter and abbreviations */}
                                          {(() => {
                                            let cleanTitle = opportunity.game
                                              .replace(/\s*@\s*/g, ' vs ')
                                              .replace(/\b[A-Z]{2,3}\s*@\s*[A-Z]{2,3}\b/g, '')
                                              .replace(/\btdb\b/gi, '')
                                              .replace(/\btotal\b/gi, '')
                                              .replace(/\bteam\s*1\s*(vs)?\s*team\s*2\b/gi, '')
                                              .replace(/\bteam\s*1\b/gi, '')
                                              .replace(/\bteam\s*2\b/gi, '')
                                              .replace(/\bdescription\b/gi, '')
                                              .replace(/\b[A-Z]{2,4}\s+vs\s+[A-Z]{2,4}\b/g, '') // Remove abbreviation matchups
                                              .replace(/\s+/g, ' ')
                                              .trim();
                                            
                                            // If title is empty or too short, use the original
                                            return cleanTitle.length > 5 ? cleanTitle : opportunity.game;
                                          })()}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Market Column */}
                                    <div className="text-center">
                                      <div className="text-white font-medium text-sm">
                                        {opportunity.market}
                                      </div>
                                      <div className="text-gray-400 text-xs">
                                        {opportunity.line && opportunity.line !== 'tdb' && opportunity.line !== 'N/A' ? opportunity.line : ''}
                                      </div>
                                    </div>

                                    {/* Odds Average Column */}
                                    <div className="text-center">
                                      {opportunity.oddsComparison && opportunity.oddsComparison.length > 0 && (
                                        <div className="text-sm font-mono text-[#D8AC35] dark:text-[#00ff41] font-bold">
                                          {(() => {
                                            const avgOdds = Math.round(
                                              opportunity.oddsComparison.reduce((sum: number, odds: SportsbookOdds) => sum + odds.odds, 0) / 
                                              opportunity.oddsComparison.length
                                            );
                                            return avgOdds > 0 ? `+${avgOdds}` : avgOdds;
                                          })()}
                                        </div>
                                      )}
                                    </div>
                                    
                                    {/* Sportsbooks Display with Filtering - Compact */}
                                    <div className="w-full">
                                      <div className="flex items-center gap-1 flex-wrap">
                                        {(() => {
                                          // GAME-LEVEL DEDUPLICATION - collect unique sportsbooks across all opportunities for this SAME GAME
                                          const gameUniqueOddsMap = new Map();
                                          
                                          // Find all opportunities for the SAME GAME (same game title)
                                          const sameGameOpps = opportunities.filter((opp: BettingOpportunity) => 
                                            opp.game === opportunity.game
                                          );
                                          
                                          // Collect ALL sportsbooks from all opportunities for this game
                                          sameGameOpps.forEach((opp: BettingOpportunity) => {
                                            opp.oddsComparison?.forEach((odds: SportsbookOdds) => {
                                              const bookName = odds.sportsbook.trim();
                                              // Take the first occurrence with highest odds for each book
                                              if (!gameUniqueOddsMap.has(bookName) || 
                                                  (gameUniqueOddsMap.get(bookName).odds < odds.odds)) {
                                                gameUniqueOddsMap.set(bookName, odds);
                                              }
                                            });
                                          });
                                          
                                          const uniqueOdds = Array.from(gameUniqueOddsMap.values());

                                          return uniqueOdds.filter((odds: SportsbookOdds) => {
                                            // Filter based on user selection
                                            if (selectedSportsbooks.includes('all')) return true;
                                            return selectedSportsbooks.includes(odds.sportsbook);
                                          }).map((odds: SportsbookOdds, oddsIndex: number) => {
                                            const isMainBook = odds.isMainBook;
                                            
                                            // Use REAL sportsbook URLs from API data, no hardcoded URLs
                                            const getSportsbookUrl = (odds: SportsbookOdds) => {
                                              // First priority: Use the actual URL from the API
                                              if ((odds as any).url && (odds as any).url !== '' && !(odds as any).url.includes('google.com')) {
                                                return (odds as any).url;
                                              }
                                              
                                              // Fallback: Generate direct sportsbook URLs (NOT Google search)
                                              const bookName = odds.sportsbook.trim();
                                              const directUrls: Record<string, string> = {
                                                'FanDuel': 'https://sportsbook.fanduel.com/',
                                                'DraftKings': 'https://sportsbook.draftkings.com/',
                                                'BetMGM': 'https://sports.betmgm.com/',
                                                'Caesars': 'https://sportsbook.caesars.com/',
                                                'Pinnacle': 'https://www.pinnacle.com/',
                                                'Bet365': 'https://www.bet365.com/',
                                                'BetRivers': 'https://betrivers.com/',
                                                'ESPNBET': 'https://espnbet.com/',
                                                'ESPN BET': 'https://espnbet.com/',
                                                'Unibet': 'https://www.unibet.com/',
                                                'Betfair': 'https://www.betfair.com/',
                                                'PointsBet': 'https://pointsbet.com/',
                                                'Fanatics': 'https://fanaticssportsbook.com/',
                                                'WynnBET': 'https://www.wynnbet.com/',
                                                'FOX Bet': 'https://www.foxbet.com/',
                                                'Barstool': 'https://www.barstoolsportsbook.com/',
                                                'TwinSpires': 'https://www.twinspires.com/',
                                                'SugarHouse': 'https://www.sugarhouse.com/',
                                                'William Hill': 'https://www.williamhill.com/',
                                                'Bovada': 'https://www.bovada.lv/',
                                                'MyBookie': 'https://www.mybookie.ag/',
                                                'BetOnline': 'https://www.betonline.ag/',
                                                'Stake': 'https://stake.com/',
                                                'Circa': 'https://www.circasports.com/',
                                                'SuperDraft': 'https://superdraftsports.com/'
                                              };
                                              return directUrls[bookName] || directUrls[bookName.toLowerCase()] || 'https://www.espn.com/betting/';
                                            };

                                            return (
                                              <button
                                                key={`${opportunity.id}-${odds.sportsbook}-${oddsIndex}`}
                                                onClick={() => window.open(getSportsbookUrl(odds), '_blank')}
                                                className={`flex flex-col items-center rounded p-1 min-w-[70px] max-w-[70px] text-xs border cursor-pointer hover:scale-105 transition-all duration-200 ${
                                                  isMainBook 
                                                    ? 'bg-[#D8AC35] dark:bg-[#00ff41] text-black border-[#D8AC35] dark:border-[#00ff41] hover:bg-[#C4982A] dark:hover:bg-[#00e639]' 
                                                    : 'bg-gray-700/50 dark:bg-gray-800/50 text-white border-gray-600 dark:border-gray-700 hover:bg-gray-600/70 dark:hover:bg-gray-700/70'
                                                }`}
                                                title={`Click to place bet on ${odds.sportsbook}`}
                                              >
                                                {/* Sportsbook Name */}
                                                <div className={`font-medium text-center w-full text-xs leading-tight ${
                                                  isMainBook ? 'text-black' : 'text-gray-300 dark:text-gray-400'
                                                }`}
                                                style={{ fontSize: '10px', lineHeight: '1.2' }}>
                                                  {odds.sportsbook.length > 8 ? odds.sportsbook.substring(0, 7) + '..' : odds.sportsbook}
                                                </div>
                                                {/* Odds */}
                                                <div className={`font-mono font-bold text-xs leading-tight ${
                                                  isMainBook ? 'text-black' : 'text-white'
                                                }`}>
                                                  {Math.abs(odds.odds) > 999 ? (odds.odds > 0 ? '+999+' : '-999+') : (odds.odds > 0 ? `+${odds.odds}` : odds.odds)}
                                                </div>
                                                {isMainBook && (
                                                  <div className="text-xs font-bold text-black leading-tight">★</div>
                                                )}
                                              </button>
                                            );
                                          });
                                        })()}
                                        {/* Show count of filtered books */}
                                        {!selectedSportsbooks.includes('all') && opportunity.oddsComparison && (
                                          <div className="text-xs text-gray-400 ml-2 flex items-center">
                                            {(() => {
                                              const uniqueBooksSet = new Set(opportunity.oddsComparison.map((odds: SportsbookOdds) => odds.sportsbook));
                                              const uniqueCount = uniqueBooksSet.size;
                                              const filteredBooksSet = new Set(
                                                opportunity.oddsComparison
                                                  .filter((odds: SportsbookOdds) => selectedSportsbooks.includes(odds.sportsbook))
                                                  .map((odds: SportsbookOdds) => odds.sportsbook)
                                              );
                                              const filteredCount = filteredBooksSet.size;
                                              return `${filteredCount} of ${uniqueCount} books`;
                                            })()}
                                          </div>
                                        )}
                                      </div>
                                    </div>


                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* EV Calculator Tab */}
              <TabsContent value="calculator" className="min-h-screen m-0 p-0 flex-1">
                <div className="p-8 space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ArbitrageCalculator />
                    <MiddlingCalculator />
                  </div>
                
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ImpliedProbabilityCalculator />
                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
                      <h3 className="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-4">LIVE PROBABILITY FEED</h3>
                      <div className="space-y-3">
                        {finalOpportunities.slice(0, 5).map((opp, idx) => (
                          <div key={opp.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="text-sm">
                              <div className="font-semibold text-gray-900 dark:text-white">{opp.game}</div>
                              <div className="text-gray-600 dark:text-gray-400">{opp.market}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-mono font-bold text-[#D8AC35] dark:text-[#00ff41]">
                                {(opp.impliedProbability * 100).toFixed(1)}%
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {opp.mainBookOdds > 0 ? '+' : ''}{opp.mainBookOdds}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Odds Comparison Tab */}
              <TabsContent value="comparison" className="min-h-screen m-0 p-0 flex-1">
                <div className="p-8">
                  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
                    <h3 className="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-4">COMPREHENSIVE ODDS COMPARISON</h3>
                    <div className="space-y-4">
                      {finalOpportunities.slice(0, 10).map((opp) => (
                        <div key={opp.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="font-semibold text-gray-900 dark:text-white">{opp.game}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{opp.market}</div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {opp.oddsComparison?.map((odds, idx) => (
                              <div key={idx} className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                                <span className="text-sm font-medium">{odds.sportsbook}</span>
                                <span className="font-mono font-bold">{odds.odds > 0 ? `+${odds.odds}` : odds.odds}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
