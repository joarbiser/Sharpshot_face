import React, { useMemo, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useMyBook } from '@/contexts/MyBookContext';
import { useTerminalFilters } from '../terminal/filters/store';
// import { BettingOpportunity } from '../../../shared/schema';

// Temporary type definition
interface BettingOpportunity {
  id: string;
  sport?: string;
  event?: { away?: string; home?: string; startTime?: string };
  market?: { 
    type?: string; 
    side?: string; 
    value?: string | number; 
    line?: string | number; 
    player?: string;
  };
  myPrice?: { book: string; odds: number; updatedAt?: string };
  fieldPrices?: Array<{ book: string; odds: number; updatedAt?: string }>;
  fairProbability?: number;
  evPercent?: number;
  updatedAt: string;
}

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
      if (spreadValue !== undefined) {
        const numericValue = typeof spreadValue === 'string' ? parseFloat(spreadValue) : spreadValue;
        const formattedSpread = numericValue > 0 ? `+${spreadValue}` : `${spreadValue}`.replace('-', '−');
        return `${spreadTeam || 'Team'} ${formattedSpread}`;
      }
      return `${spreadTeam || 'Team'} Spread`;
      
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

// Sportsbook Registry - Dynamic book configuration
interface Sportsbook {
  id: string;
  name: string;
  displayName: string;
  logoUrl: string;
}

const SPORTSBOOK_REGISTRY: Sportsbook[] = [
  { id: 'draftkings', name: 'DraftKings', displayName: 'DK', logoUrl: 'data:image/svg+xml;base64,' + btoa('<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="#53D337" rx="3"/><text x="10" y="13" text-anchor="middle" fill="white" font-family="Arial" font-size="10" font-weight="bold">DK</text></svg>') },
  { id: 'fanduel', name: 'FanDuel', displayName: 'FD', logoUrl: 'data:image/svg+xml;base64,' + btoa('<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="#1E3A8A" rx="3"/><text x="10" y="13" text-anchor="middle" fill="white" font-family="Arial" font-size="10" font-weight="bold">FD</text></svg>') },
  { id: 'bet365', name: 'Bet365', displayName: 'B365', logoUrl: 'data:image/svg+xml;base64,' + btoa('<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="#FFCC02" rx="3"/><text x="10" y="13" text-anchor="middle" fill="black" font-family="Arial" font-size="8" font-weight="bold">365</text></svg>') },
  { id: 'caesars', name: 'Caesars', displayName: 'CZR', logoUrl: 'data:image/svg+xml;base64,' + btoa('<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="#C5A632" rx="3"/><text x="10" y="13" text-anchor="middle" fill="white" font-family="Arial" font-size="9" font-weight="bold">CZR</text></svg>') },
  { id: 'mgm', name: 'BetMGM', displayName: 'MGM', logoUrl: 'data:image/svg+xml;base64,' + btoa('<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="#BC9A3A" rx="3"/><text x="10" y="13" text-anchor="middle" fill="white" font-family="Arial" font-size="9" font-weight="bold">MGM</text></svg>') },
  { id: 'pointsbet', name: 'PointsBet', displayName: 'PB', logoUrl: 'data:image/svg+xml;base64,' + btoa('<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="#FF6B00" rx="3"/><text x="10" y="13" text-anchor="middle" fill="white" font-family="Arial" font-size="10" font-weight="bold">PB</text></svg>') },
  { id: 'wynn', name: 'WynnBet', displayName: 'WB', logoUrl: 'data:image/svg+xml;base64,' + btoa('<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="#8B0000" rx="3"/><text x="10" y="13" text-anchor="middle" fill="white" font-family="Arial" font-size="10" font-weight="bold">WB</text></svg>') },
  { id: 'barstool', name: 'Barstool', displayName: 'BS', logoUrl: 'data:image/svg+xml;base64,' + btoa('<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="#FF1493" rx="3"/><text x="10" y="13" text-anchor="middle" fill="white" font-family="Arial" font-size="10" font-weight="bold">BS</text></svg>') },
];

