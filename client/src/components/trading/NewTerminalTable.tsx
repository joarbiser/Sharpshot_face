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

// Color scale for +EV% with proper thresholds
const getEVColor = (ev: number) => {
  if (ev <= -2) return 'text-red-500'; // ≤ -2% red
  if (ev >= 3) return 'text-green-500'; // ≥ +3% green
  
  // Smooth gradient between -2% and +3%
  const normalizedEV = (ev + 2) / 5; // normalize to 0-1
  
  if (normalizedEV <= 0.4) {
    return 'text-red-400'; // Red zone
  } else if (normalizedEV <= 0.6) {
    return 'text-yellow-600'; // Yellow transition
  } else {
    return 'text-yellow-500'; // Approaching green
  }
};

// Format American odds with + for positive
const formatOdds = (odds: number): string => {
  if (odds > 0) return `+${odds}`;
  return odds.toString();
};

// Format win probability - handle both 0-1 and 1-100 ranges
const formatWinProbability = (prob: number): string => {
  if (prob === undefined || prob === null || isNaN(prob)) return '—';
  
  let percentage = prob;
  
  // If value is 0-1, convert to percentage
  if (prob <= 1) {
    percentage = prob * 100;
  }
  
  // Clamp to 0-100 range
  percentage = Math.max(0, Math.min(100, percentage));
  
  return `${percentage.toFixed(1)}%`;
};

// League mapping with proper codes and full names
const LEAGUE_MAP: Record<string, { code: string; fullName: string }> = {
  'nfl': { code: 'NFL', fullName: 'National Football League' },
  'nba': { code: 'NBA', fullName: 'National Basketball Association' },
  'mlb': { code: 'MLB', fullName: 'Major League Baseball' },
  'nhl': { code: 'NHL', fullName: 'National Hockey League' },
  'ncaaf': { code: 'NCAAF', fullName: 'NCAA Football' },
  'ncaab': { code: 'NCAAB', fullName: 'NCAA Basketball' },
  'mma': { code: 'UFC', fullName: 'Ultimate Fighting Championship' },
  'ufc': { code: 'UFC', fullName: 'Ultimate Fighting Championship' },
  'soccer': { code: 'EPL', fullName: 'English Premier League' },
  'football': { code: 'EPL', fullName: 'English Premier League' },
  'mls': { code: 'MLS', fullName: 'Major League Soccer' },
  'ucl': { code: 'UCL', fullName: 'UEFA Champions League' },
  'tennis': { code: 'ATP', fullName: 'Association of Tennis Professionals' },
  'golf': { code: 'PGA', fullName: 'Professional Golfers Association' },
  'boxing': { code: 'BOXING', fullName: 'Professional Boxing' },
  'baseball': { code: 'MLB', fullName: 'Major League Baseball' },
  'basketball': { code: 'NBA', fullName: 'National Basketball Association' },
  'hockey': { code: 'NHL', fullName: 'National Hockey League' }
};

// Get league code
const getLeagueCode = (sport: string): string => {
  const league = LEAGUE_MAP[sport?.toLowerCase()];
  return league?.code || sport?.toUpperCase() || '';
};

// Get league full name
const getLeagueFullName = (sport: string): string => {
  const league = LEAGUE_MAP[sport?.toLowerCase()];
  return league?.fullName || sport || '';
};

// Normalize market names
const normalizeMarket = (market: string): string => {
  const marketMap: Record<string, string> = {
    'total': 'Total Points',
    'spread': 'Point Spread', 
    'moneyline': 'Moneyline',
    'ml': 'Moneyline',
    'player_rebounds': 'Player Rebounds',
    'player_assists': 'Player Assists',
    'player_points': 'Player Points'
  };
  
  return marketMap[market?.toLowerCase()] || market || '';
};

