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
  isExpanded: boolean;
  onToggle: () => void;
  onClick?: () => void;
}

export function OpportunityRow({ opportunity, isExpanded, onToggle, onClick }: OpportunityRowProps) {
  const formatOdds = (odds: number) => {
    return odds > 0 ? `+${odds}` : `${odds}`;
  };

  const getEVColor = (ev: number) => {
    if (ev >= 5) return 'text-green-600 dark:text-green-400';
    if (ev >= 2) return 'text-green-500 dark:text-green-500';
    if (ev >= 0) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
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
        {/* Expand Toggle */}
        <td className="px-3 py-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-6 h-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            {isExpanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </Button>
        </td>

        {/* Event */}
        <td className="px-3 py-4">
          <div className="space-y-1">
            <div className="font-medium text-foreground">
              {opportunity.event.home} vs {opportunity.event.away}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{opportunity.event.league.toUpperCase()}</span>
              <span>•</span>
              <Badge 
                variant={opportunity.event.status === 'live' ? 'destructive' : 'secondary'}
                className="text-xs px-1 py-0"
              >
                {opportunity.event.status === 'live' ? 'LIVE' : 'PRE'}
              </Badge>
              <span>•</span>
              <span>{new Date(opportunity.event.startTime).toLocaleString()}</span>
            </div>
          </div>
        </td>

        {/* Market */}
        <td className="px-3 py-4">
          <div className="space-y-1">
            <div className="font-medium text-foreground">
              {opportunity.market.type.toUpperCase()}
            </div>
            <div className="text-sm text-muted-foreground">
              {opportunity.market.side}
              {opportunity.market.line && ` ${opportunity.market.line > 0 ? '+' : ''}${opportunity.market.line}`}
              {opportunity.market.player && (
                <div className="text-xs">{opportunity.market.player}</div>
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
          <div className={`font-mono font-bold text-sm ${getEVColor(opportunity.evPercent)}`}>
            {opportunity.evPercent > 0 ? '+' : ''}{opportunity.evPercent.toFixed(1)}%
          </div>
        </td>

        {/* My Price */}
        <td className="px-3 py-4">
          <div className="flex flex-col items-center gap-1">
            {/* Sportsbook Icon */}
            <div className="flex items-center justify-center w-8 h-6 bg-primary/10 rounded border border-primary/20 text-xs font-medium text-primary">
              {opportunity.myPrice.book.slice(0, 3).toUpperCase()}
            </div>
            {/* Price */}
            <button
              className={`font-mono font-medium text-foreground hover:text-primary transition-colors px-2 py-1 rounded border border-primary/20 bg-primary/5 min-w-[50px] ${opportunity.myPrice.url ? 'cursor-pointer' : ''}`}
              onClick={(e) => handleExternalLink(e, opportunity.myPrice.url)}
            >
              {formatOdds(opportunity.myPrice.odds)}
              {opportunity.myPrice.url && (
                <ExternalLink className="h-3 w-3 ml-1 inline" />
              )}
            </button>
          </div>
        </td>

        {/* Field Prices */}
        <td className="px-3 py-4">
          <div className="flex flex-wrap gap-2">
            {opportunity.fieldPrices.slice(0, 6).map((price, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                {/* Sportsbook Icon */}
                <div className="flex items-center justify-center w-8 h-6 bg-muted/20 rounded border text-xs font-medium text-muted-foreground">
                  {price.book.slice(0, 3).toUpperCase()}
                </div>
                {/* Price */}
                <button
                  className={`text-xs px-2 py-1 rounded border transition-all duration-150 hover:scale-105 min-w-[50px] ${
                    price.line !== undefined && price.line !== opportunity.market.line
                      ? 'bg-muted/30 text-muted-foreground border-muted'
                      : 'bg-background text-foreground border-border hover:border-primary'
                  }`}
                  onClick={(e) => handleExternalLink(e, price.url)}
                >
                  {formatOdds(price.odds)}
                </button>
              </div>
            ))}
            {opportunity.fieldPrices.length > 6 && (
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-6 flex items-center justify-center">
                  <Badge variant="secondary" className="text-xs">
                    +{opportunity.fieldPrices.length - 6}
                  </Badge>
                </div>
              </div>
            )}
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
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(opportunity.updatedAt), { addSuffix: true })}
            </span>
          </div>
        </td>

        {/* Actions */}
        <td className="px-3 py-4">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-6 h-6 p-0"
              onClick={handleCopyOdds}
              title="Copy odds"
            >
              <Copy className="h-3 w-3" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="w-6 h-6 p-0"
              onClick={handleToggleWatchlist}
              title="Add to watchlist"
            >
              <Star className="h-3 w-3" />
            </Button>
          </div>
        </td>
      </tr>

      {/* Expanded Row */}
      {isExpanded && (
        <tr>
          <td colSpan={10} className="px-0 py-0">
            <RowExpansion opportunity={opportunity} />
          </td>
        </tr>
      )}
    </>
  );
}