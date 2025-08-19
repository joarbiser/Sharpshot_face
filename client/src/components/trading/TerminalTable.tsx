import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { ChevronDown, ChevronUp, Copy, Star, ExternalLink, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { BettingOpportunity } from './OpportunityTable';

interface TerminalTableProps {
  opportunities: BettingOpportunity[];
  loading?: boolean;
  error?: string;
  onRowClick?: (opportunity: BettingOpportunity) => void;
  className?: string;
  density?: 'comfortable' | 'compact';
}

type SortKey = 'event' | 'market' | 'fairOdds' | 'evPercent' | 'myPrice' | 'updatedAt' | 'fairProbability';
type SortDirection = 'asc' | 'desc';

// EV color helper function - traffic light system
const getEVColor = (ev: number) => {
  if (ev <= -2) return 'text-red-500';
  if (ev < 0) return 'text-orange-500';
  if (ev === 0) return 'text-yellow-500';
  if (ev <= 3) return 'text-lime-500';
  return 'text-green-500';
};

// Format American odds
const formatAmericanOdds = (odds: number): string => {
  if (odds >= 100) return `+${odds}`;
  if (odds <= -100) return `${odds}`;
  return odds > 0 ? `+${Math.round(odds)}` : `${Math.round(odds)}`;
};

// Format percentage with one decimal
const formatPercent = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`;
};

// Format signed percentage for EV
const formatEVPercent = (value: number): string => {
  const formatted = (value).toFixed(1);
  return value > 0 ? `+${formatted}%` : `${formatted}%`;
};

// Format relative time for status
const formatRelativeTime = (timestamp: string): string => {
  try {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    
    if (diffSec < 5) return '<5s ago';
    if (diffSec < 60) return `${diffSec}s ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    return `${diffHr}h ago`;
  } catch {
    return '—';
  }
};

// Format start time
const formatStartTime = (startTime: string): string => {
  try {
    const date = new Date(startTime);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '—';
  }
};

// Book name abbreviations
const getBookAbbr = (bookName: string): string => {
  const abbrs: Record<string, string> = {
    'FanDuel': 'FD',
    'DraftKings': 'DK', 
    'BetMGM': 'MGM',
    'Caesars': 'CZR',
    'BetRivers': 'BR',
    'ESPN BET': 'ESPN',
    'Bet365': '365',
    'William Hill': 'WH',
    'Consensus': 'CON'
  };
  return abbrs[bookName] || bookName.slice(0, 3).toUpperCase();
};