// Get book from registry or create fallback
const getBookInfo = (bookName: string): Sportsbook => {
  const normalized = bookName?.toLowerCase().replace(/\s+/g, '');
  const found = SPORTSBOOK_REGISTRY.find(book => 
    book.id === normalized || 
    book.name.toLowerCase().replace(/\s+/g, '') === normalized
  );
  
  if (found) return found;
  
  // Log warning for missing book (not in registry)
  console.warn(`Sportsbook "${bookName}" not found in registry. Adding as fallback.`);
  
  // Create fallback book
  const firstLetter = bookName?.charAt(0)?.toUpperCase() || '?';
  return {
    id: normalized || 'unknown',
    name: bookName || 'Unknown',
    displayName: firstLetter,
    logoUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="20" fill="#64748B" rx="3"/>
        <text x="10" y="13" text-anchor="middle" fill="white" font-family="Arial" font-size="10" font-weight="bold">${firstLetter}</text>
      </svg>
    `)}`
  };
};

// Get book logo
const getBookLogo = (bookName: string): string => {
  return getBookInfo(bookName).logoUrl;
};

// Debounced search hook

export function NewTerminalTable({ 
  opportunities, 
  loading, 
  error, 
  onRowClick,
  className = ''
}: NewTerminalTableProps) {
  const [sortKey, setSortKey] = React.useState<SortKey>('evPercent');
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('desc');
  const { selectedBookId } = useMyBook();
  const { leagues, markets, propTypes, ouMode, timing, oddsMin, oddsMax, evThreshold, minSamples, query } = useTerminalFilters();


  const parentRef = useRef<HTMLDivElement>(null);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    if (!opportunities) return [];

    let filtered = opportunities.filter(opp => {
      // Search filter
      if (query.trim()) {
        const searchText = query.toLowerCase();
        const event = formatEventLabel(opp).toLowerCase();
        const prop = generatePropDescription(opp).toLowerCase();
        const league = getLeagueCode(opp.sport || '').toLowerCase();
        
        if (!(event.includes(searchText) ||
              prop.includes(searchText) ||
              league.includes(searchText))) {
          return false;
        }
      }

      // League filter
      if (leagues.length > 0) {
        if (!leagues.includes(getLeagueCode(opp.sport || ''))) {
          return false;
        }
      }

      // Market filter
      if (markets.length > 0) {
        if (!markets.includes(normalizeMarket(opp.market?.type || ''))) {
          return false;
        }
      }

      // Prop type filter
      if (propTypes.length > 0) {
        const propType = normalizeMarket(opp.market?.type || '');
        if (!propTypes.includes(propType)) {
          return false;
        }
      }

      // O/U mode filter
      if (ouMode !== 'all') {
        const side = opp.market?.side?.toLowerCase();
        if (ouMode === 'over' && side !== 'over') return false;
        if (ouMode === 'under' && side !== 'under') return false;
      }

      // Odds range filter (using myPrice odds)
      const myOdds = opp.myPrice?.odds;
      if (myOdds !== undefined && myOdds !== null) {
        if (myOdds < oddsMin || myOdds > oddsMax) {
          return false;
        }
      }

      // EV threshold filter
      if (evThreshold > 0 && (opp.evPercent || 0) < evThreshold) {
        return false;
      }

      // Min samples filter (using fieldPrices count as proxy)
      if (minSamples > 0 && (opp.fieldPrices?.length || 0) < minSamples) {
        return false;
      }

      return true;
    });

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
  }, [opportunities, sortKey, sortDirection, query, leagues, markets, propTypes, ouMode, timing, oddsMin, oddsMax, evThreshold, minSamples]);


  // Create dynamic book columns from registry + data
  const { dynamicBooks, fieldBooks } = useMemo(() => {
    const registryBooks = [...SPORTSBOOK_REGISTRY];
    const dataBooks = new Set<string>();
    
    // Collect all book names from data
    opportunities?.forEach(opp => {
      opp.fieldPrices?.forEach(price => {
        if (price.book) dataBooks.add(price.book);
      });
      if (opp.myPrice?.book) dataBooks.add(opp.myPrice.book);
    });
    
    // Add books from data that aren't in registry (sorted by name)
    const missingBooks = Array.from(dataBooks)
      .filter(bookName => !registryBooks.some(book => 
        book.name.toLowerCase().replace(/\s+/g, '') === bookName.toLowerCase().replace(/\s+/g, '')
      ))
      .sort()
      .map(bookName => getBookInfo(bookName));
    
    const allBooks = [...registryBooks, ...missingBooks];
    
    // Filter out selected book from field columns
    const selectedBook = selectedBookId ? allBooks.find(book => book.id === selectedBookId) : null;
    const fieldBooks = selectedBook ? 
      allBooks.filter(book => book.id !== selectedBook.id) : 
      allBooks;
    
    return { dynamicBooks: allBooks, fieldBooks };
  }, [opportunities, selectedBookId]);
  
  // Get price for specific book in opportunity
  const getBookPrice = (opportunity: BettingOpportunity, bookName: string) => {
    // Check field prices first
    const fieldPrice = opportunity.fieldPrices?.find((price: any) => price.book === bookName);
    if (fieldPrice) return fieldPrice;
    
    // Check if it's the My Odds book
    if (opportunity.myPrice?.book === bookName) {
      return opportunity.myPrice;
    }
    
    return null;
  };
  
  // Get My Odds price from selected book
  const getMyOddsPrice = (opportunity: BettingOpportunity) => {
    if (!selectedBookId) return null;
    
    const selectedBook = dynamicBooks.find(book => book.id === selectedBookId);
    if (!selectedBook) return null;
    
    return getBookPrice(opportunity, selectedBook.name);
  };


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

        {/* Virtualized Table */}
        <div className="border rounded-lg bg-card overflow-x-auto">
          <div className="min-w-max">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-card border-b">
              <div className="flex">
                {/* Fixed Left Columns */}
                <div className="flex bg-card border-r" style={{ width: '900px' }}>
                <div className="w-32 px-3 py-3 text-sm font-semibold text-muted-foreground flex items-center">
                  <SortButton sortKey="event">Event</SortButton>
                </div>
                <div className="w-16 px-3 py-3 text-sm font-semibold text-muted-foreground flex items-center">
                  <SortButton sortKey="league">League</SortButton>
                </div>
                <div className="w-32 px-3 py-3 text-sm font-semibold text-muted-foreground flex items-center">Prop</div>
                <div className="w-24 px-3 py-3 text-sm font-semibold text-muted-foreground flex items-center">
                  <SortButton sortKey="market">Market</SortButton>
                </div>
                <div className="w-20 px-3 py-3 text-sm font-semibold text-muted-foreground flex items-center justify-end">
                  <SortButton sortKey="myOdds" rightAlign>My Odds</SortButton>
                </div>
                <div className="w-24 px-3 py-3 text-sm font-semibold text-muted-foreground flex items-center justify-end">
                  <SortButton sortKey="winProbability" rightAlign>Win Probability</SortButton>
                </div>
                <div className="w-16 px-3 py-3 text-sm font-semibold text-muted-foreground flex items-center justify-end">
                  <SortButton sortKey="evPercent" rightAlign>+EV%</SortButton>
                </div>
                <div className="w-20 px-3 py-3 text-sm font-semibold text-muted-foreground flex items-center justify-end">
                  <Tooltip>
                    <TooltipTrigger>Field Avg</TooltipTrigger>
                    <TooltipContent>
                      <p>Average of all field books (pending backend)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                </div>
                
                {/* Field Book Columns (excludes selected My Book) */}
                <div className="flex">
                {fieldBooks.map((book, index) => (
                  <div key={`header-${book.id}-${index}`} className="w-20 px-2 py-3 text-sm font-semibold text-muted-foreground flex items-center justify-center border-r">
                    <Tooltip>
                      <TooltipTrigger>
                        <img 
                          src={book.logoUrl}
                          alt={book.name}
                          className="w-5 h-5 rounded"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{book.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                ))}
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

                  return (
                    <div
                      key={virtualItem.key}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: `${virtualItem.size}px`,
                        transform: `translateY(${virtualItem.start}px)`
                      }}
                      className="border-b hover:bg-muted/30 cursor-pointer transition-colors"
                      onClick={() => onRowClick?.(opportunity)}
                    >
                      <div className="flex">
                        {/* Fixed Left Columns */}
                        <div className="flex bg-card border-r" style={{ width: '900px' }}>
                            {/* Event */}
                            <div className="w-32 px-3 py-3 text-sm font-medium text-foreground truncate" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                              <Tooltip>
                                <TooltipTrigger className="truncate block">
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
                            <div className="w-16 px-3 py-3 text-sm text-muted-foreground truncate" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                              <Tooltip>
                                <TooltipTrigger className="truncate block">
                                  {league}
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{getLeagueFullName(opportunity.sport || '')}</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>

                            {/* Prop */}
                            <div className="w-32 px-3 py-3 text-sm font-medium text-foreground truncate" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                              <Tooltip>
                                <TooltipTrigger className="truncate block">
                                  {propDescription}
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{propDescription}</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>

                            {/* Market */}
                            <div className="w-24 px-3 py-3 text-sm text-muted-foreground truncate" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                              <Tooltip>
                                <TooltipTrigger className="truncate block">
                                  {market}
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{market}</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>

                            {/* My Odds */}
                            <div className="w-20 px-3 py-3 text-sm flex items-center justify-end">
                              {(() => {
                                const myOddsPrice = getMyOddsPrice(opportunity);
                                const selectedBook = selectedBookId ? dynamicBooks.find(book => book.id === selectedBookId) : null;
                                
                                if (!selectedBookId) {
                                  return (
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // No longer needed - filtering handled by FilterBar
                                      }}
                                      className="text-[#D8AC35] hover:text-[#D8AC35]/80 text-xs underline-offset-2 hover:underline transition-colors" 
                                      style={{ fontFamily: "'Rajdhani', sans-serif" }}
                                    >
                                      Set My Book
                                    </button>
                                  );
                                }
                                
                                if (myOddsPrice) {
                                  return (
                                    <div className="flex items-center justify-end gap-1">
                                      <Tooltip>
                                        <TooltipTrigger>
                                          <Badge variant="outline" className="px-2 py-1 text-xs hover:bg-muted focus:ring-2 focus:ring-primary" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                                            {formatOdds(myOddsPrice.odds)}
                                          </Badge>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>{selectedBook?.name} — {formatOdds(myOddsPrice.odds)}</p>
                                          <p className="text-xs text-muted-foreground">
                                            Updated {getRelativeTime(myOddsPrice.updatedAt || opportunity.updatedAt)}
                                          </p>
                                        </TooltipContent>
                                      </Tooltip>
                                      {selectedBook && (
                                        <img 
                                          src={selectedBook.logoUrl}
                                          alt={selectedBook.displayName}
                                          className="w-3 h-3 rounded opacity-80"
                                        />
                                      )}
                                    </div>
                                  );
                                }
                                
                                return (
                                  <span className="text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>—</span>
                                );
                              })()}
                            </div>

                            {/* Win Probability */}
                            <div className="w-24 px-3 py-3 text-sm font-medium text-right" style={{ fontFamily: "'JetBrains Mono', monospace", fontVariantNumeric: 'tabular-nums' }}>
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
                              className={`w-16 px-3 py-3 text-sm text-right font-bold ${getEVColor(opportunity.evPercent || 0)}`}
                              style={{ fontFamily: "'JetBrains Mono', monospace", fontVariantNumeric: 'tabular-nums' }}
                            >
                              {opportunity.evPercent !== undefined ? `${opportunity.evPercent >= 0 ? '+' : ''}${opportunity.evPercent.toFixed(1)}%` : '—'}
                            </div>

                            {/* Field Avg */}
                            <div className="w-20 px-3 py-3 text-sm flex items-center justify-end">
                              <Tooltip>
                                <TooltipTrigger>
                                  <span className="text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>—</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Pending backend</p>
                                  <p className="text-xs text-muted-foreground">Field average calculation</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </div>
                          
                          {/* Field Book Columns (excludes selected My Book) */}
                          <div className="flex">
                            {fieldBooks.map((book, index) => {
                              const bookPrice = getBookPrice(opportunity, book.name);
                              
                              return (
                                <div key={`${opportunity.id}-${book.id}-${index}`} className="w-20 px-2 py-3 text-sm flex items-center justify-center border-r">
                                  {bookPrice ? (
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Badge variant="outline" className="px-2 py-1 text-xs hover:bg-muted focus:ring-1 focus:ring-primary" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                                          {formatOdds(bookPrice.odds)}
                                        </Badge>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>{book.name} — {formatOdds(bookPrice.odds)}</p>
                                        <p className="text-xs text-muted-foreground">
                                          Updated {getRelativeTime(bookPrice.updatedAt || opportunity.updatedAt)}
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  ) : (
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <span className="text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>—</span>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>No quote</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                    </div>
                  );
                })
              )}
            </div>
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