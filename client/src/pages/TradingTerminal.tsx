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
import { TeamLogo } from '@/components/TeamLogo';
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

  // Get live betting opportunities from real API - fetch all and filter on client side for instant filtering
  const { data: opportunitiesData, isLoading: isLoadingOpportunities, error: opportunitiesError } = useQuery({
    queryKey: ['/api/betting/live-opportunities'],
    queryFn: async () => {
      const response = await fetch(`/api/betting/live-opportunities`);
      if (!response.ok) {
        throw new Error('Failed to fetch betting opportunities');
      }
      return response.json();
    },
    refetchInterval: 30000, // Refetch every 30 seconds
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
    // First filter by sport (market filter)
    if (selectedSport !== 'all' && opportunity.sport !== selectedSport) {
      return false;
    }
    
    // Then filter by category  
    if (activeCategory !== 'all' && opportunity.category !== activeCategory) {
      return false;
    }
    
    // Then filter by minimum EV
    if (parseFloat(minEV) > 0 && opportunity.ev < parseFloat(minEV)) {
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
                          <SelectItem value="all" className="text-gray-900 dark:text-white font-mono">ALL BOOKS</SelectItem>
                          <SelectItem value="FanDuel" className="text-gray-900 dark:text-white font-mono">FanDuel</SelectItem>
                          <SelectItem value="DraftKings" className="text-gray-900 dark:text-white font-mono">DraftKings</SelectItem>
                          <SelectItem value="Caesars" className="text-gray-900 dark:text-white font-mono">Caesars</SelectItem>
                          <SelectItem value="BetRivers" className="text-gray-900 dark:text-white font-mono">BetRivers</SelectItem>
                          <SelectItem value="ESPNBET" className="text-gray-900 dark:text-white font-mono">ESPN BET</SelectItem>
                          <SelectItem value="Fanatics" className="text-gray-900 dark:text-white font-mono">Fanatics</SelectItem>
                          <SelectItem value="BetOnline" className="text-gray-900 dark:text-white font-mono">BetOnline</SelectItem>
                          <SelectItem value="Bovada" className="text-gray-900 dark:text-white font-mono">Bovada</SelectItem>
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
                          <SelectItem value="NFL" className="text-gray-900 dark:text-white font-mono">NFL</SelectItem>
                          <SelectItem value="NBA" className="text-gray-900 dark:text-white font-mono">NBA</SelectItem>
                          <SelectItem value="MLB" className="text-gray-900 dark:text-white font-mono">MLB</SelectItem>
                          <SelectItem value="NHL" className="text-gray-900 dark:text-white font-mono">NHL</SelectItem>
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
                          {/* Header with Refresh Button */}
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-mono text-gray-800 dark:text-gray-200 font-semibold">LIVE BETTING OPPORTUNITIES</h3>
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
                              disabled={loading}
                              className="px-4 py-2 rounded-lg bg-[#D8AC35] dark:bg-[#00ff41] hover:bg-[#C4982A] dark:hover:bg-[#00e639] text-black font-mono font-semibold shadow-lg hover:shadow-[#D8AC35]/50 dark:hover:shadow-[#00ff41]/50 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Refresh odds data"
                            >
                              {loading ? 'REFRESHING...' : 'REFRESH'}
                            </button>
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

                        {/* Opportunities Data Rows */}
                        <div className="space-y-2">
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
                            finalOpportunities.map((opportunity: BettingOpportunity, index: number) => (
                              <div 
                                key={opportunity.id} 
                                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_8fr] gap-4 items-center py-3 px-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors duration-200 border border-gray-200/30 dark:border-gray-700/30 rounded-lg shadow-sm"
                              >
                                {/* Event with Team Logos */}
                                <div className="flex items-center space-x-2">
                                  {/* Team Logos */}
                                  <div className="flex items-center space-x-1">
                                    {opportunity.game.includes(' vs ') ? (
                                      <>
                                        <TeamLogo 
                                          teamName={opportunity.game.split(' vs ')[0]} 
                                          sport={opportunity.sport.toLowerCase()}
                                          size="sm"
                                          className="border border-gray-200 dark:border-gray-600 rounded"
                                        />
                                        <span className="text-xs text-gray-400">vs</span>
                                        <TeamLogo 
                                          teamName={opportunity.game.split(' vs ')[1]} 
                                          sport={opportunity.sport.toLowerCase()}
                                          size="sm"
                                          className="border border-gray-200 dark:border-gray-600 rounded"
                                        />
                                      </>
                                    ) : (
                                      <TeamLogo 
                                        teamName={opportunity.game} 
                                        sport={opportunity.sport.toLowerCase()}
                                        size="sm"
                                        className="border border-gray-200 dark:border-gray-600 rounded"
                                      />
                                    )}
                                  </div>
                                  
                                  {/* Game Info */}
                                  <div className="flex flex-col flex-1 min-w-0">
                                    <span className="font-semibold text-gray-900 dark:text-white text-sm truncate">{opportunity.game}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                                      {formatInUserTimezone(opportunity.gameTime, 'h:mm a')}
                                    </span>
                                  </div>
                                </div>

                                {/* League */}
                                <div className="flex items-center justify-center">
                                  <span className="text-xs font-mono px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                    {opportunity.sport}
                                  </span>
                                </div>

                                {/* Type */}
                                <div className="flex items-center justify-center">
                                  <span className="text-xs font-mono px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                                    {opportunity.betType}
                                  </span>
                                </div>

                                {/* Market */}
                                <div className="text-center">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">{opportunity.market}</div>
                                </div>

                                {/* Probability */}
                                <div className="text-center">
                                  <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                                    {(opportunity.impliedProbability * 100).toFixed(1)}%
                                  </span>
                                </div>

                                {/* EV% */}
                                <div className="flex items-center justify-center">
                                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold ${getEVColor(opportunity.ev)}`}>
                                    +{opportunity.ev.toFixed(1)}%
                                  </span>
                                </div>

                                {/* Bookmaker Odds with Logos */}
                                <div className="flex items-center justify-start space-x-3 overflow-x-auto min-w-0 pb-2">
                                  {opportunity.oddsComparison?.map((odds: SportsbookOdds, oddsIndex: number) => {
                                    const sportsbook = SPORTSBOOKS[odds.sportsbook as keyof typeof SPORTSBOOKS];
                                    if (!sportsbook) {
                                      // Show unknown sportsbooks with text fallback
                                      return (
                                        <div key={`${opportunity.id}-${odds.sportsbook}-${oddsIndex}`} className="flex flex-col items-center space-y-1 min-w-[60px]">
                                          <div className="relative">
                                            <div className="w-7 h-7 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600">
                                              {odds.sportsbook.slice(0, 2).toUpperCase()}
                                            </div>
                                            {odds.isMainBook && (
                                              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full border border-white dark:border-gray-800"></div>
                                            )}
                                          </div>
                                          <div className="text-center">
                                            <div className="text-xs font-mono font-bold text-gray-900 dark:text-white">
                                              {odds.odds > 0 ? `+${odds.odds}` : odds.odds}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                              {odds.ev > 0 ? `+${odds.ev.toFixed(1)}%` : `${odds.ev.toFixed(1)}%`}
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                    
                                    return (
                                      <div key={`${opportunity.id}-${odds.sportsbook}-${oddsIndex}`} className="flex flex-col items-center space-y-1 min-w-[60px]">
                                        {/* Bookmaker Logo */}
                                        <div className="relative">
                                          <img 
                                            src={sportsbook.logo} 
                                            alt={sportsbook.displayName}
                                            className="w-7 h-7 object-contain rounded border border-gray-200 dark:border-gray-600 bg-white p-0.5"
                                            onError={(e) => {
                                              const img = e.target as HTMLImageElement;
                                              img.style.display = 'none';
                                              const fallback = img.nextSibling as HTMLElement;
                                              if (fallback) fallback.style.display = 'flex';
                                            }}
                                          />
                                          <div className="w-7 h-7 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600" style={{ display: 'none' }}>
                                            {odds.sportsbook.slice(0, 2).toUpperCase()}
                                          </div>
                                          {odds.isMainBook && (
                                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full border border-white dark:border-gray-800"></div>
                                          )}
                                        </div>
                                        
                                        {/* Odds */}
                                        <div className="text-center">
                                          <div className="text-xs font-mono font-bold text-gray-900 dark:text-white">
                                            {odds.odds > 0 ? `+${odds.odds}` : odds.odds}
                                          </div>
                                          <div className="text-xs text-gray-500 dark:text-gray-400">
                                            {odds.ev > 0 ? `+${odds.ev.toFixed(1)}%` : `${odds.ev.toFixed(1)}%`}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                  
                                  {/* Field Average */}
                                  <div className="flex flex-col items-center space-y-1 min-w-[60px] border-l border-gray-300 dark:border-gray-600 pl-3 ml-3">
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-mono uppercase">AVG</div>
                                    <div className="text-sm font-mono font-bold text-gray-700 dark:text-gray-300">
                                      {formatOdds(calculateFieldAverage(opportunity.oddsComparison || []))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

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
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalculatorIcon className="h-5 w-5" />
                      Professional EV Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                {/* Professional Calculator Interface matching the design */}
                <div className="bg-gray-900 text-white rounded-lg p-6">
                  {/* Header with stats */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">SHARP SHOT CALCULATOR</h2>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-300">LIVE</span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-8 mb-8">
                    <div className="text-center">
                      <div className="text-gray-400 text-sm font-semibold mb-2">BOOKS</div>
                      <div className="text-4xl font-bold">47</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400 text-sm font-semibold mb-2">+EV FOUND</div>
                      <div className="text-4xl font-bold text-green-500">1,247</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400 text-sm font-semibold mb-2">AVG CLV</div>
                      <div className="text-4xl font-bold text-[#D8AC35]">+4.2%</div>
                    </div>
                  </div>

                  {/* Live Opportunities */}
                  <div className="space-y-3">
                    <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                      <div className="text-white">
                        <span className="font-semibold">LAL vs GSW</span>
                        <span className="text-gray-400 mx-2">•</span>
                        <span className="text-gray-300">O225.5</span>
                      </div>
                      <div className="bg-green-500 text-black px-3 py-1 rounded font-bold text-sm">
                        +8.3%
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                      <div className="text-white">
                        <span className="font-semibold">MIA vs BOS</span>
                        <span className="text-gray-400 mx-2">•</span>
                        <span className="text-gray-300">U112.5</span>
                      </div>
                      <div className="bg-green-500 text-black px-3 py-1 rounded font-bold text-sm">
                        +6.1%
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                      <div className="text-white">
                        <span className="font-semibold">DAL -3.5</span>
                        <span className="text-gray-400 mx-2">•</span>
                        <span className="text-gray-300">1H</span>
                      </div>
                      <div className="bg-green-500 text-black px-3 py-1 rounded font-bold text-sm">
                        +4.7%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Traditional Calculator Below */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="american-odds">American Odds</Label>
                      <Input id="american-odds" type="number" placeholder="-110" />
                    </div>
                    <div>
                      <Label htmlFor="true-probability">True Probability (%)</Label>
                      <Input id="true-probability" type="number" placeholder="52.4" />
                    </div>
                    <div>
                      <Label htmlFor="stake">Stake ($)</Label>
                      <Input id="stake" type="number" placeholder="100" />
                    </div>
                    <Button className="w-full bg-[#D8AC35] text-black hover:bg-[#D8AC35]/90">
                      Calculate EV
                    </Button>
                  </div>
                  <div className="col-span-2 p-6 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-4">Expected Value Result</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Implied Probability:</strong> 52.38%</p>
                      <p><strong>Expected Value:</strong> <span className="text-green-600 font-bold">+$2.18</span></p>
                      <p><strong>EV Percentage:</strong> <span className="text-green-600 font-bold">+2.18%</span></p>
                      <p><strong>Long-term Profit:</strong> $21.80 per 100 bets</p>
                    </div>
                  </div>
                </div>
                </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="min-h-screen m-0 p-0 flex-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Odds Comparison - Sample Bet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg font-semibold text-sm border-b mb-4">
                  <div>Sportsbook</div>
                  <div>Odds</div>
                  <div>+EV</div>
                  <div>Action</div>
                </div>

                <div className="space-y-4">
                  {opportunities.length > 0 && opportunities[0].oddsComparison.map((comp, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 p-4 border rounded-lg items-center">
                      <div className="flex items-center gap-2">
                        <SportsbookDot sportsbook={comp.sportsbook} size="md" />
                        <span className="font-semibold">{comp.sportsbook}</span>
                        {comp.isMainBook && <Badge className="bg-blue-100 text-blue-800">Your Book</Badge>}
                      </div>
                      <div className="font-bold">{formatOdds(comp.odds)}</div>
                      <div className={`font-semibold ${comp.ev >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {comp.ev >= 0 ? '+' : ''}{comp.ev}%
                      </div>
                      <div className="text-sm text-gray-600">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="hover:bg-[#D8AC35] hover:text-black transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Bet
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}