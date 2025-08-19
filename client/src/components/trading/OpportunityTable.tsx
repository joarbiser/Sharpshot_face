import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronDown, ChevronUp, Copy, Star, ExternalLink, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { OpportunityRow } from './OpportunityRow';

export interface BettingOpportunity {
  id: string;
  event: {
    home: string;
    away: string;
    league: string;
    startTime: string;
    status: 'live' | 'prematch';
  };
  market: {
    type: 'moneyline' | 'spread' | 'total' | 'player_prop';
    side: string;
    line?: number;
    player?: string;
  };
  fairOdds: number;
  fairProbability: number;
  evPercent: number;
  myPrice: {
    odds: number;
    book: string;
    url?: string;
  };
  fieldPrices: Array<{
    book: string;
    odds: number;
    line?: number;
    url?: string;
  }>;
  consensus?: {
    count: number;
    avgOdds: number;
  };
  updatedAt: string;
  category: 'ev' | 'arbitrage' | 'middling';
  // Expanded details
  kellyStake?: number;
  history?: Array<{ timestamp: string; odds: number }>;
  fullLadder?: Array<{ book: string; odds: number; line?: number }>;
}

interface OpportunityTableProps {
  opportunities: BettingOpportunity[];
  loading?: boolean;
  error?: string;
  onRowClick?: (opportunity: BettingOpportunity) => void;
  className?: string;
}

type SortKey = 'event' | 'market' | 'fairOdds' | 'evPercent' | 'myPrice' | 'updatedAt';
type SortDirection = 'asc' | 'desc';

export function OpportunityTable({ 
  opportunities, 
  loading, 
  error, 
  onRowClick,
  className = ''
}: OpportunityTableProps) {

  const [sortKey, setSortKey] = useState<SortKey>('evPercent');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sortedOpportunities = useMemo(() => {
    if (!opportunities) return [];

    return [...opportunities].sort((a, b) => {
      let aVal: any, bVal: any;

      switch (sortKey) {
        case 'event':
          aVal = `${a.event.home} vs ${a.event.away}`;
          bVal = `${b.event.home} vs ${b.event.away}`;
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



  const SortHeader = ({ sortKey: key, children, className: headerClassName = '' }: { 
    sortKey: SortKey; 
    children: React.ReactNode; 
    className?: string;
  }) => (
    <th 
      className={`px-4 py-2 text-left text-xs font-mono text-muted-foreground uppercase tracking-widest cursor-pointer hover:text-foreground transition-colors duration-200 ${headerClassName}`}
      onClick={() => handleSort(key)}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortKey === key && (
          sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
        )}
      </div>
    </th>
  );

  // Loading state
  if (loading) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-muted/50 h-16 rounded-md" />
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-muted-foreground mb-2">Data temporarily unavailable</div>
        <div className="text-sm text-muted-foreground">Please retry shortly</div>
      </div>
    );
  }

  // Empty state
  if (!opportunities || opportunities.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-muted-foreground">No opportunities match your filters</div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg border border-border/50 overflow-hidden h-full flex flex-col ${className}`}>
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-background/95 backdrop-blur-sm border-b border-border/50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-mono text-muted-foreground uppercase tracking-widest min-w-[80px]">Category</th>
              <SortHeader sortKey="event" className="min-w-[200px]">Event</SortHeader>
              <th className="px-4 py-2 text-left text-xs font-mono text-muted-foreground uppercase tracking-widest min-w-[80px]">League</th>
              <th className="px-4 py-2 text-left text-xs font-mono text-muted-foreground uppercase tracking-widest min-w-[120px]">Prop</th>
              <SortHeader sortKey="market" className="min-w-[100px]">Market</SortHeader>
              <th className="px-4 py-2 text-right text-xs font-mono text-muted-foreground uppercase tracking-widest min-w-[70px] cursor-help"
                  title="Probability of this bet winning after removing vig">
                Hit %
              </th>
              <SortHeader sortKey="evPercent" className="min-w-[80px] text-right">+EV %</SortHeader>
              <SortHeader sortKey="myPrice" className="min-w-[100px]">My Odds</SortHeader>
              <SortHeader sortKey="fairOdds" className="min-w-[90px] text-right">Fair Odds</SortHeader>
              <th className="px-4 py-2 text-left text-xs font-mono text-muted-foreground uppercase tracking-widest w-2/5">
                Field Odds
              </th>
              <SortHeader sortKey="updatedAt" className="min-w-[90px] text-right">Status</SortHeader>
            </tr>
          </thead>
          <tbody className="bg-background">
            {sortedOpportunities.map((opportunity, index) => (
              <OpportunityRow
                key={opportunity.id}
                opportunity={opportunity}
                onClick={() => onRowClick?.(opportunity)}
                isEven={index % 2 === 0}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}