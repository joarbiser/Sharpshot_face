// src/components/trading/SportsBettingTerminal.tsx
// Complete sports betting trading terminal implementation

import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../../../client/src/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../client/src/components/ui/select';
import { Slider } from '../../../client/src/components/ui/slider';
import { Badge } from '../../../client/src/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../client/src/components/ui/card';
import { Separator } from '../../../client/src/components/ui/separator';
import { Input } from '../../../client/src/components/ui/input';
import { apiService, ProcessedOpportunity } from '../../lib/apiService';
import { deduplicateOpportunities, formatBetType, getSportName } from '../../lib/opportunityUtils';
import { Loader2, RefreshCw, TrendingUp, AlertTriangle } from 'lucide-react';

// Supported sportsbooks with display names
const SPORTSBOOKS = [
  'Bet Rivers', 'Bet365', 'DraftKings', 'FanDuel', 'BetMGM', 'ESPN BET', 
  'Caesars', 'Unibet', 'William Hill', 'SugarHouse', 'Sportingbet', 
  'Sports Interaction', 'BetOnline', 'Bovada', 'Fanatics', 'PuntNow', 
  'SportsZino', 'SportTrade', 'Pinnacle'
];

const SPORTS = ['All Sports', 'Football', 'Basketball', 'Baseball', 'Hockey', 'Soccer', 'Tennis', 'Golf', 'MMA', 'Boxing'];
const MARKET_TYPES = ['All Markets', 'Moneyline', 'Spread', 'Total'];
const GAME_STATUSES = ['All Games', 'Live', 'Upcoming', 'Ended'];

interface TerminalFilters {
  sport: string;
  marketType: string;
  gameStatus: string;
  evRange: [number, number];
  preferredBooks: string[];
}

