// Complete Trading Terminal with XML API integration

import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, RefreshCw, TrendingUp, AlertTriangle, Search } from 'lucide-react';

// Import from our XML API service
import type { ProcessedOpportunity } from '../../../../src/lib/xmlApiService';

// Supported sportsbooks with display names
const SPORTSBOOKS = [
  'Bet Rivers', 'Bet365', 'DraftKings', 'FanDuel', 'BetMGM', 'ESPN BET', 
  'Caesars', 'Unibet', 'William Hill', 'SugarHouse', 'Sportingbet', 
  'Sports Interaction', 'BetOnline', 'Bovada', 'Fanatics', 'PuntNow', 
  'SportsZino', 'SportTrade', 'Pinnacle'
];

const SPORTS = ['All Sports', 'Football', 'Basketball', 'Baseball', 'Hockey', 'Soccer', 'Tennis', 'Golf', 'MMA', 'Boxing', 'Racing', 'Esports'];
const MARKET_TYPES = ['All Markets', 'Moneyline', 'Spread', 'Total', 'Run Line', 'Team Total'];
const GAME_STATUSES = ['All Games', 'Live', 'Upcoming', 'Ended'];

interface TerminalFilters {
  sport: string;
  marketType: string;
  gameStatus: string;
  evRange: [number, number];
  preferredBooks: string[];
  lineDiscrepancies: boolean;
  searchQuery: string;
}