// Generate clean, natural prop descriptions
const generatePropDescription = (opportunity: BettingOpportunity): string => {
  const { market, event } = opportunity;
  
  if (!market) return '';
  
  // Handle different market types with clean formatting
  switch (market.type?.toLowerCase()) {
    case 'moneyline':
    case 'ml':
      const team = market.side === 'home' ? event?.home : event?.away;
      return `${team || 'Team'} Moneyline`;
      
    case 'total':
    case 'total_points':
    case 'total_o/u':
      const total = market.value || market.line;
      if (market.side === 'over') {
        return `Over ${total}`;
      } else if (market.side === 'under') {
        return `Under ${total}`;
      }
      return `Total ${total}`;
      
    case 'spread':
    case 'point_spread':
      const spreadValue = market.value || market.line;
      const spreadTeam = market.side === 'home' ? event?.home : event?.away;
      // Use proper minus symbol and format
      const formattedSpread = spreadValue > 0 ? `+${spreadValue}` : `${spreadValue}`.replace('-', '−');
      return `${spreadTeam || 'Team'} ${formattedSpread}`;
      
    case 'player_rebounds':
    case 'player_assists': 
    case 'player_points':
      const stat = market.type.replace('player_', '').replace(/s$/, '');
      const player = market.player || 'Player';
      const statValue = market.value;
      if (market.side === 'over') {
        return `${player} Over ${statValue} ${stat.charAt(0).toUpperCase() + stat.slice(1)}s`;
      } else if (market.side === 'under') {
        return `${player} Under ${statValue} ${stat.charAt(0).toUpperCase() + stat.slice(1)}s`;
      }
      return `${player} ${statValue} ${stat.charAt(0).toUpperCase() + stat.slice(1)}s`;
      
    default:
      // Clean fallback
      const cleanType = market.type?.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || '';
      const value = market.value || market.line;
      const side = market.side;
      
      if (side === 'over' && value) return `Over ${value}`;
      if (side === 'under' && value) return `Under ${value}`;
      if (value) return `${cleanType} ${value}`;
      return cleanType;
  }
};

// Format event with proper date handling
const formatEventLabel = (opportunity: BettingOpportunity): string => {
  const { event } = opportunity;
  if (!event) return '';
  
  const eventName = `${event.away || ''} @ ${event.home || ''}`;
  
  // Handle date formatting with fallback
  if (event.startTime) {
    try {
      const date = new Date(event.startTime);
      if (!isNaN(date.getTime())) {
        // Format as "YYYY-MM-DD h:mma z"
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = date.getHours() % 12 || 12;
        const minute = String(date.getMinutes()).padStart(2, '0');
        const ampm = date.getHours() >= 12 ? 'pm' : 'am';
        const timezone = date.toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2] || 'EST';
        
        const formatted = `${year}-${month}-${day} ${hour}:${minute}${ampm} ${timezone}`;
        return `${eventName} (${formatted})`;
      }
    } catch (e) {
      // If date parsing fails, just return event name without parenthetical
    }
  }
  
  return eventName;
};

// Get relative time for tooltips
const getRelativeTime = (timestamp: string | Date): string => {
  try {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  } catch {
    return 'unknown';
  }
};

// Get book logo (placeholder implementation)
const getBookLogo = (bookName: string): string => {
  // For now, return a simple placeholder - in real implementation this would be actual logos
  const firstLetter = bookName?.charAt(0)?.toUpperCase() || '?';
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
      <rect width="14" height="14" fill="#3B82F6" rx="2"/>
      <text x="7" y="9" text-anchor="middle" fill="white" font-family="Arial" font-size="8" font-weight="bold">${firstLetter}</text>
    </svg>
  `)}`;
};

