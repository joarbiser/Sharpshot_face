import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronDown, ChevronRight, Copy, Star, ExternalLink, Clock, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { BettingOpportunity } from './OpportunityTable';
import { RowExpansion } from './RowExpansion';

interface OpportunityRowProps {
  opportunity: BettingOpportunity;
  onClick?: () => void;
}

export function OpportunityRow({ opportunity, onClick }: OpportunityRowProps) {
  const formatOdds = (odds: number) => {
    return odds > 0 ? `+${odds}` : `${odds}`;
  };

  const getEVColor = (ev: number) => {
    // Smooth gradient color system for EV%
    if (ev <= -2) {
      // Solid red for -2% or worse
      return 'text-red-600 dark:text-red-400';
    } else if (ev < 0) {
      // Gradient from red to orange (-2% to 0%)
      const intensity = Math.abs(ev) / 2; // 0 to 1 scale
      return intensity > 0.5 
        ? 'text-red-500 dark:text-red-400'
        : 'text-orange-500 dark:text-orange-400';
    } else if (ev === 0) {
      // Exactly yellow at 0%
      return 'text-yellow-600 dark:text-yellow-400';
    } else if (ev < 3) {
      // Gradient from yellow to light green (0% to +3%)
      const intensity = ev / 3; // 0 to 1 scale
      return intensity < 0.5 
        ? 'text-yellow-500 dark:text-yellow-400'
        : 'text-green-500 dark:text-green-400';
    } else {
      // Solid green for +3% or better
      return 'text-green-600 dark:text-green-400';
    }
  };

  const handleCopyOdds = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(formatOdds(opportunity.myPrice.odds));
  };

  const handleToggleWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement watchlist functionality
  };

  const handleExternalLink = (e: React.MouseEvent, url?: string) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <tr 
        className="hover:bg-muted/30 cursor-pointer transition-colors duration-150"
        onClick={onClick}
      >
        {/* Category Badge */}
        <td className="px-3 py-4">
          <Badge 
            variant="secondary"
            className={`text-xs font-medium ${
              opportunity.category === 'ev' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
              opportunity.category === 'arbitrage' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
              opportunity.category === 'middling' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
              'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
            }`}
          >
            {opportunity.category === 'ev' ? '+EV' : 
             opportunity.category === 'arbitrage' ? 'Arb' : 
             opportunity.category === 'middling' ? 'Middle' : 
             opportunity.category.toUpperCase()}
          </Badge>
        </td>

        {/* Event */}
        <td className="px-3 py-4">
          <div className="space-y-2">
            <div className="font-medium text-foreground">
              {opportunity.event.home} vs {opportunity.event.away}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs px-2 py-0.5 font-medium">
                {opportunity.event.league.toUpperCase()}
              </Badge>
              <Badge 
                variant={opportunity.event.status === 'live' ? 'destructive' : 'secondary'}
                className="text-xs px-2 py-0.5 font-medium"
              >
                {opportunity.event.status === 'live' ? 'LIVE' : 'PRE'}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {(() => {
                  try {
                    const date = new Date(opportunity.event.startTime);
                    if (isNaN(date.getTime())) {
                      return '—';
                    }
                    return date.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    });
                  } catch {
                    return '—';
                  }
                })()}
              </span>
            </div>
          </div>
        </td>

        {/* Market */}
        <td className="px-3 py-4">
          <div className="space-y-1">
            <div className="font-medium text-foreground">
              {opportunity.market.type === 'moneyline' ? 'Moneyline' :
               opportunity.market.type === 'spread' ? 'Spread' :
               opportunity.market.type === 'total' ? 'Total' :
               opportunity.market.type === 'player_prop' ? 'Player Prop' :
               opportunity.market.type.charAt(0).toUpperCase() + opportunity.market.type.slice(1)}
            </div>
            <div className="text-sm text-muted-foreground">
              {opportunity.market.side}
              {opportunity.market.line && ` ${opportunity.market.line > 0 ? '+' : ''}${opportunity.market.line}`}
              {opportunity.market.player && (
                <div className="text-xs font-medium">{opportunity.market.player}</div>
              )}
            </div>
          </div>
        </td>

        {/* Fair Odds */}
        <td className="px-3 py-4">
          <div className="space-y-1">
            <div 
              className="font-mono font-medium text-foreground cursor-help"
              title={`Fair = no-vig odds | Hit Rate: ${(opportunity.fairProbability * 100).toFixed(1)}%`}
            >
              {formatOdds(opportunity.fairOdds)}
            </div>
            <div className="text-xs text-muted-foreground">
              {(opportunity.fairProbability * 100).toFixed(1)}%
            </div>
          </div>
        </td>

        {/* EV% */}
        <td className="px-3 py-4">
          <div 
            className={`font-mono font-bold text-sm cursor-help transition-all duration-150 hover:brightness-110 ${getEVColor(opportunity.evPercent)}`}
            title="EV% = expected value of your selected book compared to fair odds. Red = negative, Yellow = neutral, Green = positive."
          >
            {opportunity.evPercent > 0 ? '+' : ''}{opportunity.evPercent.toFixed(1)}%
          </div>
        </td>

        {/* My Price */}
        <td className="px-3 py-4">
          <div 
            className="flex items-center gap-2 p-2 rounded-md bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-all duration-150 cursor-pointer group max-w-fit"
            onClick={(e) => handleExternalLink(e, opportunity.myPrice.url)}
            title={`${opportunity.myPrice.book} - Click to open at sportsbook`}
          >
            <div className="flex items-center justify-center w-8 h-5 bg-primary/10 rounded text-xs font-bold text-primary">
              {opportunity.myPrice.book.slice(0, 3).toUpperCase()}
            </div>
            <div className="font-mono font-bold text-sm text-primary group-hover:scale-105 transition-transform">
              {formatOdds(opportunity.myPrice.odds)}
            </div>
          </div>
        </td>

        {/* Field Prices */}
        <td className="px-3 py-4">
          <div className="flex flex-wrap gap-1.5">
            {(() => {
              const uniquePrices = Array.from(
                new Map(opportunity.fieldPrices.map(price => [price.book, price])).values()
              );
              const displayPrices = uniquePrices.slice(0, 6);
              const remainingCount = uniquePrices.length - 6;
              
              return (
                <>
                  {displayPrices.map((price, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-center gap-1 px-2 py-1 rounded border text-xs transition-all duration-150 hover:scale-105 cursor-pointer ${
                        price.line !== undefined && price.line !== opportunity.market.line
                          ? 'bg-muted/30 text-muted-foreground border-muted/60 opacity-60'
                          : 'bg-background text-foreground border-border hover:border-primary hover:bg-primary/5'
                      }`}
                      onClick={(e) => handleExternalLink(e, price.url)}
                      title={price.line !== undefined && price.line !== opportunity.market.line ? 
                        `${price.book}: ${formatOdds(price.odds)} (Line: ${price.line})` : 
                        `${price.book}: ${formatOdds(price.odds)}`
                      }
                    >
                      <span className="font-bold text-xs opacity-70">
                        {price.book.slice(0, 3).toUpperCase()}
                      </span>
                      <span className="font-mono font-medium">
                        {formatOdds(price.odds)}
                      </span>
                    </div>
                  ))}
                  {remainingCount > 0 && (
                    <div 
                      className="flex items-center justify-center px-2 py-1 rounded border border-dashed border-muted text-xs text-muted-foreground cursor-help"
                      title={`${remainingCount} more sportsbooks available`}
                    >
                      +{remainingCount}
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </td>

        {/* Consensus */}
        <td className="px-3 py-4">
          {opportunity.consensus && (
            <div className="space-y-1">
              <div className="font-mono text-sm text-foreground">
                {formatOdds(opportunity.consensus.avgOdds)}
              </div>
              <div className="text-xs text-muted-foreground">
                {opportunity.consensus.count} books
              </div>
            </div>
          )}
        </td>

        {/* Status / Age */}
        <td className="px-3 py-4">
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">
              {(() => {
                try {
                  const updatedDate = new Date(opportunity.updatedAt);
                  if (isNaN(updatedDate.getTime())) return '—';
                  const now = new Date();
                  const diffMs = now.getTime() - updatedDate.getTime();
                  const diffSec = Math.floor(diffMs / 1000);
                  const diffMin = Math.floor(diffSec / 60);
                  
                  if (diffSec < 60) return `${diffSec}s ago`;
                  if (diffMin < 60) return `${diffMin}m ago`;
                  if (diffMin < 1440) return `${Math.floor(diffMin / 60)}h ago`;
                  return `${Math.floor(diffMin / 1440)}d ago`;
                } catch {
                  return '—';
                }
              })()}
            </div>
            <Badge 
              variant={opportunity.event.status === 'live' ? 'destructive' : 'secondary'}
              className="text-xs px-2 py-1"
            >
              <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                opportunity.event.status === 'live' ? 'bg-red-500 animate-pulse' : 'bg-gray-400'
              }`}></div>
              {opportunity.event.status === 'live' ? 'LIVE' : 'PRE'}
            </Badge>
          </div>
        </td>

        {/* Actions */}
        <td className="px-3 py-4">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-7 h-7 p-0 hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={handleCopyOdds}
              title="Copy odds to clipboard"
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="w-7 h-7 p-0 hover:bg-yellow-100 hover:text-yellow-600 dark:hover:bg-yellow-900/30 dark:hover:text-yellow-400 transition-colors"
              onClick={handleToggleWatchlist}
              title="Save to watchlist"
            >
              <Star className="h-3.5 w-3.5" />
            </Button>
          </div>
        </td>
      </tr>

    </>
  );
}