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
import { OpportunityTable, BettingOpportunity } from '../components/trading/OpportunityTable';
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

// Transform backend data to table format
const transformOpportunityData = (backendData: any[]): BettingOpportunity[] => {
  return backendData.map(item => ({
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

  // Dynamic opportunities query that fetches appropriate data based on timeframe filter
  const { data: opportunitiesData, isLoading: isLoadingOpportunities, isRefetching, error: opportunitiesError, refetch: refetchOpportunities } = useQuery({
    queryKey: [selectedTimeframe],
    queryFn: async (): Promise<{opportunities: BettingOpportunity[]}> => {
      try {
        if (selectedTimeframe === 'all') {
          // Fetch both live and upcoming for "All" view
          console.log('🔄 Fetching BOTH live and upcoming opportunities for "All" view...');
          const [liveResponse, upcomingResponse] = await Promise.all([
            fetch('/api/betting/live-opportunities'),
            fetch('/api/betting/upcoming-opportunities')
          ]);
          
          const liveData = await liveResponse.json();
          const upcomingData = await upcomingResponse.json();
          
          const allOpportunities = [
            ...(liveData.opportunities || []),
            ...(upcomingData.opportunities || [])
          ];
          
          console.log(`✅ Received ${liveData.opportunities?.length || 0} live + ${upcomingData.opportunities?.length || 0} upcoming = ${allOpportunities.length} total opportunities`);
          console.log('📊 DEBUGGING: Sample opportunity structure:', allOpportunities[0]);
          return { opportunities: allOpportunities };
        } else {
          // Fetch specific timeframe data
          const endpoint = selectedTimeframe === 'upcoming' ? '/api/betting/upcoming-opportunities' : '/api/betting/live-opportunities';
          console.log(`🔄 Fetching ${selectedTimeframe} betting opportunities with comprehensive side-by-side odds comparison...`);
          const response = await fetch(endpoint);
          if (!response.ok) {
            throw new Error('Failed to fetch betting opportunities');
          }
          const data = await response.json();
          console.log(`✅ Received ${data.opportunities?.length || 0} ${selectedTimeframe} opportunities with side-by-side odds from multiple sportsbooks`);
          return data;
        }
      } catch (error) {
        console.error('❌ Error fetching betting opportunities:', error);
        // Keep current data instead of clearing it
        return opportunitiesData || { opportunities: [] };
      }
    },
    refetchInterval: isPaused ? false : (selectedTimeframe === 'upcoming' ? 30000 : selectedTimeframe === 'all' ? 15000 : 8000), // ⚡ ULTRA-FAST: 8s for live, 15s for all, 30s for upcoming
    retry: 1, // Fast fail for speed
    staleTime: selectedTimeframe === 'upcoming' ? 15000 : selectedTimeframe === 'all' ? 8000 : 3000, // ⚡ Lightning-fresh: 3s live, 8s all, 15s upcoming
    refetchOnWindowFocus: false, 
    refetchOnMount: true
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
    refetchInterval: 8000, // ⚡ ULTRA-FAST: 8 seconds for real-time stats
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

  // Update opportunities when data changes - including player props
  useEffect(() => {
    let newOpportunities: BettingOpportunity[] = [];
    
    if (activeCategory === 'player_props' && playerPropsData?.playerProps) {
      // Use player props data when that category is selected
      newOpportunities = playerPropsData.playerProps;
      console.log(`📊 Using ${newOpportunities.length} player props opportunities`);
    } else if (opportunitiesData?.opportunities) {
      // Use regular opportunities data for other categories
      const newOpps = opportunitiesData.opportunities;
      if (newOpps.length > 0 || opportunities.length === 0) {
        newOpportunities = newOpps;
      }
    }
    
    setOpportunities(newOpportunities);
    if (newOpportunities.length > 0) {
      setLastUpdated(new Date());
    }
    setLoading(isLoadingOpportunities || isLoadingPlayerProps);
  }, [opportunitiesData, playerPropsData, activeCategory, isLoadingOpportunities, isLoadingPlayerProps]);

  const formatOdds = (odds: number) => {
    return odds > 0 ? `+${odds}` : `${odds}`;
  };

  // Calculate average odds from competitor books (excluding main book)
  const calculateFieldAverage = (oddsComparison: SportsbookOdds[]) => {
    const deduplicatedOdds = deduplicateOdds(oddsComparison || []);
    if (deduplicatedOdds.length === 0) return 0;
    
    const allOdds = deduplicatedOdds.map(book => book.odds);
    const sum = allOdds.reduce((acc, odds) => acc + odds, 0);
    return Math.round(sum / allOdds.length);
  };

  // Get competitor sportsbook names (excluding main book)
  const getCompetitorBooks = (oddsComparison: SportsbookOdds[]) => {
    const deduplicatedOdds = deduplicateOdds(oddsComparison || []);
    return deduplicatedOdds
      .filter(book => !book.isMainBook)
      .map(book => book.sportsbook)
      .slice(0, 4); // Show first 4 competitors
  };

  // Handle cache clearing for immediate fresh data
  const handleClearCache = async () => {
    if (isClearingCache || !cacheService.canClearCache()) return;
    
    setIsClearingCache(true);
    const success = await cacheService.clearBettingCache();
    
    if (success) {
      // Force refetch opportunities immediately
      refetchOpportunities();
    }
    
    setIsClearingCache(false);
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "High": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Enhanced client-side deduplication with aggressive duplicate removal
  const deduplicateOdds = (oddsComparison: SportsbookOdds[]) => {
    if (!oddsComparison || oddsComparison.length === 0) return [];
    
    const uniqueOddsMap = new Map<string, SportsbookOdds>();
    const bookNameMap = new Map<string, string>(); // Track original names for duplicates
    
    oddsComparison.forEach((odds) => {
      // Aggressive normalization to catch all variants
      let normalizedBook = odds.sportsbook.toLowerCase()
        .replace(/\s+/g, '')
        .replace(/bet/g, '')
        .replace(/sportsbook/g, '')
        .replace(/casino/g, '')
        .replace(/sports/g, '');
      
      // Handle specific duplicate patterns
      if (normalizedBook.includes('rivers') || normalizedBook === 'betrivers') {
        normalizedBook = 'rivers';
      }
      if (normalizedBook.includes('fanduel') || normalizedBook === 'fd') {
        normalizedBook = 'fanduel';
      }
      if (normalizedBook.includes('draftkings') || normalizedBook === 'dk') {
        normalizedBook = 'draftkings';
      }
      if (normalizedBook.includes('mgm') || normalizedBook.includes('betmgm')) {
        normalizedBook = 'mgm';
      }
      
      // Create unique key with normalized book name only (ignore odds for true deduplication)
      const key = normalizedBook;
      
      // Keep the first occurrence of each sportsbook
      if (!uniqueOddsMap.has(key)) {
        uniqueOddsMap.set(key, odds);
        bookNameMap.set(key, odds.sportsbook);
      }
    });
    
    // Convert back to array and sort by main book first, then by odds
    return Array.from(uniqueOddsMap.values()).sort((a, b) => {
      if (a.isMainBook && !b.isMainBook) return -1;
      if (!a.isMainBook && b.isMainBook) return 1;
      return Math.abs(b.odds) - Math.abs(a.odds);
    });
  };

  // FIXED filtering logic - properly handle all filter combinations including upcoming events
  const filteredOpportunities = opportunities.filter((opportunity, index) => {
    console.log(`🔍 FILTER ${index}: ${opportunity.game} (${opportunity.category}) - Market: ${opportunity.market}, Sport: ${opportunity.sport}`);
    console.log(`   Filters: market=${selectedMarket}, league=${selectedEventLeague}, timeframe=${selectedTimeframe}, category=${activeCategory}`);
    // Market filter - exact matching for reliability, but always allow through when market is 'all'
    if (selectedMarket !== 'all') {
      const market = opportunity.market?.toLowerCase() || '';
      let marketMatches = false;
      
      // Always allow upcoming events through regardless of market filter
      if (opportunity.market === 'Upcoming Event') {
        marketMatches = true;
      } else if (selectedMarket === 'moneyline') {
        marketMatches = market === 'moneyline' || market === 'ml';
      } else if (selectedMarket === 'total') {
        marketMatches = market.includes('total') || market.includes('over/under') || market.includes('over') || market.includes('under');
      } else if (selectedMarket === 'spread') {
        marketMatches = market.includes('spread') || market.includes('point spread') || market.includes('handicap');
      } else if (selectedMarket === 'player_props') {
        marketMatches = market.includes('player') || market.includes('props') || market.includes('proposition') || opportunity.category === 'player_props';
      }
      
      if (!marketMatches) {
        console.log(`❌ MARKET FILTER: ${opportunity.game} blocked by market filter (${selectedMarket} vs ${opportunity.market})`);
        return false;
      }
    }
    
    // Sport/League filter - improved matching with fallbacks
    if (selectedEventLeague !== 'all') {
      const sport = opportunity.sport?.toLowerCase() || '';
      const game = opportunity.game?.toLowerCase() || '';
      
      let sportMatches = false;
      switch (selectedEventLeague) {
        case 'mlb':
          sportMatches = sport.includes('baseball') || game.includes('baseball') || sport === 'mlb';
          break;
        case 'nba':
          sportMatches = sport.includes('basketball') || game.includes('basketball') || sport === 'nba';
          break;
        case 'wnba':
          sportMatches = sport.includes('wnba') || (sport.includes('basketball') && sport.includes('women'));
          break;
        case 'nfl':
          sportMatches = (sport.includes('football') && !sport.includes('soccer')) || sport === 'nfl';
          break;
        case 'nhl':
          sportMatches = sport.includes('hockey') || game.includes('hockey') || sport === 'nhl';
          break;
        case 'soccer':
          sportMatches = sport.includes('soccer') || (sport.includes('football') && !sport.includes('american')) || sport === 'soccer';
          break;
        case 'tennis':
          sportMatches = sport.includes('tennis') || sport === 'tennis';
          break;
        case 'golf':
          sportMatches = sport.includes('golf') || sport === 'golf';
          break;
        case 'cfl':
          sportMatches = sport.includes('cfl') || sport === 'cfl';
          break;
        case 'cricket':
          sportMatches = sport.includes('cricket') || sport === 'cricket';
          break;
        case 'mma':
          sportMatches = sport.includes('mma') || sport.includes('ufc') || sport === 'mma';
          break;
        case 'boxing':
          sportMatches = sport.includes('boxing') || sport === 'boxing';
          break;
        case 'esports':
          sportMatches = sport.includes('esports') || sport.includes('gaming') || sport === 'esports';
          break;
        case 'ncaab':
          sportMatches = sport.includes('ncaab') || (sport.includes('basketball') && sport.includes('college'));
          break;
        case 'ncaaf':
          sportMatches = sport.includes('ncaaf') || (sport.includes('football') && sport.includes('college'));
          break;
      }
      
      if (!sportMatches) {
        console.log(`❌ SPORT FILTER: ${opportunity.game} blocked by sport filter (${selectedEventLeague} vs ${opportunity.sport})`);
        return false;
      }
    }
    
    // Sportsbook filter - check if any selected books are available in this opportunity
    if (!selectedSportsbooks.includes('all') && selectedSportsbooks.length > 0) {
      const deduplicatedOdds = deduplicateOdds(opportunity.oddsComparison || []);
      
      const hasSelectedBook = deduplicatedOdds.some((book: any) => {
        const bookName = book.sportsbook || '';
        return selectedSportsbooks.some(selectedBook => {
          // Simple case-insensitive comparison
          const selectedLower = selectedBook.toLowerCase();
          const bookLower = bookName.toLowerCase();
          
          // Debug logging for troubleshooting
          if (selectedBook === 'FanDuel') {
            console.log(`Comparing FanDuel filter with book: "${bookName}" | Match: ${bookLower.includes('fanduel') || selectedLower.includes(bookLower)}`);
          }
          
          // Check for matches with flexible comparison
          return bookLower.includes(selectedLower) || 
                 selectedLower.includes(bookLower) ||
                 bookLower === selectedLower ||
                 (selectedLower === 'fanduel' && bookLower.includes('fan'));
        });
      });
      
      if (!hasSelectedBook) return false;
    }
    
    // Timeframe filter - Since we're already fetching the correct data from the appropriate endpoint,
    // we don't need additional client-side filtering for live vs upcoming
    // The API endpoints handle this correctly:
    // - selectedTimeframe 'live' or 'all' -> /api/betting/live-opportunities
    // - selectedTimeframe 'upcoming' -> /api/betting/upcoming-opportunities
    
    // Category filter - Include upcoming events and EV opportunities for 'all' category
    if (activeCategory !== 'all') {
      const category = opportunity.category || '';
      // Allow through: exact matches, EV variants, or upcoming events in 'all' view
      if (category !== activeCategory && 
          !(activeCategory === 'ev' && (category === 'ev' || category === '+EV')) &&
          !(category === 'upcoming' && activeCategory === 'all')) {
        console.log(`❌ CATEGORY FILTER: ${opportunity.game} blocked by category filter (${activeCategory} vs ${opportunity.category})`);
        return false;
      }
    } else {
      // When activeCategory is 'all', ensure we include all valid opportunities  
      const category = opportunity.category || '';
      const validCategories = ['upcoming', 'ev', '+EV', 'middling', 'arbitrage', 'player_props'];
      if (!validCategories.includes(category)) {
        console.log(`❌ CATEGORY ALL FILTER: ${opportunity.game} blocked - unknown category ${category}`);
        return false;
      }
    }
    
    // EV threshold filter - skip for upcoming preview events 
    if (parseFloat(minEV) > 0 && (activeCategory === 'all' || activeCategory === 'ev') && opportunity.market !== 'Upcoming Event') {
      if (opportunity.ev < parseFloat(minEV)) {
        return false;
      }
    }
    
    console.log(`✅ PASSED ALL FILTERS: ${opportunity.game} (${opportunity.category})`);
    return true;
  });

  // Filter opportunities by main sportsbook if selected
  const finalOpportunities = mainSportsbook === 'all' 
    ? filteredOpportunities
    : filteredOpportunities.filter(opp => 
        opp.oddsComparison?.some(book => book.sportsbook === mainSportsbook && book.isMainBook)
      );

  // DEBUG: Log filtering results to troubleshoot the display issue
  console.log(`🔍 FILTERING DEBUG: ${opportunities.length} total → ${filteredOpportunities.length} after filters → ${finalOpportunities.length} final`);
  console.log('📊 CATEGORY BREAKDOWN:', opportunities.reduce((acc: any, opp) => {
    acc[opp.category || 'unknown'] = (acc[opp.category || 'unknown'] || 0) + 1;
    return acc;
  }, {}));
  
  if (finalOpportunities.length === 0 && opportunities.length > 0) {
    console.log('🚨 ALL OPPORTUNITIES FILTERED OUT!');
    console.log('First raw opportunity:', opportunities[0]);
    console.log('Active category:', activeCategory);
    console.log('Selected market:', selectedMarket);
    console.log('Selected league:', selectedEventLeague);
    console.log('Selected timeframe:', selectedTimeframe);
  }

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
                      <div className="text-4xl font-bold font-mono text-[#D8AC35] dark:text-[#D8AC35]">{terminalStats?.evSignals?.toLocaleString() || '--'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600 dark:text-gray-400 text-sm font-mono uppercase tracking-wider mb-3">ARB SIGNALS</div>
                      <div className="text-4xl font-bold font-mono text-[#D8AC35] dark:text-[#D8AC35]">{terminalStats?.arbSignals?.toLocaleString() || '--'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600 dark:text-gray-400 text-sm font-mono uppercase tracking-wider mb-3">WIN RATE</div>
                      <div className="text-4xl font-bold font-mono text-[#D8AC35] dark:text-[#D8AC35]">{terminalStats?.winRate ? `${terminalStats.winRate}%` : '--'}</div>
                    </div>
                  </div>
                </div>

                {/* Simplified Control Panel - Just EV Threshold */}
                <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm px-8 py-4 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-4">
                        <div className="text-[#D8AC35] dark:text-[#D8AC35] text-sm font-mono uppercase tracking-wider">+EV THRESHOLD</div>
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
                          <span className="text-[#D8AC35] dark:text-[#D8AC35] font-mono text-lg font-bold min-w-16">+{minEV}%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${isRefetching ? 'bg-yellow-500 animate-pulse' : 'bg-[#D8AC35] dark:bg-[#D8AC35] animate-pulse'}`}></div>
                        <span className="text-[#D8AC35] dark:text-[#D8AC35] font-mono text-sm">
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
                        <div className="w-16 h-16 border-6 border-gray-300 dark:border-gray-700 border-t-[#D8AC35] dark:border-t-[#D8AC35] rounded-full animate-spin shadow-lg"></div>
                        <div className="w-12 h-12 border-6 border-gray-200 dark:border-gray-800 border-t-[#D8AC35] dark:border-t-[#D8AC35] rounded-full animate-spin absolute top-2 left-2 shadow-md" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                      </div>
                      <p className="text-[#D8AC35] dark:text-[#D8AC35] font-mono text-sm mt-4 animate-pulse">ANALYZING MARKET CONDITIONS...</p>
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
                        
                        {/* Value Assessment Guide */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-black dark:to-gray-900 border border-blue-200 dark:border-[#D8AC35] rounded-lg p-4 mb-6">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <div className="text-sm font-mono font-bold text-blue-800 dark:text-blue-200">
                              VALUE ASSESSMENT GUIDE
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-xs font-mono">
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                              <span className="text-gray-700 dark:text-gray-300">+5%: Excellent ⭐</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-gray-700 dark:text-gray-300">+3%: Strong 🔥</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                              <span className="text-gray-700 dark:text-gray-300">+1%: Good ✓</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                              <span className="text-gray-700 dark:text-gray-300">0%: Slight ~</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                              <span className="text-gray-700 dark:text-gray-300">-5%: Fair ≈</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                              <span className="text-gray-700 dark:text-gray-300">Below: Avoid ✗</span>
                            </div>
                          </div>
                          <div className="text-xs text-blue-700 dark:text-blue-300 mt-2">
                            Book % = Sportsbook's implied probability • Fair % = True probability after removing vig
                          </div>
                        </div>

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
                                    <div className="w-3 h-3 bg-[#D8AC35] dark:bg-[#D8AC35] rounded-full animate-pulse"></div>
                                    <span className="text-xs font-mono text-[#D8AC35] dark:text-[#D8AC35]">UPDATING...</span>
                                  </div>
                                )}
                                <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                                  Auto-refresh: {isPaused ? 'PAUSED' : (selectedTimeframe === 'upcoming' ? '30s' : '8s')} | {selectedTimeframe === 'upcoming' ? 'Upcoming (2 weeks)' : 'Live'} odds
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="text-xs font-mono text-gray-500 dark:text-gray-400">
                                {finalOpportunities.length} opportunities
                              </div>
                              <button
                                onClick={() => setIsPaused(!isPaused)}
                                className={`px-4 py-2 rounded-lg font-mono font-semibold shadow-lg transition-all duration-200 text-sm ${
                                  isPaused 
                                    ? 'bg-green-600 hover:bg-green-700 text-white hover:shadow-green-600/50' 
                                    : 'bg-yellow-500 hover:bg-yellow-600 text-black hover:shadow-yellow-500/50'
                                }`}
                                title={isPaused ? "Resume auto-refresh" : "Pause auto-refresh"}
                              >
                                {isPaused ? 'RESUME' : 'PAUSE'}
                              </button>
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

                          {/* Simplified Clean Filter Row */}
                          <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-6">
                              {/* LEAGUE Filter */}
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-[#D8AC35] font-mono font-semibold">LEAGUE:</span>
                                <Select value={selectedEventLeague} onValueChange={setSelectedEventLeague}>
                                  <SelectTrigger className="bg-transparent border-0 shadow-none font-mono text-sm h-7 focus:ring-0 p-0 min-w-[80px] text-[#D8AC35]">
                                    <SelectValue className="text-[#D8AC35] font-semibold" style={{ color: '#D8AC35' }} />
                                  </SelectTrigger>
                                  <SelectContent className="bg-gray-800 border-gray-600">
                                    <SelectItem value="all" className="text-white font-mono text-xs hover:bg-gray-700">ALL</SelectItem>
                                    <SelectItem value="mlb" className="text-white font-mono text-xs hover:bg-gray-700">MLB</SelectItem>
                                    <SelectItem value="nba" className="text-white font-mono text-xs hover:bg-gray-700">NBA</SelectItem>
                                    <SelectItem value="nfl" className="text-white font-mono text-xs hover:bg-gray-700">NFL</SelectItem>
                                    <SelectItem value="nhl" className="text-white font-mono text-xs hover:bg-gray-700">NHL</SelectItem>
                                    <SelectItem value="wnba" className="text-white font-mono text-xs hover:bg-gray-700">WNBA</SelectItem>
                                    <SelectItem value="soccer" className="text-white font-mono text-xs hover:bg-gray-700">SOCCER</SelectItem>
                                    <SelectItem value="tennis" className="text-white font-mono text-xs hover:bg-gray-700">TENNIS</SelectItem>
                                    <SelectItem value="golf" className="text-white font-mono text-xs hover:bg-gray-700">GOLF</SelectItem>
                                    <SelectItem value="cfl" className="text-white font-mono text-xs hover:bg-gray-700">CFL</SelectItem>
                                    <SelectItem value="cricket" className="text-white font-mono text-xs hover:bg-gray-700">CRICKET</SelectItem>
                                    <SelectItem value="mma" className="text-white font-mono text-xs hover:bg-gray-700">MMA</SelectItem>
                                    <SelectItem value="boxing" className="text-white font-mono text-xs hover:bg-gray-700">BOXING</SelectItem>
                                    <SelectItem value="racing" className="text-white font-mono text-xs hover:bg-gray-700">RACING</SelectItem>
                                    <SelectItem value="esports" className="text-white font-mono text-xs hover:bg-gray-700">ESPORTS</SelectItem>
                                    <SelectItem value="ncaab" className="text-white font-mono text-xs hover:bg-gray-700">NCAAB</SelectItem>
                                    <SelectItem value="ncaaf" className="text-white font-mono text-xs hover:bg-gray-700">NCAAF</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              {/* MARKET Filter */}
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-[#D8AC35] font-mono font-semibold">MARKET:</span>
                                <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                                  <SelectTrigger className="bg-transparent border-0 shadow-none font-mono text-sm h-7 focus:ring-0 p-0 min-w-[80px] text-[#D8AC35]">
                                    <SelectValue className="text-[#D8AC35] font-semibold" style={{ color: '#D8AC35' }} />
                                  </SelectTrigger>
                                  <SelectContent className="bg-gray-800 border-gray-600">
                                    <SelectItem value="all" className="text-white font-mono text-xs hover:bg-gray-700">ALL</SelectItem>
                                    <SelectItem value="moneyline" className="text-white font-mono text-xs hover:bg-gray-700">MONEYLINE</SelectItem>
                                    <SelectItem value="total" className="text-white font-mono text-xs hover:bg-gray-700">TOTAL</SelectItem>
                                    <SelectItem value="spread" className="text-white font-mono text-xs hover:bg-gray-700">SPREAD</SelectItem>
                                    <SelectItem value="player_props" className="text-white font-mono text-xs hover:bg-gray-700">PLAYER PROPS</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              {/* STATUS Filter */}
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-[#D8AC35] font-mono font-semibold">STATUS:</span>
                                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                                  <SelectTrigger className="bg-transparent border-0 shadow-none font-mono text-sm h-7 focus:ring-0 p-0 min-w-[80px] text-[#D8AC35]">
                                    <SelectValue className="text-[#D8AC35] font-semibold" style={{ color: '#D8AC35' }} />
                                  </SelectTrigger>
                                  <SelectContent className="bg-gray-800 border-gray-600">
                                    <SelectItem value="all" className="text-white font-mono text-xs hover:bg-gray-700">ALL</SelectItem>
                                    <SelectItem value="live" className="text-white font-mono text-xs hover:bg-gray-700">LIVE</SelectItem>
                                    <SelectItem value="upcoming" className="text-white font-mono text-xs hover:bg-gray-700">UPCOMING</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              {/* BOOKS Multi-Select Filter */}
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-[#D8AC35] font-mono font-semibold">BOOKS:</span>
                                <div className="relative">
                                  <button
                                    onClick={() => setShowBookSelector(!showBookSelector)}
                                    className="bg-transparent border-0 shadow-none font-mono text-sm h-7 focus:ring-0 p-0 min-w-[120px] text-[#D8AC35] font-semibold text-left cursor-pointer"
                                  >
                                    {selectedSportsbooks.includes('all') 
                                      ? 'ALL BOOKS' 
                                      : selectedSportsbooks.length === 1 
                                        ? selectedSportsbooks[0].toUpperCase()
                                        : `${selectedSportsbooks.length} SELECTED`
                                    }
                                  </button>
                                  {showBookSelector && (
                                    <div className="absolute top-8 left-0 bg-gray-800 border border-gray-600 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto min-w-[200px]">
                                      <div 
                                        className="px-3 py-2 text-white font-mono text-xs hover:bg-gray-700 cursor-pointer border-b border-gray-600"
                                        onClick={() => {
                                          setSelectedSportsbooks(['all']);
                                          setShowBookSelector(false);
                                        }}
                                      >
                                        <input 
                                          type="checkbox" 
                                          checked={selectedSportsbooks.includes('all')}
                                          onChange={() => {}}
                                          className="mr-2"
                                        />
                                        ALL BOOKS
                                      </div>
                                      {ALL_SPORTSBOOKS.map(book => (
                                        <div 
                                          key={book}
                                          className="px-3 py-2 text-white font-mono text-xs hover:bg-gray-700 cursor-pointer"
                                          onClick={() => {
                                            if (selectedSportsbooks.includes('all')) {
                                              setSelectedSportsbooks([book]);
                                            } else if (selectedSportsbooks.includes(book)) {
                                              const newSelection = selectedSportsbooks.filter(b => b !== book);
                                              setSelectedSportsbooks(newSelection.length > 0 ? newSelection : ['all']);
                                            } else {
                                              setSelectedSportsbooks([...selectedSportsbooks, book]);
                                            }
                                          }}
                                        >
                                          <input 
                                            type="checkbox" 
                                            checked={selectedSportsbooks.includes(book) && !selectedSportsbooks.includes('all')}
                                            onChange={() => {}}
                                            className="mr-2"
                                          />
                                          {book.toUpperCase()}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Dashboard-Style Trading Grid - Matching Reference Images */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
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
                              <p className="text-gray-600 dark:text-gray-400 font-mono text-sm mb-4">
                                {selectedTimeframe === 'live' 
                                  ? "No live games available right now. Check upcoming opportunities (2-week window)!" 
                                  : selectedTimeframe === 'upcoming'
                                    ? "No upcoming events found in the next 2 weeks. Try switching to Live or check back later."
                                    : activeCategory === 'all' 
                                      ? "Try adjusting your filters or check back in a moment." 
                                      : `No ${activeCategory} opportunities match your current filters.`
                                }
                              </p>
                              {selectedTimeframe === 'live' && (
                                <button 
                                  onClick={() => {
                                    console.log('🔄 Switching to upcoming events with 2-week window');
                                    setSelectedTimeframe('upcoming');
                                  }}
                                  className="bg-gold-light dark:bg-gold-dark text-white px-6 py-2 rounded-md hover:bg-gold-600 transition-colors font-mono"
                                >
                                  View Upcoming Opportunities (2 weeks) →
                                </button>
                              )}
                              {selectedTimeframe === 'upcoming' && (
                                <button 
                                  onClick={() => {
                                    console.log('🔄 Switching back to live events');
                                    setSelectedTimeframe('live');
                                  }}
                                  className="bg-gray-500 dark:bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors font-mono"
                                >
                                  ← Back to Live Events
                                </button>
                              )}
                            </div>
                          ) : (
                            <>
                              {/* Professional Trading Grid Data Rows */}

                              {/* Professional Trading Grid Data Rows */}
                              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {finalOpportunities.map((opportunity: BettingOpportunity, index: number) => (
                                  <div 
                                    key={opportunity.id} 
                                    className="grid grid-cols-[80px_2fr_120px_1fr_5fr] gap-4 items-center py-4 px-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200"
                                  >
                                    {/* Enhanced EV% Column - Following user specs: show -5% to positive EV */}
                                    <div className="text-center">
                                      <div className={`inline-flex items-center justify-center px-3 py-1 rounded-full font-mono text-sm font-bold ${
                                        opportunity.ev >= 5 ? 'bg-green-600 text-white' :
                                        opportunity.ev >= 3 ? 'bg-green-500 text-white' :
                                        opportunity.ev >= 1 ? 'bg-yellow-500 text-black' :
                                        opportunity.ev >= 0 ? 'bg-yellow-400 text-black' :
                                        opportunity.ev >= -5 ? 'bg-orange-500 text-white' :
                                        'bg-red-600 text-white'
                                      }`}>
                                        {/* Show bets down to -5% EV as specified by user */}
                                        {opportunity.ev >= 0 ? '+' : ''}{opportunity.ev.toFixed(1)}%
                                      </div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
                                        {opportunity.ev >= 5 ? 'Excellent Value ⭐' :
                                         opportunity.ev >= 3 ? 'Strong +EV 🔥' :
                                         opportunity.ev >= 1 ? 'Good Value ✓' :
                                         opportunity.ev >= 0 ? 'Slight Edge ~' : 
                                         opportunity.ev >= -5 ? 'Near Fair ≈' : 
                                         'Below Market ✗'}
                                      </div>
                                      {/* Show devigged fair probability and implied probability */}
                                      <div className="text-xs space-y-1 mt-1">
                                        <div className="text-gray-600 dark:text-gray-400 font-mono bg-gray-50 dark:bg-gray-800 px-1 rounded">
                                          Book: {(() => {
                                            const currentOdds = opportunity.mainBookOdds;
                                            if (!currentOdds) return 'N/A';
                                            
                                            // Use our exact devigging calculation for implied probability
                                            const impliedProb = currentOdds > 0 
                                              ? 100 / (currentOdds + 100)
                                              : (-currentOdds) / ((-currentOdds) + 100);
                                            
                                            return `${(impliedProb * 100).toFixed(1)}%`;
                                          })()}
                                        </div>
                                        <div className="text-blue-600 dark:text-blue-400 font-mono bg-blue-50 dark:bg-blue-900/20 px-1 rounded">
                                          Fair: {(() => {
                                            const currentOdds = opportunity.mainBookOdds;
                                            if (!currentOdds) return 'N/A';
                                            
                                            // Use our devigging calculation
                                            const impliedProb = currentOdds > 0 
                                              ? 100 / (currentOdds + 100)
                                              : (-currentOdds) / ((-currentOdds) + 100);
                                            
                                            // More sophisticated vig removal based on market type
                                            let vigEstimate = 0.025; // Default 2.5% per side
                                            if (opportunity.market === 'Moneyline') vigEstimate = 0.02; // Lower vig for moneyline
                                            if (opportunity.market === 'Spread') vigEstimate = 0.0227; // ~4.5% total vig / 2 sides
                                            if (opportunity.market === 'Total') vigEstimate = 0.0227; // ~4.5% total vig / 2 sides
                                            
                                            const fairProb = Math.max(0.02, Math.min(0.98, impliedProb - vigEstimate));
                                            
                                            return `${(fairProb * 100).toFixed(1)}%`;
                                          })()}
                                        </div>
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
                                                    
                                                    if (sport.includes('baseball') || sport === 'mlb') return `https://a.espncdn.com/i/teamlogos/mlb/500/${teamSlug}.png`;
                                                    if (sport.includes('basketball') || sport === 'nba') return `https://a.espncdn.com/i/teamlogos/nba/500/${teamSlug}.png`;
                                                    if (sport.includes('football') || sport === 'nfl') return `https://a.espncdn.com/i/teamlogos/nfl/500/${teamSlug}.png`;
                                                    if (sport.includes('hockey') || sport === 'nhl') return `https://a.espncdn.com/i/teamlogos/nhl/500/${teamSlug}.png`;
                                                    if (sport === 'soccer') return `https://a.espncdn.com/i/teamlogos/soccer/500/${teamSlug}.png`;
                                                    if (sport === 'mma' || sport === 'ufc') return `https://ui-avatars.com/api/?name=${encodeURIComponent(awayTeam.slice(0, 2))}&background=cc0000&color=ffffff&size=24`;
                                                    if (sport === 'cricket') return `https://ui-avatars.com/api/?name=${encodeURIComponent(awayTeam.slice(0, 2))}&background=006600&color=ffffff&size=24`;
                                                    if (sport === 'racing' || sport === 'motorsports') return `https://ui-avatars.com/api/?name=${encodeURIComponent(awayTeam.slice(0, 2))}&background=ffcc00&color=000000&size=24`;
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
                                                    
                                                    if (sport.includes('baseball') || sport === 'mlb') return `https://a.espncdn.com/i/teamlogos/mlb/500/${teamSlug}.png`;
                                                    if (sport.includes('basketball') || sport === 'nba') return `https://a.espncdn.com/i/teamlogos/nba/500/${teamSlug}.png`;
                                                    if (sport.includes('football') || sport === 'nfl') return `https://a.espncdn.com/i/teamlogos/nfl/500/${teamSlug}.png`;
                                                    if (sport.includes('hockey') || sport === 'nhl') return `https://a.espncdn.com/i/teamlogos/nhl/500/${teamSlug}.png`;
                                                    if (sport === 'soccer') return `https://a.espncdn.com/i/teamlogos/soccer/500/${teamSlug}.png`;
                                                    if (sport === 'mma' || sport === 'ufc') return `https://ui-avatars.com/api/?name=${encodeURIComponent(homeTeam.slice(0, 2))}&background=cc0000&color=ffffff&size=24`;
                                                    if (sport === 'cricket') return `https://ui-avatars.com/api/?name=${encodeURIComponent(homeTeam.slice(0, 2))}&background=006600&color=ffffff&size=24`;
                                                    if (sport === 'racing' || sport === 'motorsports') return `https://ui-avatars.com/api/?name=${encodeURIComponent(homeTeam.slice(0, 2))}&background=ffcc00&color=000000&size=24`;
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
                                          <div className="flex items-center gap-2">
                                            <EventStatusBadge 
                                              data-testid="event-status-badge"
                                              truthStatus={opportunity.truthStatus || 'UNKNOWN'} 
                                            />
                                            {opportunity.truthStatus === 'UPCOMING' && opportunity.gameTime && 
                                             opportunity.gameTime !== 'tbd' && opportunity.gameTime !== 'TBD' && (
                                              <span className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                                                {(() => {
                                                  try {
                                                    const gameTime = new Date(opportunity.gameTime);
                                                    return gameTime.toLocaleTimeString('en-US', { 
                                                      hour: 'numeric', 
                                                      minute: '2-digit',
                                                      timeZone: 'America/New_York'
                                                    }) + ' ET';
                                                  } catch {
                                                    return '';
                                                  }
                                                })()}
                                              </span>
                                            )}
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
                                        <div className="text-gray-700 dark:text-white font-bold text-base">
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
                                      <div className="text-gray-900 dark:text-white font-medium text-sm">
                                        {opportunity.market}
                                      </div>
                                      <div className="text-gray-500 dark:text-gray-400 text-xs">
                                        {opportunity.line && opportunity.line !== 'tdb' && opportunity.line !== 'N/A' ? opportunity.line : ''}
                                      </div>
                                    </div>

                                    {/* Odds Average Column */}
                                    <div className="text-center">
                                      {(() => {
                                        const deduplicatedOdds = deduplicateOdds(opportunity.oddsComparison || []);
                                        return deduplicatedOdds.length > 0;
                                      })() && (
                                        <div className="text-sm font-mono text-[#D8AC35] dark:text-[#D8AC35] font-bold">
                                          {(() => {
                                            const deduplicatedOdds = deduplicateOdds(opportunity.oddsComparison || []);
                                            const avgOdds = Math.round(
                                              deduplicatedOdds.reduce((sum: number, odds: SportsbookOdds) => sum + odds.odds, 0) / 
                                              deduplicatedOdds.length
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
                                          // Apply client-side deduplication as final cleanup
                                          const uniqueOdds = deduplicateOdds(opportunity.oddsComparison || []);

                                          return uniqueOdds.filter((odds: any) => {
                                            // Filter based on user selection
                                            if (selectedSportsbooks.includes('all')) return true;
                                            
                                            // Check if the sportsbook name matches any selected book (case-insensitive)
                                            return selectedSportsbooks.some(selectedBook => {
                                              const normalizedSelected = selectedBook.toLowerCase().replace(/\s+/g, '');
                                              const normalizedOdds = odds.sportsbook.toLowerCase().replace(/\s+/g, '');
                                              return normalizedOdds.includes(normalizedSelected) || normalizedSelected.includes(normalizedOdds);
                                            });
                                          }).map((odds: any, oddsIndex: number) => {
                                            const isMainBook = odds.isMainBook;
                                            
                                            // Use REAL sportsbook URLs from API data, no hardcoded URLs
                                            const getSportsbookUrl = (odds: any) => {
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
                                                    : 'bg-gray-100 dark:bg-gray-700/50 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600/70'
                                                }`}
                                                title={`Click to place bet on ${odds.sportsbook}`}
                                              >
                                                {/* Sportsbook Name */}
                                                <div className={`font-medium text-center w-full text-xs leading-tight ${
                                                  isMainBook ? 'text-black' : 'text-gray-700 dark:text-gray-300'
                                                }`}
                                                style={{ fontSize: '10px', lineHeight: '1.2' }}>
                                                  {odds.sportsbook.length > 8 ? odds.sportsbook.substring(0, 7) + '..' : odds.sportsbook}
                                                </div>
                                                {/* Odds */}
                                                <div className={`font-mono font-bold text-xs leading-tight ${
                                                  isMainBook ? 'text-black' : 'text-gray-900 dark:text-white'
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
                                          <div className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex items-center">
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
                              <div className="font-mono font-bold text-[#D8AC35] dark:text-[#D8AC35]">
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
                            {deduplicateOdds(opp.oddsComparison || []).map((odds, idx) => (
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

              <TabsContent value="launch-status" className="min-h-screen m-0 p-0 flex-1">
                <div className="flex flex-col h-full min-h-screen bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm">
                  <div className="p-8 max-w-4xl mx-auto">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Launch Readiness Dashboard</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Real-time system validation and demo access monitoring
                      </p>
                    </div>
                    <LaunchStatusWidget />
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