export function TerminalTable({ 
  opportunities, 
  loading, 
  error, 
  onRowClick,
  className = '',
  density = 'compact'
}: TerminalTableProps) {

  const [sortKey, setSortKey] = useState<SortKey>('evPercent');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const sortedOpportunities = useMemo(() => {
    if (!opportunities) return [];

    return [...opportunities].sort((a, b) => {
      let aVal: any, bVal: any;

      switch (sortKey) {
        case 'event':
          aVal = `${a.event.away} vs ${a.event.home}`;
          bVal = `${b.event.away} vs ${b.event.home}`;
          break;
        case 'market':
          aVal = `${a.market.type} ${a.market.side}`;
          bVal = `${b.market.type} ${b.market.side}`;
          break;
        case 'fairOdds':
          aVal = a.fairOdds;
          bVal = b.fairOdds;
          break;
        case 'evPercent':
          aVal = a.evPercent;
          bVal = b.evPercent;
          break;
        case 'myPrice':
          aVal = a.myPrice.odds;
          bVal = b.myPrice.odds;
          break;
        case 'fairProbability':
          aVal = a.fairProbability;
          bVal = b.fairProbability;
          break;
        case 'updatedAt':
          aVal = new Date(a.updatedAt).getTime();
          bVal = new Date(b.updatedAt).getTime();
          break;
        default:
          return 0;
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [opportunities, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const handleRowClick = (opportunity: BettingOpportunity) => {
    if (expandedRow === opportunity.id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(opportunity.id);
    }
    onRowClick?.(opportunity);
  };

  const SortHeader = ({ sortKey: key, children, className: headerClassName = '', align = 'left' }: { 
    sortKey: SortKey; 
    children: React.ReactNode; 
    className?: string;
    align?: 'left' | 'right' | 'center';
  }) => (
    <th 
      className={`px-2 py-1 text-xs font-mono text-zinc-400 uppercase tracking-widest cursor-pointer hover:text-white transition-colors border-r border-zinc-800 last:border-r-0 ${align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'} ${headerClassName}`}
      onClick={() => handleSort(key)}
    >
      <div className={`flex items-center gap-1 ${align === 'right' ? 'justify-end' : align === 'center' ? 'justify-center' : ''}`}>
        {children}
        {sortKey === key && (
          sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
        )}
      </div>
    </th>
  );

  const formatPropInfo = (opportunity: BettingOpportunity): string => {
    const { market } = opportunity;
    
    if (market.type === 'total' && market.line !== undefined) {
      const sideText = market.side === 'over' ? 'Over' : 'Under';
      return `${sideText} ${market.line}`;
    }
    
    if (market.type === 'spread' && market.line !== undefined) {
      const team = market.side === 'home' ? opportunity.event.home : opportunity.event.away;
      const sign = market.line >= 0 ? '+' : '';
      return `${team} ${sign}${market.line}`;
    }
    
    if (market.type === 'moneyline') {
      const team = market.side === 'home' ? opportunity.event.home : opportunity.event.away;
      return team;
    }
    
    if (market.type === 'player_prop' && market.player) {
      if (market.line !== undefined) {
        const sideText = market.side === 'over' ? 'Over' : market.side === 'under' ? 'Under' : market.side;
        return `${market.player} ${sideText} ${market.line}`;
      }
      return `${market.player} ${market.side || 'Prop'}`;
    }
    
    if (market.line !== undefined) {
      const sideText = market.side === 'over' ? 'Over' : market.side === 'under' ? 'Under' : market.side;
      return `${sideText} ${market.line}`;
    }
    
    return market.side || market.type || 'Prop';
  };

  // Loading state
  if (loading) {
    return (
      <div className={`bg-zinc-900 rounded-lg border border-zinc-800 p-8 ${className}`}>
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-zinc-800/50 h-8 rounded" />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`bg-zinc-900 rounded-lg border border-zinc-800 p-8 text-center ${className}`}>
        <div className="text-zinc-400 mb-2">Data temporarily unavailable</div>
        <div className="text-xs text-zinc-500">Please retry shortly</div>
      </div>
    );
  }

  // Empty state
  if (!opportunities || opportunities.length === 0) {
    return (
      <div className={`bg-zinc-900 rounded-lg border border-zinc-800 p-8 text-center ${className}`}>
        <div className="text-zinc-400">No opportunities match your filters</div>
      </div>
    );
  }

  const rowHeight = density === 'compact' ? 'h-8' : 'h-10';

  return (
    <TooltipProvider>
      <div className={`bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden ${className}`}>
        <div className="overflow-auto">
          <table className="w-full text-xs">
            <thead className="bg-zinc-950 border-b border-zinc-800">
              <tr>
                <th className="px-2 py-1 text-xs font-mono text-zinc-400 uppercase tracking-widest border-r border-zinc-800 w-16 text-center">Cat</th>
                <SortHeader sortKey="event" align="center" className="min-w-[180px] text-center">Event</SortHeader>
                <th className="px-2 py-1 text-xs font-mono text-zinc-400 uppercase tracking-widest border-r border-zinc-800 min-w-[120px] text-center">Prop</th>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SortHeader sortKey="fairProbability" align="center" className="min-w-[60px] text-center">Hit %</SortHeader>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Probability of this bet winning after removing vig</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SortHeader sortKey="evPercent" align="center" className="min-w-[70px] text-center">+EV %</SortHeader>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Expected value for your selected book(s) vs fair odds.<br/>Red = negative, Yellow = neutral, Green = positive.</p>
                  </TooltipContent>
                </Tooltip>
                <SortHeader sortKey="myPrice" align="center" className="min-w-[90px] text-center">My Odds</SortHeader>
                <SortHeader sortKey="fairOdds" align="center" className="min-w-[80px] text-center">Fair Odds</SortHeader>
                <th className="px-2 py-1 text-xs font-mono text-zinc-400 uppercase tracking-widest border-r border-zinc-800 min-w-[240px] text-center">Field Odds</th>
                <SortHeader sortKey="updatedAt" align="center" className="min-w-[80px] text-center">Status</SortHeader>
              </tr>
            </thead>
            <tbody>
              {sortedOpportunities.map((opportunity, index) => (
                <React.Fragment key={opportunity.id}>
                  <tr 
                    className={`${rowHeight} border-b border-zinc-800 hover:bg-zinc-800/50 cursor-pointer transition-all duration-150 hover:border-l-2 hover:border-l-yellow-500 group`}
                    onClick={() => handleRowClick(opportunity)}
                  >
                    {/* Category */}
                    <td className="px-2 py-1 border-r border-zinc-800 text-center">
                      <div className="mx-auto w-fit px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs font-mono">
                        +EV
                      </div>
                    </td>
                    
                    {/* Event */}
                    <td className="px-2 py-1 border-r border-zinc-800 text-center">
                      <div className="flex flex-col items-center">
                        <div className="text-white font-medium truncate">
                          {opportunity.event.away} vs {opportunity.event.home}
                        </div>
                        <div className="flex gap-2 text-xs">
                          <span className="text-zinc-400 uppercase">{opportunity.event.league}</span>
                          <span className="text-zinc-500">{opportunity.event.status === 'live' ? 'LIVE' : 'PRE'}</span>
                          <span className="text-zinc-500">{formatStartTime(opportunity.event.startTime)}</span>
                        </div>
                      </div>
                    </td>
                    
                    {/* Prop */}
                    <td className="px-2 py-1 border-r border-zinc-800 text-center">
                      <div className="text-white font-medium">
                        {formatPropInfo(opportunity)}
                      </div>
                    </td>
                    
                    {/* Hit % */}
                    <td className="px-2 py-1 border-r border-zinc-800 text-center">
                      <span className="font-mono text-white">
                        {formatPercent(opportunity.fairProbability)}
                      </span>
                    </td>
                    
                    {/* +EV % */}
                    <td className="px-2 py-1 border-r border-zinc-800 text-center">
                      <span className={`font-mono font-medium ${getEVColor(opportunity.evPercent)}`}>
                        {formatEVPercent(opportunity.evPercent)}
                      </span>
                    </td>
                    
                    {/* My Odds */}
                    <td className="px-2 py-1 border-r border-zinc-800 text-center">
                      <div 
                        className="mx-auto w-fit inline-flex items-center gap-1 px-2 py-0.5 bg-zinc-800 border border-yellow-500/50 rounded text-xs cursor-pointer hover:bg-zinc-700 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (opportunity.myPrice.url) {
                            window.open(opportunity.myPrice.url, '_blank');
                          }
                        }}
                      >
                        <span className="text-zinc-300">{getBookAbbr(opportunity.myPrice.book)}</span>
                        <span className="text-white font-mono">{formatAmericanOdds(opportunity.myPrice.odds)}</span>
                      </div>
                    </td>
                    
                    {/* Fair Odds */}
                    <td className="px-2 py-1 border-r border-zinc-800 text-center">
                      <div className="text-center">
                        <div className="font-mono text-white">{formatAmericanOdds(opportunity.fairOdds)}</div>
                        <div className="text-xs text-zinc-500">Fair = no-vig</div>
                      </div>
                    </td>
                    
                    {/* Field Odds */}
                    <td className="px-2 py-1 border-r border-zinc-800 text-center">
                      <div className="flex gap-1 flex-wrap justify-center">
                        {opportunity.fieldPrices.slice(0, 6).map((price, idx) => (
                          <div
                            key={idx}
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-zinc-800/80 rounded text-xs hover:bg-zinc-700 transition-colors cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (price.url) {
                                window.open(price.url, '_blank');
                              }
                            }}
                          >
                            <span className="text-zinc-400">{getBookAbbr(price.book)}</span>
                            <span className="text-white font-mono">{formatAmericanOdds(price.odds)}</span>
                          </div>
                        ))}
                        {opportunity.fieldPrices.length > 6 && (
                          <div className="inline-flex items-center px-2 py-0.5 bg-zinc-700/80 rounded text-xs text-zinc-400">
                            +{opportunity.fieldPrices.length - 6}
                          </div>
                        )}
                      </div>
                    </td>
                    
                    {/* Status */}
                    <td className="px-2 py-1 text-center">
                      <div className="text-center">
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-zinc-800/50 rounded text-xs">
                          <span className={opportunity.event.status === 'live' ? 'text-red-400' : 'text-green-400'}>
                            {opportunity.event.status === 'live' ? 'LIVE' : 'PRE'}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-500 font-mono mt-0.5">
                          {formatRelativeTime(opportunity.updatedAt)}
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Expanded Row */}
                  {expandedRow === opportunity.id && (
                    <tr className="bg-zinc-800/30">
                      <td colSpan={9} className="px-4 py-3 border-b border-zinc-800">
                        <div className="text-xs text-zinc-400">
                          <div className="mb-2 font-medium text-white">Full Price Ladder</div>
                          <div className="grid grid-cols-4 gap-2">
                            {[opportunity.myPrice, ...opportunity.fieldPrices].map((price, idx) => (
                              <div key={idx} className="flex justify-between p-2 bg-zinc-900 rounded">
                                <span>{price.book}</span>
                                <span className="font-mono">{formatAmericanOdds(price.odds)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </TooltipProvider>
  );
}