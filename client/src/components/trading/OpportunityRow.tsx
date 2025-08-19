import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy, Star, ExternalLink } from 'lucide-react';
import { toAmerican, toPercent, toRelTime, fmtMarket, getEVColor } from '@/lib/formatting';
import { BettingOpportunity } from './OpportunityTable';

interface OpportunityRowProps {
  opportunity: BettingOpportunity;
  onClick?: () => void;
}

export function OpportunityRow({ opportunity, onClick }: OpportunityRowProps) {
  
  const handleCopyOdds = (e: React.MouseEvent) => {
    e.stopPropagation();
    const primaryPrice = opportunity.myBookPrices?.[0];
    if (primaryPrice) {
      navigator.clipboard.writeText(toAmerican(primaryPrice.odds));
    }
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

  const formatTimeChip = (startTime: string) => {
    try {
      const time = new Date(startTime);
      return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '—';
    }
  };

  const primaryPrice = opportunity.myBookPrices?.[0];
  const evPct = opportunity.evPct || 0;
  const fairOdds = opportunity.fairOdds;
  const fairProb = opportunity.fairProb;
  
  return (
    <TooltipProvider>
      <tr 
        className="hover:bg-muted/30 cursor-pointer transition-colors duration-150"
        onClick={onClick}
      >
        {/* Category */}
        <td className="px-3 py-4">
          <Badge 
            variant="secondary"
            className={`text-xs font-medium ${
              opportunity.type === '+EV' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
              opportunity.type === 'Arbitrage' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
              opportunity.type === 'Middling' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
              'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            {opportunity.type || 'N/A'}
          </Badge>
        </td>

        {/* Event */}
        <td className="px-3 py-4">
          <div>
            <div className="font-medium text-sm">
              {opportunity.away} vs {opportunity.home}
            </div>
            <div className="flex gap-1 mt-1">
              <Badge variant="outline" className="text-xs">{opportunity.league}</Badge>
              <Badge 
                variant={opportunity.status === 'live' ? 'destructive' : 'outline'} 
                className="text-xs"
              >
                {opportunity.status === 'live' ? 'LIVE' : 'PRE'}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {formatTimeChip(opportunity.startTime)}
              </Badge>
            </div>
          </div>
        </td>

        {/* Market */}
        <td className="px-3 py-4">
          <div className="text-sm font-medium">
            {fmtMarket(opportunity)}
          </div>
        </td>

        {/* EV% */}
        <td className="px-3 py-4 text-right">
          <Tooltip>
            <TooltipTrigger>
              <span className={`font-mono text-sm font-medium ${getEVColor(evPct)}`}>
                {toPercent(evPct, true)}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>EV% = value of your selected book compared to fair odds. Red = negative, Yellow = neutral, Green = positive.</p>
            </TooltipContent>
          </Tooltip>
        </td>

        {/* My Price */}
        <td className="px-3 py-4">
          {primaryPrice ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="inline-flex items-center h-7 px-2 text-xs font-mono border rounded-md cursor-pointer hover:bg-primary/5"
                  onClick={(e) => handleExternalLink(e, primaryPrice.url)}
                >
                  {primaryPrice.bookId} {toAmerican(primaryPrice.odds)}
                  {primaryPrice.url && <ExternalLink className="ml-1 h-3 w-3" />}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  <p className="font-medium">All My Book Prices:</p>
                  {opportunity.myBookPrices?.map((price, idx) => (
                    <p key={idx} className="text-xs">
                      {price.bookId}: {toAmerican(price.odds)}
                    </p>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          ) : (
            <span className="text-muted-foreground text-sm">—</span>
          )}
        </td>

        {/* Fair Odds */}
        <td className="px-3 py-4 text-right">
          <Tooltip>
            <TooltipTrigger>
              <div>
                {fairOdds ? (
                  <>
                    <div className="font-mono text-sm font-medium">
                      {toAmerican(fairOdds)}
                    </div>
                    {fairProb && (
                      <div className="text-xs text-muted-foreground">
                        Hit {toPercent(fairProb)}
                      </div>
                    )}
                  </>
                ) : (
                  <span className="text-muted-foreground text-sm">—</span>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Fair = no-vig price and probability</p>
            </TooltipContent>
          </Tooltip>
        </td>

        {/* % Hit (optional dedicated column) */}
        <td className="px-3 py-4 text-right">
          {fairProb ? (
            <span className="font-mono text-sm">
              {toPercent(fairProb)}
            </span>
          ) : (
            <span className="text-muted-foreground text-sm">—</span>
          )}
        </td>

        {/* Field Prices */}
        <td className="px-3 py-4 w-2/5">
          <div className="flex flex-wrap gap-1">
            {opportunity.fieldPrices?.slice(0, 6).map((price, idx) => (
              <Tooltip key={idx}>
                <TooltipTrigger asChild>
                  <div
                    className={`inline-flex items-center h-6 px-2 text-xs font-mono border rounded-md cursor-pointer ${
                      price.lineMismatch ? 'opacity-50' : ''
                    }`}
                  >
                    {price.bookId} {toAmerican(price.odds)}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{price.bookId}, {toAmerican(price.odds)}, {price.line || 'standard line'}</p>
                </TooltipContent>
              </Tooltip>
            ))}
            {opportunity.fieldPrices?.length > 6 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="inline-flex items-center h-6 px-2 text-xs border rounded-md cursor-pointer">
                    +{opportunity.fieldPrices.length - 6} more
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {opportunity.fieldPrices.slice(6).map((price, idx) => (
                      <p key={idx} className="text-xs">
                        {price.bookId}: {toAmerican(price.odds)} {price.line && `(${price.line})`}
                      </p>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </td>

        {/* Consensus */}
        <td className="px-3 py-4 w-1/5 text-right">
          <div>
            {opportunity.consensusAmerican ? (
              <>
                <div className="font-mono text-sm font-medium">
                  {opportunity.consensusAmerican}
                </div>
                {opportunity.bookCount && (
                  <div className="text-xs text-muted-foreground">
                    ({opportunity.bookCount} books)
                  </div>
                )}
              </>
            ) : (
              <span className="text-muted-foreground text-sm">—</span>
            )}
          </div>
        </td>

        {/* Status */}
        <td className="px-3 py-4 text-right">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">
              {toRelTime(opportunity.lastUpdated)}
            </div>
            <Badge 
              variant={opportunity.status === 'live' ? 'destructive' : 'outline'} 
              className="text-xs"
            >
              {opportunity.status === 'live' ? 'LIVE' : 'PRE'}
            </Badge>
          </div>
        </td>

        {/* Actions */}
        <td className="px-3 py-4">
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={handleCopyOdds}
              title="Copy odds"
            >
              <Copy className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={handleToggleWatchlist}
              title="Add to watchlist"
            >
              <Star className="h-3 w-3" />
            </Button>
          </div>
        </td>
      </tr>
    </TooltipProvider>
  );
}