export default function SportsBettingTerminal() {
  const [activeCategory, setActiveCategory] = useState('All Bets');
  const [filters, setFilters] = useState<TerminalFilters>({
    sport: 'All Sports',
    marketType: 'All Markets',
    gameStatus: 'All Games',
    evRange: [-20, 10],
    preferredBooks: []
  });
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch betting opportunities
  const { 
    data: opportunities = [], 
    isLoading, 
    isError, 
    error, 
    refetch,
    isRefetching 
  } = useQuery({
    queryKey: ['betting-opportunities'],
    queryFn: async () => {
      const data = await apiService.fetchBettingOpportunities();
      return deduplicateOpportunities(data);
    },
    refetchInterval: 30000, // Auto-refresh every 30 seconds
    staleTime: 20000, // Consider data stale after 20 seconds
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
          filtered = filtered.filter(opp => opp.evPercent > 0);
          break;
        case 'Arbitrage':
          // Arbitrage opportunities would need additional logic
          filtered = filtered.filter(opp => opp.evPercent > 5);
          break;
        case 'Middling':
          // Middling opportunities would need additional logic
          filtered = filtered.filter(opp => opp.evPercent > 2 && opp.evPercent < 5);
          break;
      }
    }

    // Sport filter
    if (filters.sport !== 'All Sports') {
      filtered = filtered.filter(opp => 
        getSportName(opp.event.sport) === filters.sport ||
        getSportName(opp.event.league) === filters.sport
      );
    }

    // Market type filter
    if (filters.marketType !== 'All Markets') {
      filtered = filtered.filter(opp => 
        opp.market.type.toLowerCase() === filters.marketType.toLowerCase()
      );
    }

    // Game status filter
    if (filters.gameStatus !== 'All Games') {
      filtered = filtered.filter(opp => 
        opp.event.status === filters.gameStatus.toLowerCase()
      );
    }

    // EV range filter
    filtered = filtered.filter(opp => 
      opp.evPercent >= filters.evRange[0] && 
      opp.evPercent <= filters.evRange[1]
    );

    // Preferred sportsbooks filter
    if (filters.preferredBooks.length > 0) {
      filtered = filtered.filter(opp => 
        filters.preferredBooks.includes(opp.myPrice.book) ||
        opp.fieldPrices.some(price => filters.preferredBooks.includes(price.book))
      );
    }

    // Sort: Live first, then by EV descending
    return filtered.sort((a, b) => {
      // Live events first
      if (a.event.status === 'live' && b.event.status !== 'live') return -1;
      if (b.event.status === 'live' && a.event.status !== 'live') return 1;
      
      // Then by EV descending
      return b.evPercent - a.evPercent;
    });
  }, [opportunities, activeCategory, filters]);

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
    switch (status) {
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Trading Terminal</h1>
              <p className="text-sm text-muted-foreground">
                Real-time sports betting opportunities
              </p>
            </div>
            <div className="flex items-center gap-2">
              {lastUpdated && (
                <span className="text-sm text-muted-foreground">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <Button
                onClick={() => refetch()}
                variant="outline"
                size="sm"
                disabled={isRefetching}
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
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2">
            {['All Bets', '+EV', 'Arbitrage', 'Middling'].map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveCategory(category)}
              >
                {category}
                <Badge variant="outline" className="ml-2">
                  {activeCategory === category ? filteredOpportunities.length : 
                   category === 'All Bets' ? opportunities.length :
                   category === '+EV' ? opportunities.filter(o => o.evPercent > 0).length :
                   category === 'Arbitrage' ? opportunities.filter(o => o.evPercent > 5).length :
                   opportunities.filter(o => o.evPercent > 2 && o.evPercent < 5).length}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Select
              value={filters.sport}
              onValueChange={(value) => setFilters(prev => ({ ...prev, sport: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sport" />
              </SelectTrigger>
              <SelectContent>
                {SPORTS.map(sport => (
                  <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.marketType}
              onValueChange={(value) => setFilters(prev => ({ ...prev, marketType: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Market Type" />
              </SelectTrigger>
              <SelectContent>
                {MARKET_TYPES.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.gameStatus}
              onValueChange={(value) => setFilters(prev => ({ ...prev, gameStatus: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Game Status" />
              </SelectTrigger>
              <SelectContent>
                {GAME_STATUSES.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="space-y-2">
              <label className="text-sm font-medium">EV Range: {filters.evRange[0]}% to {filters.evRange[1]}%</label>
              <Slider
                value={filters.evRange}
                onValueChange={(value) => setFilters(prev => ({ ...prev, evRange: value as [number, number] }))}
                min={-20}
                max={10}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Preferred Books</label>
              <Select
                value={filters.preferredBooks.join(',')}
                onValueChange={(value) => setFilters(prev => ({ 
                  ...prev, 
                  preferredBooks: value ? value.split(',') : [] 
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select books" />
                </SelectTrigger>
                <SelectContent>
                  {SPORTSBOOKS.map(book => (
                    <SelectItem key={book} value={book}>{book}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
              <p className="text-lg font-semibold">Loading betting opportunities...</p>
              <p className="text-sm text-muted-foreground">Fetching real-time data from sportsbooks</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Total Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{filteredOpportunities.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">+EV Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-600">
                    {filteredOpportunities.filter(o => o.evPercent > 0).length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Live Games</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {filteredOpportunities.filter(o => o.event.status === 'live').length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Avg EV</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getEVColor(
                    filteredOpportunities.reduce((sum, o) => sum + o.evPercent, 0) / 
                    Math.max(filteredOpportunities.length, 1)
                  )}`}>
                    {filteredOpportunities.length > 0 ? 
                      `${(filteredOpportunities.reduce((sum, o) => sum + o.evPercent, 0) / filteredOpportunities.length).toFixed(1)}%` : 
                      '0.0%'
                    }
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Opportunities Table */}
            <Card>
              <CardHeader>
                <CardTitle>Betting Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredOpportunities.length === 0 ? (
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No opportunities found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters or check back later for new opportunities.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Event</th>
                          <th className="text-left p-3">Sport</th>
                          <th className="text-left p-3">Market</th>
                          <th className="text-left p-3">Best Odds</th>
                          <th className="text-left p-3">Implied Prob</th>
                          <th className="text-left p-3">EV</th>
                          <th className="text-left p-3">Book</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOpportunities.map((opportunity) => (
                          <tr key={opportunity.id} className="border-b hover:bg-muted/50">
                            <td className="p-3">
                              <div>
                                <div className="font-medium">
                                  {opportunity.event.away} @ {opportunity.event.home}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  {getStatusBadge(opportunity.event.status)}
                                  {opportunity.event.status === 'live' && 
                                   opportunity.event.homeScore !== undefined && 
                                   opportunity.event.awayScore !== undefined && (
                                    <span className="text-xs bg-muted px-2 py-1 rounded">
                                      {opportunity.event.awayScore} - {opportunity.event.homeScore}
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {new Date(opportunity.event.startTime).toLocaleString()}
                                </div>
                              </div>
                            </td>
                            <td className="p-3">
                              <Badge variant="outline">
                                {getSportName(opportunity.event.sport)}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <div className="font-medium">
                                {formatBetType(opportunity.market.side, opportunity.market.type, opportunity.market.line)}
                              </div>
                            </td>
                            <td className="p-3">
                              <span className="font-mono font-bold">
                                {formatAmericanOdds(opportunity.myPrice.odds)}
                              </span>
                            </td>
                            <td className="p-3">
                              <span className="font-mono">
                                {(opportunity.impliedProb * 100).toFixed(1)}%
                              </span>
                            </td>
                            <td className="p-3">
                              <span className={`font-mono font-bold ${getEVColor(opportunity.evPercent)}`}>
                                {opportunity.evPercent > 0 ? '+' : ''}{opportunity.evPercent.toFixed(1)}%
                              </span>
                            </td>
                            <td className="p-3">
                              <Badge variant="secondary">
                                {opportunity.myPrice.book}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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