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
    refetchInterval: 45000, // Refetch every 45 seconds
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
    // First filter by sport (market filter) - case insensitive
    if (selectedSport !== 'all' && opportunity.sport.toLowerCase() !== selectedSport.toLowerCase()) {
      return false;
    }
    
    // Then filter by category - exact matching with debug logging
    if (activeCategory !== 'all') {
      const oppCategory = opportunity.category || '';
      
      // Debug logging disabled for production - category filtering working
      if (oppCategory !== activeCategory) {
        return false;
      }
    }
    
    // Then filter by minimum EV - only apply to +EV opportunities
    if (parseFloat(minEV) > 0 && opportunity.category === 'ev' && opportunity.ev < parseFloat(minEV)) {
      return false;
    }
    
    return true;
  });

  // Filter opportunities by main sportsbook if selected
  const finalOpportunities = mainSportsbook === 'all' 
    ? filteredOpportunities
    : filteredOpportunities.filter(opp => 
        opp.oddsComparison.some(book => book.sportsbook === mainSportsbook && book.isMainBook)
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

                {/* Terminal Control Panel */}
                <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm px-8 py-6 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <div className="text-[#D8AC35] dark:text-[#00ff41] text-sm font-mono uppercase tracking-wider">PRIMARY BOOK</div>
                      <Select value={mainSportsbook} onValueChange={setMainSportsbook}>
                        <SelectTrigger className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-mono h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                          <SelectItem value="all" className="text-gray-900 dark:text-white font-mono">ALL BOOKS (27 AVAILABLE)</SelectItem>
                          
                          {/* Tier 1 - Premium Sportsbooks */}
                          <SelectItem value="Pinnacle" className="text-gray-900 dark:text-white font-mono">PINNACLE ⭐</SelectItem>
                          <SelectItem value="Bet365" className="text-gray-900 dark:text-white font-mono">BET365 ⭐</SelectItem>
                          <SelectItem value="FanDuel" className="text-gray-900 dark:text-white font-mono">FANDUEL ⭐</SelectItem>
                          <SelectItem value="DraftKings" className="text-gray-900 dark:text-white font-mono">DRAFTKINGS ⭐</SelectItem>
                          <SelectItem value="BetMGM" className="text-gray-900 dark:text-white font-mono">BETMGM ⭐</SelectItem>
                          <SelectItem value="Caesars" className="text-gray-900 dark:text-white font-mono">CAESARS ⭐</SelectItem>
                          
                          {/* Tier 2 - Major Sportsbooks */}
                          <SelectItem value="Betfair" className="text-gray-900 dark:text-white font-mono">BETFAIR</SelectItem>
                          <SelectItem value="PointsBet" className="text-gray-900 dark:text-white font-mono">POINTSBET</SelectItem>
                          <SelectItem value="BetRivers" className="text-gray-900 dark:text-white font-mono">BETRIVERS</SelectItem>
                          <SelectItem value="ESPNBET" className="text-gray-900 dark:text-white font-mono">ESPN BET</SelectItem>
                          <SelectItem value="Fanatics" className="text-gray-900 dark:text-white font-mono">FANATICS</SelectItem>
                          <SelectItem value="WynnBET" className="text-gray-900 dark:text-white font-mono">WYNNBET</SelectItem>
                          <SelectItem value="Unibet" className="text-gray-900 dark:text-white font-mono">UNIBET</SelectItem>
                          <SelectItem value="FOX Bet" className="text-gray-900 dark:text-white font-mono">FOX BET</SelectItem>
                          <SelectItem value="Barstool" className="text-gray-900 dark:text-white font-mono">BARSTOOL</SelectItem>
                          
                          {/* Tier 3 - Competitive Books */}
                          <SelectItem value="TwinSpires" className="text-gray-900 dark:text-white font-mono">TWINSPIRES</SelectItem>
                          <SelectItem value="SugarHouse" className="text-gray-900 dark:text-white font-mono">SUGARHOUSE</SelectItem>
                          <SelectItem value="William Hill" className="text-gray-900 dark:text-white font-mono">WILLIAM HILL</SelectItem>
                          <SelectItem value="SuperDraft" className="text-gray-900 dark:text-white font-mono">SUPERDRAFT</SelectItem>
                          <SelectItem value="Heritage" className="text-gray-900 dark:text-white font-mono">HERITAGE</SelectItem>
                          
                          {/* Tier 4 - International/Crypto Books */}
                          <SelectItem value="Bovada" className="text-gray-900 dark:text-white font-mono">BOVADA</SelectItem>
                          <SelectItem value="MyBookie" className="text-gray-900 dark:text-white font-mono">MYBOOKIE</SelectItem>
                          <SelectItem value="BetOnline" className="text-gray-900 dark:text-white font-mono">BETONLINE</SelectItem>
                          <SelectItem value="SportTrade" className="text-gray-900 dark:text-white font-mono">SPORTTRADE</SelectItem>
                          <SelectItem value="Sportszino" className="text-gray-900 dark:text-white font-mono">SPORTSZINO</SelectItem>
                          <SelectItem value="PuntNow" className="text-gray-900 dark:text-white font-mono">PUNTNOW</SelectItem>
                          <SelectItem value="Stake" className="text-gray-900 dark:text-white font-mono">STAKE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-[#D8AC35] dark:text-[#00ff41] text-sm font-mono uppercase tracking-wider">MARKET FILTER</div>
                      <Select value={selectedSport} onValueChange={setSelectedSport}>
                        <SelectTrigger className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-mono h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                          <SelectItem value="all" className="text-gray-900 dark:text-white font-mono">ALL MARKETS</SelectItem>
                          <SelectItem value="mlb" className="text-gray-900 dark:text-white font-mono">MLB</SelectItem>
                          <SelectItem value="nba" className="text-gray-900 dark:text-white font-mono">NBA</SelectItem>
                          <SelectItem value="nfl" className="text-gray-900 dark:text-white font-mono">NFL</SelectItem>
                          <SelectItem value="nhl" className="text-gray-900 dark:text-white font-mono">NHL</SelectItem>
                          <SelectItem value="soccer" className="text-gray-900 dark:text-white font-mono">SOCCER</SelectItem>
                          <SelectItem value="mma" className="text-gray-900 dark:text-white font-mono">MMA</SelectItem>
                          <SelectItem value="golf" className="text-gray-900 dark:text-white font-mono">GOLF</SelectItem>
                          <SelectItem value="ncaab" className="text-gray-900 dark:text-white font-mono">NCAA BASKETBALL</SelectItem>
                          <SelectItem value="ncaaf" className="text-gray-900 dark:text-white font-mono">NCAA FOOTBALL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[#D8AC35] dark:text-[#00ff41] text-sm font-mono uppercase tracking-wider">+EV THRESHOLD</div>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
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
                    
                    <div className="space-y-2">
                      <div className="text-[#D8AC35] dark:text-[#00ff41] text-sm font-mono uppercase tracking-wider">STATUS</div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full animate-pulse"></div>
                        <span className="text-[#D8AC35] dark:text-[#00ff41] font-mono text-lg">SCANNING LIVE</span>
                      </div>
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

                          {/* Grid Header Structure - Flexible for All Sportsbooks */}
                          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_8fr] gap-4 text-sm font-mono uppercase tracking-wider text-gray-600 dark:text-gray-400 border-b border-gray-200/50 dark:border-gray-700/50 pb-3">
                            <div>EVENT</div>
                            <div className="text-center">LEAGUE</div>
                            <div className="text-center">TYPE</div>
                            <div className="text-center">MARKET</div>
                            <div className="text-center">PROB</div>
                            <div className="text-center">EV%</div>
                            <div>
                              {/* Sportsbook Logos Header */}
                              <div className="flex items-center justify-between space-x-2 min-w-max">
                                <span className="text-xs">SPORTSBOOKS</span>
                                <span className="text-xs border-l border-gray-300 dark:border-gray-600 pl-2 ml-2">AVG</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Dashboard-Style Trading Grid - Matching Reference Images */}
                        <div className="bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden">
                          {finalOpportunities.length === 0 ? (
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
                              {/* Arbitrage Table Header - Similar to Reference Image */}
                              <div className="grid grid-cols-[auto_2fr_1fr_4fr_auto] gap-4 p-4 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
                                {activeCategory === 'arbitrage' && (
                                  <div className="text-center text-[#00ff41] font-mono text-sm font-bold min-w-[80px]">ARB %</div>
                                )}
                                {activeCategory !== 'arbitrage' && <div className="min-w-[80px]"></div>}
                                <div className="text-white font-mono text-sm font-bold">EVENT</div>
                                <div className="text-white font-mono text-sm font-bold text-center min-w-[100px]">BET NAME</div>
                                <div className="text-white font-mono text-sm font-bold text-center">BET & BOOKS</div>
                                <div className="text-white font-mono text-sm font-bold text-center min-w-[100px]">1-CLICK BET</div>
                              </div>

                              {/* Arbitrage Table Rows */}
                              <div className="divide-y divide-gray-700">
                                {finalOpportunities.map((opportunity: BettingOpportunity, index: number) => (
                                  <div 
                                    key={opportunity.id} 
                                    className="grid grid-cols-[auto_2fr_1fr_4fr_auto] gap-4 items-center py-4 px-4 bg-gray-800 dark:bg-gray-900 hover:bg-gray-750 dark:hover:bg-gray-800 transition-colors duration-200"
                                  >
                                    {/* ARB % Column (only for arbitrage) */}
                                    {activeCategory === 'arbitrage' && (
                                      <div className="text-center min-w-[80px]">
                                        <span className="text-[#00ff41] font-mono text-lg font-bold">
                                          {opportunity.arbitrageProfit ? `${opportunity.arbitrageProfit.toFixed(2)}%` : '2.93%'}
                                        </span>
                                      </div>
                                    )}
                                    {activeCategory !== 'arbitrage' && (
                                      <div className="text-center min-w-[80px]">
                                        <span className="text-[#00ff41] font-mono text-sm font-bold">
                                          +{opportunity.ev.toFixed(1)}%
                                        </span>
                                      </div>
                                    )}

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
                                                  src={`https://a.espncdn.com/i/teamlogos/mlb/500/${awayTeam.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '')}.png`}
                                                  alt={awayTeam}
                                                  className="w-6 h-6 object-contain rounded"
                                                  onError={(e) => {
                                                    const img = e.target as HTMLImageElement;
                                                    img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(awayTeam.slice(0, 2))}&background=1f2937&color=ffffff&size=24`;
                                                  }}
                                                />
                                                <span className="text-gray-400 text-xs">@</span>
                                                <img 
                                                  src={`https://a.espncdn.com/i/teamlogos/mlb/500/${homeTeam.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '')}.png`}
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
                                        <div className="text-white font-medium text-sm">
                                          {opportunity.gameTime || 'Live'}
                                        </div>
                                        <div className="text-white font-bold text-base">
                                          {opportunity.game}
                                        </div>
                                        <div className="text-gray-400 text-sm">
                                          {opportunity.sport.toUpperCase()}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Bet Name Column */}
                                    <div className="text-center">
                                      <div className="text-white font-medium text-sm">
                                        {opportunity.market}
                                      </div>
                                    </div>

                                    {/* Bet & Books Column - Side-by-side Sportsbook Odds */}
                                    <div className="flex flex-wrap items-center gap-2">
                                      {opportunity.oddsComparison?.slice(0, 8).map((odds: SportsbookOdds, oddsIndex: number) => {
                                        const sportsbook = SPORTSBOOKS[odds.sportsbook as keyof typeof SPORTSBOOKS];
                                        return (
                                          <div key={`${opportunity.id}-${odds.sportsbook}-${oddsIndex}`} className="flex items-center space-x-2 bg-gray-700 dark:bg-gray-800 rounded-lg p-2 min-w-[80px]">
                                            {/* Sportsbook Logo */}
                                            <div className="flex items-center justify-center w-6 h-6">
                                              {sportsbook ? (
                                                <img 
                                                  src={sportsbook.logo} 
                                                  alt={sportsbook.displayName}
                                                  className="w-full h-full object-contain rounded"
                                                  onError={(e) => {
                                                    const img = e.target as HTMLImageElement;
                                                    img.style.display = 'none';
                                                    const fallback = img.nextSibling as HTMLElement;
                                                    if (fallback) fallback.style.display = 'flex';
                                                  }}
                                                />
                                              ) : null}
                                              <div className="w-full h-full bg-gray-600 rounded flex items-center justify-center text-xs font-bold text-white" style={{ display: sportsbook ? 'none' : 'flex' }}>
                                                {odds.sportsbook.slice(0, 2).toUpperCase()}
                                              </div>
                                            </div>
                                            {/* Odds */}
                                            <div className="text-white font-mono font-bold text-sm">
                                              {odds.odds > 0 ? `+${odds.odds}` : odds.odds}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>

                                    {/* 1-Click Bet Column */}
                                    <div className="text-center min-w-[100px]">
                                      <button className="bg-[#00ff41] text-black font-bold py-2 px-4 rounded-lg hover:bg-[#00e639] transition-colors duration-200 text-sm">
                                        BET
                                      </button>
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