// Debounced search hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

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

  // Debounce search term by 300ms
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const parentRef = useRef<HTMLDivElement>(null);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    if (!opportunities) return [];

    // Filter by search term
    let filtered = opportunities.filter(opp => {
      const searchLower = debouncedSearchTerm.toLowerCase();
      const event = formatEventLabel(opp).toLowerCase();
      const prop = generatePropDescription(opp).toLowerCase();
      const league = getLeagueCode(opp.sport || '').toLowerCase();
      
      return event.includes(searchLower) || 
             prop.includes(searchLower) ||
             league.includes(searchLower);
    });

    // Filter by leagues
    if (selectedLeagues.length > 0) {
      filtered = filtered.filter(opp => 
        selectedLeagues.includes(getLeagueCode(opp.sport || ''))
      );
    }

    // Filter by markets
    if (selectedMarkets.length > 0) {
      filtered = filtered.filter(opp => 
        selectedMarkets.includes(normalizeMarket(opp.market?.type || ''))
      );
    }

    // Sort data
    return filtered.sort((a, b) => {
      let aVal: any, bVal: any;

      switch (sortKey) {
        case 'event':
          aVal = formatEventLabel(a);
          bVal = formatEventLabel(b);
          break;
        case 'league':
          aVal = getLeagueCode(a.sport || '');
          bVal = getLeagueCode(b.sport || '');
          break;
        case 'market':
          aVal = normalizeMarket(a.market?.type || '');
          bVal = normalizeMarket(b.market?.type || '');
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
  }, [opportunities, sortKey, sortDirection, debouncedSearchTerm, selectedLeagues, selectedMarkets]);

  // Get unique leagues and markets for filters
  const availableLeagues = useMemo(() => {
    const leagues = new Set(opportunities?.map(opp => getLeagueCode(opp.sport || '')).filter(Boolean) || []);
    return Array.from(leagues).sort();
  }, [opportunities]);

  // Field Odds sorting and deduplication logic
  const processFieldOdds = (fieldPrices: any[], myBookName?: string) => {
    if (!fieldPrices) return [];
    
    // Filter out My Odds book and deduplicate
    const filtered = fieldPrices.filter(price => price.book !== myBookName);
    
    // Deduplicate by book name (keep freshest)
    const uniqueBooks = new Map();
    filtered.forEach(price => {
      const existing = uniqueBooks.get(price.book);
      if (!existing || new Date(price.updatedAt || 0) > new Date(existing.updatedAt || 0)) {
        uniqueBooks.set(price.book, price);
      }
    });
    
    // Sort by best price (lowest for favorites, highest for underdogs)
    const sortedPrices = Array.from(uniqueBooks.values()).sort((a, b) => {
      // For American odds: higher absolute value = better price for underdogs, lower for favorites
      const aOdds = Math.abs(a.odds || 0);
      const bOdds = Math.abs(b.odds || 0);
      return bOdds - aOdds; // Sort descending (best odds first)
    });
    
    return sortedPrices;
  };

  const availableMarkets = useMemo(() => {
    const markets = new Set(opportunities?.map(opp => normalizeMarket(opp.market?.type || '')).filter(Boolean) || []);
    return Array.from(markets).sort();
  }, [opportunities]);

  // Virtualization setup
  const rowVirtualizer = useVirtualizer({
    count: filteredAndSortedData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56, // Increased row height for Field Odds chips
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

  const SortButton = ({ sortKey: key, children, className: buttonClassName = '', rightAlign = false }: { 
    sortKey: SortKey; 
    children: React.ReactNode; 
    className?: string;
    rightAlign?: boolean;
  }) => (
    <Button
      variant="ghost"
      onClick={() => handleSort(key)}
      className={`h-auto p-1 font-semibold hover:bg-muted/50 focus:ring-2 focus:ring-primary focus:outline-none ${rightAlign ? 'justify-end' : ''} ${buttonClassName}`}
      style={{ fontFamily: "'Rajdhani', sans-serif" }}
      aria-sort={sortKey === key ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
    >
      <span className={`flex items-center gap-1 ${rightAlign ? 'flex-row-reverse' : ''}`}>
        {children}
        {sortKey === key && (
          sortDirection === 'asc' ? 
            <ChevronUp className="h-3 w-3" /> : 
            <ChevronDown className="h-3 w-3" />
        )}
      </span>
    </Button>
  );

  // Loading skeleton
  if (loading) {
    return (
      <div className="w-full space-y-4">
        <div className="flex flex-wrap gap-3 mb-4 p-4 bg-card rounded-lg border">
          <div className="h-10 bg-muted animate-pulse rounded w-64"></div>
          <div className="h-10 bg-muted animate-pulse rounded w-32"></div>
          <div className="h-10 bg-muted animate-pulse rounded w-32"></div>
        </div>
        <div className="border rounded-lg bg-card">
          <div className="p-3 border-b">
            <div className="h-6 bg-muted animate-pulse rounded"></div>
          </div>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="p-3 border-b">
              <div className="grid grid-cols-8 gap-2">
                <div className="col-span-2 h-4 bg-muted animate-pulse rounded"></div>
                <div className="h-4 bg-muted animate-pulse rounded"></div>
                <div className="h-4 bg-muted animate-pulse rounded"></div>
                <div className="h-4 bg-muted animate-pulse rounded"></div>
                <div className="h-4 bg-muted animate-pulse rounded"></div>
                <div className="h-4 bg-muted animate-pulse rounded"></div>
                <div className="h-4 bg-muted animate-pulse rounded"></div>
              </div>
            </div>
          ))}
        </div>
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
                className="pl-9 focus:ring-2 focus:ring-primary"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              />
            </div>
          </div>
          
          {/* League Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 focus:ring-2 focus:ring-primary" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
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
              <Button variant="outline" className="gap-2 focus:ring-2 focus:ring-primary" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
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

          {/* Show selected filters */}
          {(selectedLeagues.length > 0 || selectedMarkets.length > 0) && (
            <div className="flex items-center gap-2">
              {selectedLeagues.map(league => (
                <Badge key={league} variant="secondary" className="text-xs">
                  {league}
                  <button
                    onClick={() => setSelectedLeagues(prev => prev.filter(l => l !== league))}
                    className="ml-1 text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              {selectedMarkets.map(market => (
                <Badge key={market} variant="secondary" className="text-xs">
                  {market}
                  <button
                    onClick={() => setSelectedMarkets(prev => prev.filter(m => m !== market))}
                    className="ml-1 text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Virtualized Table */}
        <div className="border rounded-lg bg-card">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-card border-b">
            <div className="grid gap-4 px-3 py-3 text-sm font-semibold text-muted-foreground items-center" style={{ gridTemplateColumns: '8.6% 8.6% 8.6% 8.6% 8.6% 8.6% 8.6% 40%' }}>
              {/* Event | League | Prop | Market | My Odds | Win Probability | +EV% | Field Odds */}
              <div className="text-left flex items-center h-6">
                <SortButton sortKey="event">Event</SortButton>
              </div>
              <div className="text-left flex items-center h-6">
                <SortButton sortKey="league">League</SortButton>
              </div>
              <div className="text-left flex items-center h-6">Prop</div>
              <div className="text-left flex items-center h-6">
                <SortButton sortKey="market">Market</SortButton>
              </div>
              <div className="text-right flex items-center justify-end h-6">
                <SortButton sortKey="myOdds" rightAlign>My Odds</SortButton>
              </div>
              <div className="text-right flex items-center justify-end h-6">
                <SortButton sortKey="winProbability" rightAlign>Win Probability</SortButton>
              </div>
              <div className="text-right flex items-center justify-end h-6">
                <SortButton sortKey="evPercent" rightAlign>+EV%</SortButton>
              </div>
              <div className="text-left flex items-center h-6">Field Odds</div>
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
              {filteredAndSortedData.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  <div className="text-center">
                    <p style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                      No opportunities match your filters.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => {
                        setSelectedLeagues([]);
                        setSelectedMarkets([]);
                        setSearchTerm('');
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                </div>
              ) : (
                rowVirtualizer.getVirtualItems().map((virtualItem) => {
                  const opportunity = filteredAndSortedData[virtualItem.index];
                  if (!opportunity) return null;

                  const eventLabel = formatEventLabel(opportunity);
                  const propDescription = generatePropDescription(opportunity);
                  const league = getLeagueCode(opportunity.sport || '');
                  const market = normalizeMarket(opportunity.market?.type || '');
                  
                  // Process field odds with sorting and deduplication
                  const myBookName = opportunity.myPrice?.book;
                  const fieldOdds = processFieldOdds(opportunity.fieldPrices || [], myBookName);

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
                        gridTemplateColumns: '8.6% 8.6% 8.6% 8.6% 8.6% 8.6% 8.6% 40%'
                      }}
                      className="grid gap-4 px-3 py-3 text-sm border-b hover:bg-muted/30 cursor-pointer transition-colors"
                      onClick={() => onRowClick?.(opportunity)}
                    >
                      {/* Event */}
                      <div className="font-medium text-foreground text-left" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                        <Tooltip>
                          <TooltipTrigger className="text-left truncate block">
                            {eventLabel}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Tipoff: {opportunity.event?.startTime ? (() => {
                              try {
                                return new Date(opportunity.event.startTime).toISOString();
                              } catch {
                                return opportunity.event.startTime;
                              }
                            })() : 'Time TBD'}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      {/* League */}
                      <div className="text-muted-foreground text-left" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                        <Tooltip>
                          <TooltipTrigger className="text-left truncate block">
                            {league}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{getLeagueFullName(opportunity.sport || '')}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      {/* Prop */}
                      <div className="font-medium text-foreground text-left" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                        <Tooltip>
                          <TooltipTrigger className="text-left truncate block">
                            {propDescription}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{propDescription}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      {/* Market */}
                      <div className="text-muted-foreground text-left" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                        <Tooltip>
                          <TooltipTrigger className="text-left truncate block">
                            {market}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{market}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      {/* My Odds */}
                      <div className="text-right">
                        {opportunity.myPrice && (
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge variant="outline" className="px-3 py-1 text-sm hover:bg-muted focus:ring-2 focus:ring-primary border-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                                {formatOdds(opportunity.myPrice.odds)}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{opportunity.myPrice.book} — {formatOdds(opportunity.myPrice.odds)}</p>
                              <p className="text-xs text-muted-foreground">
                                Updated {getRelativeTime(opportunity.updatedAt)}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>

                      {/* Win Probability */}
                      <div className="text-right font-medium" style={{ fontFamily: "'JetBrains Mono', monospace", fontVariantNumeric: 'tabular-nums' }}>
                        <Tooltip>
                          <TooltipTrigger>
                            {formatWinProbability(opportunity.fairProbability || 0)}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Consensus fair win probability (excludes My Odds)</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      {/* +EV% */}
                      <div 
                        className={`text-right font-bold ${getEVColor(opportunity.evPercent || 0)}`}
                        style={{ fontFamily: "'JetBrains Mono', monospace", fontVariantNumeric: 'tabular-nums' }}
                      >
                        {opportunity.evPercent !== undefined ? `${opportunity.evPercent >= 0 ? '+' : ''}${opportunity.evPercent.toFixed(1)}%` : '—'}
                      </div>

                      {/* Field Odds */}
                      <div className="flex items-center gap-1 overflow-x-auto overflow-y-hidden">
                        {fieldOdds.map((price, index) => (
                          <Tooltip key={index}>
                            <TooltipTrigger>
                              <div className="flex items-center gap-1 px-2 py-1 bg-muted/50 hover:bg-muted rounded text-xs border focus:ring-1 focus:ring-primary whitespace-nowrap flex-shrink-0">
                                <img 
                                  src={getBookLogo(price.book)}
                                  alt={price.book}
                                  className="w-3.5 h-3.5 rounded"
                                />
                                <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                                  {formatOdds(price.odds)}
                                </span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{price.book} — {formatOdds(price.odds)}</p>
                              <p className="text-xs text-muted-foreground">
                                Updated {getRelativeTime(opportunity.updatedAt)}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
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