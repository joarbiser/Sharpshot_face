import React, { useState, useMemo, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ChevronUp, ChevronDown, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { BettingOpportunity } from '../../../shared/schema';

interface NewTerminalTableProps {
  opportunities: BettingOpportunity[];
  loading: boolean;
  error?: string | null;
  onRowClick?: (opportunity: BettingOpportunity) => void;
  className?: string;
}

type SortKey = 'event' | 'league' | 'market' | 'myOdds' | 'winProbability' | 'evPercent';
type SortDirection = 'asc' | 'desc';

// Color scale for +EV%
const getEVColor = (ev: number) => {
  if (ev <= -2) return 'rgb(239 68 68)'; // solid red
  if (ev >= 3) return 'rgb(34 197 94)'; // solid green
  
  // Fade from red to yellow to green between -2% and +3%
  const normalizedEV = (ev + 2) / 5; // normalize to 0-1
  
  if (normalizedEV <= 0.5) {
    // Red to yellow (0-0.5)
    const factor = normalizedEV * 2;
    const r = 239;
    const g = Math.round(68 + (234 - 68) * factor); // 68 to 234
    const b = 68;
    return `rgb(${r} ${g} ${b})`;
  } else {
    // Yellow to green (0.5-1)
    const factor = (normalizedEV - 0.5) * 2;
    const r = Math.round(239 - (239 - 34) * factor); // 239 to 34
    const g = Math.round(234 - (234 - 197) * factor); // 234 to 197
    const b = Math.round(68 + (94 - 68) * factor); // 68 to 94
    return `rgb(${r} ${g} ${b})`;
  }
};

// Convert American odds to display format
const formatOdds = (odds: number): string => {
  if (odds > 0) return `+${odds}`;
  return odds.toString();
};

// Format win probability as percentage
const formatWinProbability = (prob: number): string => {
  return `${(prob * 100).toFixed(1)}%`;
};

// Mock function to get book abbreviation for chips
const getBookAbbreviation = (bookName: string): string => {
  const abbrs: Record<string, string> = {
    'DraftKings': 'DK',
    'FanDuel': 'FD',
    'BetMGM': 'MGM',
    'Caesars': 'CZR',
    'BetRivers': 'BR',
    'PointsBet': 'PB',
    'WynnBET': 'WB',
    'Barstool': 'BS',
    'theScore': 'SCR',
    'Unibet': 'UB'
  };
  return abbrs[bookName] || bookName.slice(0, 3).toUpperCase();
};

export function NewTerminalTable({ 
  opportunities, 
  loading, 
  error, 
  onRowClick,
  className = ''
}: NewTerminalTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('evPercent');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>([]);
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);

  const parentRef = useRef<HTMLDivElement>(null);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    if (!opportunities) return [];

    // Filter by search term
    let filtered = opportunities.filter(opp => {
      const searchLower = searchTerm.toLowerCase();
      const event = `${opp.event?.away || ''} @ ${opp.event?.home || ''}`.toLowerCase();
      const prop = `${opp.market?.side || ''} ${opp.market?.value || ''}`.toLowerCase();
      
      return event.includes(searchLower) || 
             prop.includes(searchLower) ||
             (opp.sport || '').toLowerCase().includes(searchLower);
    });

    // Filter by leagues
    if (selectedLeagues.length > 0) {
      filtered = filtered.filter(opp => 
        selectedLeagues.includes(opp.sport || '')
      );
    }

    // Filter by markets
    if (selectedMarkets.length > 0) {
      filtered = filtered.filter(opp => 
        selectedMarkets.includes(opp.market?.type || '')
      );
    }

    // Sort data
    return filtered.sort((a, b) => {
      let aVal: any, bVal: any;

      switch (sortKey) {
        case 'event':
          aVal = `${a.event?.away} @ ${a.event?.home}`;
          bVal = `${b.event?.away} @ ${b.event?.home}`;
          break;
        case 'league':
          aVal = a.sport || '';
          bVal = b.sport || '';
          break;
        case 'market':
          aVal = a.market?.type || '';
          bVal = b.market?.type || '';
          break;
        case 'myOdds':
          aVal = a.myPrice?.odds || 0;
          bVal = b.myPrice?.odds || 0;
          break;
        case 'winProbability':
          aVal = a.fairProbability || 0;
          bVal = b.fairProbability || 0;
          break;
        case 'evPercent':
          aVal = a.evPercent || 0;
          bVal = b.evPercent || 0;
          break;
        default:
          return 0;
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [opportunities, sortKey, sortDirection, searchTerm, selectedLeagues, selectedMarkets]);

  // Get unique leagues and markets for filters
  const availableLeagues = useMemo(() => {
    const leagues = new Set(opportunities?.map(opp => opp.sport).filter(Boolean) || []);
    return Array.from(leagues).sort();
  }, [opportunities]);

  const availableMarkets = useMemo(() => {
    const markets = new Set(opportunities?.map(opp => opp.market?.type).filter(Boolean) || []);
    return Array.from(markets).sort();
  }, [opportunities]);

  // Virtualization setup
  const rowVirtualizer = useVirtualizer({
    count: filteredAndSortedData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48, // 48px row height
    overscan: 10,
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const SortButton = ({ sortKey: key, children, className: buttonClassName = '' }: { 
    sortKey: SortKey; 
    children: React.ReactNode; 
    className?: string;
  }) => (
    <Button
      variant="ghost"
      onClick={() => handleSort(key)}
      className={`h-auto p-1 font-semibold hover:bg-muted/50 ${buttonClassName}`}
      style={{ fontFamily: "'Rajdhani', sans-serif" }}
    >
      <span className="flex items-center gap-1">
        {children}
        {sortKey === key && (
          sortDirection === 'asc' ? 
            <ChevronUp className="h-3 w-3" /> : 
            <ChevronDown className="h-3 w-3" />
        )}
      </span>
    </Button>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Loading opportunities...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-destructive">
        <span style={{ fontFamily: "'Rajdhani', sans-serif" }}>Error: {error}</span>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className={`w-full ${className}`}>
        {/* Search and Filter Controls */}
        <div className="flex flex-wrap gap-3 mb-4 p-4 bg-card rounded-lg border">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events, props..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              />
            </div>
          </div>
          
          {/* League Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                <Filter className="h-4 w-4" />
                Leagues ({selectedLeagues.length})
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => setSelectedLeagues([])}
                className="font-medium"
              >
                All Leagues
              </DropdownMenuItem>
              {availableLeagues.map(league => (
                <DropdownMenuItem
                  key={league}
                  onClick={() => {
                    setSelectedLeagues(prev => 
                      prev.includes(league) 
                        ? prev.filter(l => l !== league)
                        : [...prev, league]
                    );
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedLeagues.includes(league)}
                    onChange={() => {}}
                    className="h-3 w-3"
                  />
                  {league}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Market Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                <Filter className="h-4 w-4" />
                Markets ({selectedMarkets.length})
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => setSelectedMarkets([])}
                className="font-medium"
              >
                All Markets
              </DropdownMenuItem>
              {availableMarkets.map(market => (
                <DropdownMenuItem
                  key={market}
                  onClick={() => {
                    setSelectedMarkets(prev => 
                      prev.includes(market) 
                        ? prev.filter(m => m !== market)
                        : [...prev, market]
                    );
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedMarkets.includes(market)}
                    onChange={() => {}}
                    className="h-3 w-3"
                  />
                  {market}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Virtualized Table */}
        <div className="border rounded-lg bg-card">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-card border-b">
            <div className="grid grid-cols-8 gap-2 p-3 text-sm font-semibold text-muted-foreground">
              <div className="col-span-2">
                <SortButton sortKey="event">Event</SortButton>
              </div>
              <div>
                <SortButton sortKey="league">League</SortButton>
              </div>
              <div>Prop</div>
              <div>
                <SortButton sortKey="market">Market</SortButton>
              </div>
              <div>
                <SortButton sortKey="myOdds">My Odds</SortButton>
              </div>
              <div>
                <SortButton sortKey="winProbability">Win Prob</SortButton>
              </div>
              <div>
                <SortButton sortKey="evPercent">+EV%</SortButton>
              </div>
            </div>
          </div>

          {/* Virtualized Body */}
          <div
            ref={parentRef}
            className="h-[600px] overflow-auto"
            style={{ contain: 'strict' }}
          >
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                const opportunity = filteredAndSortedData[virtualItem.index];
                if (!opportunity) return null;

                const eventDate = opportunity.event?.startTime ? 
                  new Date(opportunity.event.startTime).toLocaleDateString('en-US', {
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  }) : '';

                const eventLabel = `${opportunity.event?.away || ''} @ ${opportunity.event?.home || ''} ${eventDate ? `(${eventDate})` : ''}`;
                
                // Create prop description using team/player names
                let propDescription = '';
                if (opportunity.market?.type === 'Moneyline') {
                  propDescription = `${opportunity.market?.side === 'home' ? opportunity.event?.home : opportunity.event?.away} Moneyline`;
                } else {
                  propDescription = `${opportunity.market?.side === 'over' ? 'Over' : opportunity.market?.side === 'under' ? 'Under' : ''} ${opportunity.market?.value || ''}`;
                }

                return (
                  <div
                    key={virtualItem.key}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                    }}
                    className="grid grid-cols-8 gap-2 p-3 text-sm border-b hover:bg-muted/30 cursor-pointer transition-colors"
                    onClick={() => onRowClick?.(opportunity)}
                  >
                    {/* Event */}
                    <div className="col-span-2 font-medium text-foreground truncate" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                      {eventLabel}
                    </div>

                    {/* League */}
                    <div className="text-muted-foreground" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                      {opportunity.sport || ''}
                    </div>

                    {/* Prop */}
                    <div className="font-medium text-foreground" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                      {propDescription}
                    </div>

                    {/* Market */}
                    <div className="text-muted-foreground" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                      {opportunity.market?.type || ''}
                    </div>

                    {/* My Odds */}
                    <div>
                      {opportunity.myPrice && (
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="outline" className="px-2 py-1 text-xs hover:bg-muted">
                              {formatOdds(opportunity.myPrice.odds)}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{opportunity.myPrice.book}</p>
                            <p className="text-xs text-muted-foreground">
                              Updated: {new Date(opportunity.updatedAt).toLocaleTimeString()}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>

                    {/* Win Probability */}
                    <div className="font-medium" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                      {formatWinProbability(opportunity.fairProbability || 0)}
                    </div>

                    {/* +EV% */}
                    <div 
                      className="font-bold"
                      style={{ 
                        color: getEVColor(opportunity.evPercent || 0),
                        fontFamily: "'Rajdhani', sans-serif"
                      }}
                    >
                      {opportunity.evPercent !== undefined ? `${opportunity.evPercent > 0 ? '+' : ''}${opportunity.evPercent.toFixed(1)}%` : '—'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Results count */}
          <div className="p-3 text-sm text-muted-foreground border-t bg-muted/30" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            Showing {filteredAndSortedData.length} of {opportunities?.length || 0} opportunities
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}