export default function TradingTerminalXML() {
  const [activeCategory, setActiveCategory] = useState('All Bets');
  const [filters, setFilters] = useState<TerminalFilters>({
    sport: 'All Sports',
    marketType: 'All Markets',
    gameStatus: 'All Games',
    evRange: [-20, 10],
    preferredBooks: [],
    lineDiscrepancies: false,
    searchQuery: ''
  });
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch betting opportunities from XML API
  const { 
    data: opportunities = [], 
    isLoading, 
    isError, 
    error, 
    refetch,
    isRefetching 
  } = useQuery({
    queryKey: ['betting-opportunities-xml'],
    queryFn: async () => {
      const response = await fetch('/api/betting/xml-opportunities');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
    refetchInterval: 30000, // Auto-refresh every 30 seconds
    staleTime: 25000, // Consider data stale after 25 seconds
  });

  // Update last updated timestamp
  useEffect(() => {
    if (opportunities.length > 0) {
      setLastUpdated(new Date());
    }
  }, [opportunities]);

  // Filter and sort opportunities
  const filteredOpportunities = useMemo(() => {
    let filtered = [...opportunities];

    // Category filter
    if (activeCategory !== 'All Bets') {
      switch (activeCategory) {
        case '+EV':
          filtered = filtered.filter(opp => (opp.evPercent ?? 0) > 0);
          break;
        case 'Arbitrage':
          filtered = filtered.filter(opp => (opp.evPercent ?? 0) > 5);
          break;
        case 'Middling':
          filtered = filtered.filter(opp => (opp.evPercent ?? 0) > 2 && (opp.evPercent ?? 0) < 5);
          break;
      }
    }

    // Sport filter
    if (filters.sport !== 'All Sports') {
      filtered = filtered.filter(opp => {
        const sport = getSportName(opp.event?.sport || opp.event?.league || '');
        return sport === filters.sport;
      });
    }

    // Market type filter
    if (filters.marketType !== 'All Markets') {
      filtered = filtered.filter(opp => 
        (opp.market?.type || '').toLowerCase() === filters.marketType.toLowerCase()
      );
    }

    // Game status filter
    if (filters.gameStatus !== 'All Games') {
      filtered = filtered.filter(opp => 
        (opp.event?.status || '').toLowerCase() === filters.gameStatus.toLowerCase()
      );
    }

    // EV range filter
    filtered = filtered.filter(opp => {
      const ev = opp.evPercent ?? 0;
      return ev >= filters.evRange[0] && ev <= filters.evRange[1];
    });

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(opp => 
        (opp.event?.home || '').toLowerCase().includes(query) ||
        (opp.event?.away || '').toLowerCase().includes(query) ||
        (opp.myPrice?.book || '').toLowerCase().includes(query)
      );
    }

    // Preferred sportsbooks filter
    if (filters.preferredBooks.length > 0) {
      filtered = filtered.filter(opp => 
        filters.preferredBooks.includes(opp.myPrice?.book || '') ||
        (opp.fieldPrices || []).some(price => filters.preferredBooks.includes(price.book))
      );
    }

    // Sort: Live first, then by EV descending
    return filtered.sort((a, b) => {
      // Live events first
      if (a.event?.status === 'live' && b.event?.status !== 'live') return -1;
      if (b.event?.status === 'live' && a.event?.status !== 'live') return 1;
      
      // Then by EV descending
      return (b.evPercent ?? 0) - (a.evPercent ?? 0);
    });
  }, [opportunities, activeCategory, filters]);

  // Get sport name from league
  const getSportName = (league: string): string => {
    if (!league) return 'Unknown';
    
    const leagueLower = league.toLowerCase();
    
    if (leagueLower.includes('nfl') || leagueLower.includes('football')) return 'Football';
    if (leagueLower.includes('nba') || leagueLower.includes('basketball')) return 'Basketball';
    if (leagueLower.includes('mlb') || leagueLower.includes('baseball')) return 'Baseball';
    if (leagueLower.includes('nhl') || leagueLower.includes('hockey')) return 'Hockey';
    if (leagueLower.includes('soccer') || leagueLower.includes('fifa') || leagueLower.includes('uefa')) return 'Soccer';
    if (leagueLower.includes('tennis')) return 'Tennis';
    if (leagueLower.includes('golf')) return 'Golf';
    if (leagueLower.includes('mma') || leagueLower.includes('ufc')) return 'MMA';
    if (leagueLower.includes('boxing')) return 'Boxing';
    if (leagueLower.includes('racing') || leagueLower.includes('f1') || leagueLower.includes('nascar')) return 'Racing';
    if (leagueLower.includes('esports') || leagueLower.includes('lol') || leagueLower.includes('csgo')) return 'Esports';
    
    return league;
  };

  // Format bet type properly
  const formatBetType = (side: string, type: string, line?: number): string => {
    const typeLC = type.toLowerCase();
    
    if (typeLC === 'moneyline') {
      return side === 'home' ? 'Home ML' : 'Away ML';
    }
    
    if (typeLC === 'spread' || typeLC === 'point spread') {
      if (line !== undefined) {
        return side === 'home' ? `Home ${line > 0 ? '+' : ''}${line}` : `Away ${line > 0 ? '+' : ''}${line}`;
      }
      return side === 'home' ? 'Home Spread' : 'Away Spread';
    }
    
    if (typeLC === 'total' || typeLC === 'over/under') {
      if (line !== undefined) {
        return side === 'over' ? `Over ${line}` : `Under ${line}`;
      }
      return side === 'over' ? 'Over' : 'Under';
    }
    
    return `${side} ${type}`;
  };

  // Get EV color for display
  const getEVColor = (ev: number): string => {
    if (ev > 10) return 'text-purple-400';
    if (ev >= 2) return 'text-emerald-400';
    if (ev >= -5) return 'text-amber-400';
    if (ev >= -10) return 'text-orange-400';
    return 'text-rose-400';
  };

  // Format American odds display
  const formatAmericanOdds = (decimalOdds: number): string => {
    if (decimalOdds >= 2.0) {
      return `+${Math.round((decimalOdds - 1) * 100)}`;
    } else {
      return `${Math.round(-100 / (decimalOdds - 1))}`;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'live':
        return <Badge variant="destructive" className="animate-pulse">Live</Badge>;
      case 'upcoming':
        return <Badge variant="secondary">Upcoming</Badge>;
      case 'ended':
        return <Badge variant="outline">Ended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const resetFilters = () => {
    setFilters({
      sport: 'All Sports',
      marketType: 'All Markets',
      gameStatus: 'All Games',
      evRange: [-20, 10],
      preferredBooks: [],
      lineDiscrepancies: false,
      searchQuery: ''
    });
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
          <p className="text-gray-600 mb-4">
            {error instanceof Error ? error.message : 'Failed to fetch betting opportunities'}
          </p>
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-amber-400">Trading Terminal</h1>
              <p className="text-sm text-zinc-400">
                Real-time sports betting opportunities via XML API
              </p>
            </div>
            <div className="flex items-center gap-2">
              {lastUpdated && (
                <span className="text-sm text-zinc-400">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <Button
                onClick={() => refetch()}
                variant="outline"
                size="sm"
                disabled={isRefetching}
                className="border-zinc-700 hover:bg-zinc-800"
              >
                {isRefetching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-zinc-800 bg-zinc-900">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 flex-wrap">
            {['All Bets', '+EV', 'Arbitrage', 'Middling'].map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? 'bg-emerald-600 hover:bg-emerald-700' : 'hover:bg-zinc-800'}
              >
                {category}
                <Badge variant="outline" className="ml-2 border-zinc-600">
                  {activeCategory === category ? filteredOpportunities.length : 
                   category === 'All Bets' ? opportunities.length :
                   category === '+EV' ? opportunities.filter(o => (o.evPercent ?? 0) > 0).length :
                   category === 'Arbitrage' ? opportunities.filter(o => (o.evPercent ?? 0) > 5).length :
                   opportunities.filter(o => (o.evPercent ?? 0) > 2 && (o.evPercent ?? 0) < 5).length}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="border-b border-zinc-800 bg-zinc-900">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            <Select
              value={filters.sport}
              onValueChange={(value) => setFilters(prev => ({ ...prev, sport: value }))}
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Sport" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {SPORTS.map(sport => (
                  <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.marketType}
              onValueChange={(value) => setFilters(prev => ({ ...prev, marketType: value }))}
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Market Type" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {MARKET_TYPES.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.gameStatus}
              onValueChange={(value) => setFilters(prev => ({ ...prev, gameStatus: value }))}
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Game Status" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {GAME_STATUSES.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-zinc-400" />
              <Input
                placeholder="Search teams, books..."
                value={filters.searchQuery}
                onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="lineDiscrepancies"
                checked={filters.lineDiscrepancies}
                onCheckedChange={(checked) => setFilters(prev => ({ ...prev, lineDiscrepancies: !!checked }))}
                className="border-zinc-600 data-[state=checked]:bg-emerald-600"
              />
              <label htmlFor="lineDiscrepancies" className="text-sm text-zinc-300">
                Line Discrepancies
              </label>
            </div>

            <Button
              onClick={resetFilters}
              variant="outline"
              size="sm"
              className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white"
            >
              Reset Filters
            </Button>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-zinc-300">
              EV Threshold: {filters.evRange[0]}% to {filters.evRange[1]}%
            </label>
            <Slider
              value={filters.evRange}
              onValueChange={(value) => setFilters(prev => ({ ...prev, evRange: value as [number, number] }))}
              min={-20}
              max={10}
              step={1}
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-amber-400" />
              <p className="text-lg font-semibold text-white">Loading betting opportunities...</p>
              <p className="text-sm text-zinc-400">Fetching real-time data from XML API</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-zinc-300">Total Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{filteredOpportunities.length}</div>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-zinc-300">+EV Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-400">
                    {filteredOpportunities.filter(o => (o.evPercent ?? 0) > 0).length}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-zinc-300">Live Games</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-400">
                    {filteredOpportunities.filter(o => o.event?.status === 'live').length}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-zinc-300">Avg EV</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getEVColor(
                    filteredOpportunities.reduce((sum, o) => sum + (o.evPercent ?? 0), 0) / 
                    Math.max(filteredOpportunities.length, 1)
                  )}`}>
                    {filteredOpportunities.length > 0 ? 
                      `${(filteredOpportunities.reduce((sum, o) => sum + (o.evPercent ?? 0), 0) / filteredOpportunities.length).toFixed(1)}%` : 
                      '0.0%'
                    }
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Opportunities Table */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-amber-400">Betting Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredOpportunities.length === 0 ? (
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2 text-white">No opportunities found</h3>
                    <p className="text-zinc-400">
                      Try adjusting your filters or check back later for new opportunities.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <div style={{ height: 'calc(100vh - 500px)', overflowY: 'auto' }}>
                      <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-zinc-800 border-b border-zinc-700">
                          <tr>
                            <th className="text-left p-3 w-56">Event</th>
                            <th className="text-left p-3 w-16">Sport</th>
                            <th className="text-left p-3 w-28">Bet Type</th>
                            <th className="text-left p-3 w-20">Market</th>
                            <th className="text-left p-3 w-16">Line</th>
                            <th className="text-left p-3 w-20">Implied Prob</th>
                            <th className="text-left p-3 w-16">EV%</th>
                            <th className="text-left p-3 w-20">Preferred</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredOpportunities.map((opportunity, index) => (
                            <tr key={opportunity.id} className={`border-b border-zinc-800 hover:bg-zinc-800/50 ${index % 2 === 0 ? 'bg-zinc-950/50' : ''}`}>
                              <td className="p-3 w-56">
                                <div>
                                  <div className="font-medium text-white">
                                    {opportunity.event?.away} @ {opportunity.event?.home}
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    {getStatusBadge(opportunity.event?.status || '')}
                                    {opportunity.event?.status === 'live' && 
                                     opportunity.event?.homeScore !== undefined && 
                                     opportunity.event?.awayScore !== undefined && (
                                      <span className="text-xs bg-zinc-700 text-white px-2 py-1 rounded">
                                        {opportunity.event.awayScore} - {opportunity.event.homeScore}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs text-zinc-400 mt-1">
                                    {opportunity.event?.startTime ? new Date(opportunity.event.startTime).toLocaleString() : ''}
                                  </div>
                                </div>
                              </td>
                              <td className="p-3 w-16">
                                <Badge variant="outline" className="border-zinc-600 text-zinc-300">
                                  {getSportName(opportunity.event?.sport || opportunity.event?.league || '')}
                                </Badge>
                              </td>
                              <td className="p-3 w-28">
                                <div className="font-medium text-white">
                                  {formatBetType(opportunity.market?.side || '', opportunity.market?.type || '', opportunity.market?.line)}
                                </div>
                              </td>
                              <td className="p-3 w-20">
                                <span className="text-zinc-300">{opportunity.market?.type || ''}</span>
                              </td>
                              <td className="p-3 w-16">
                                <span className="text-zinc-300">
                                  {opportunity.market?.line !== undefined ? opportunity.market.line : '-'}
                                </span>
                              </td>
                              <td className="p-3 w-20">
                                <span className="font-mono text-white">
                                  {opportunity.impliedProb?.toFixed(1) || '0.0'}%
                                </span>
                              </td>
                              <td className="p-3 w-16">
                                <span className={`font-mono font-bold ${getEVColor(opportunity.evPercent ?? 0)}`}>
                                  {(opportunity.evPercent ?? 0) > 0 ? '+' : ''}{(opportunity.evPercent ?? 0).toFixed(1)}%
                                </span>
                              </td>
                              <td className="p-3 w-20">
                                <div className="space-y-1">
                                  <Badge variant="secondary" className="bg-zinc-700 text-white text-xs">
                                    {opportunity.myPrice?.book || 'Unknown'}
                                  </Badge>
                                  <div className="font-mono font-bold text-white text-xs">
                                    {formatAmericanOdds(opportunity.myPrice?.odds || 1)}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}