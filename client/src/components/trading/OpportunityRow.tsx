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
    if (opportunity.myPrice) {
      navigator.clipboard.writeText(toAmerican(opportunity.myPrice.odds));
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

  const formatPropInfo = (opportunity: BettingOpportunity): string => {
    const { market } = opportunity;
    
    // For totals: "Under 54.5", "Over 62.5"
    if (market.type === 'total' && market.line) {
      return `${market.side} ${market.line}`;
    }
    
    // For spreads with team: "Washington Commanders -3.5", "Toronto Blue Jays +2.5"
    if (market.type === 'spread' && market.line && market.side) {
      const sign = market.line > 0 ? '+' : '';
      return `${market.side} ${sign}${market.line}`;
    }
    
    // For moneyline: show the team name
    if (market.type === 'moneyline' && market.side) {
      return market.side;
    }
    
    // For player props: "Player Name Over 12.5"
    if (market.type === 'player_prop' && market.player) {
      if (market.line) {
        return `${market.player} ${market.side} ${market.line}`;
      }
      return `${market.player} ${market.side || 'Prop'}`;
    }
    
    return market.side || market.type || 'Prop';
  };

  const formatMarketInfo = (opportunity: BettingOpportunity): string => {
    const { market } = opportunity;
    
    // For totals: "Total Points"
    if (market.type === 'total') {
      return 'Total Points';
    }
    
    // For spreads: "Point Spread"
    if (market.type === 'spread') {
      return 'Point Spread';
    }
    
    // For moneyline: "Moneyline"
    if (market.type === 'moneyline') {
      return 'Moneyline';
    }
    
    // For player props: show the stat type if available
    if (market.type === 'player_prop') {
      return 'Player Prop';
    }
    
    return market.type || 'Market';
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'ev': return '+EV';
      case 'arbitrage': return 'Arbitrage';
      case 'middling': return 'Middling';
      default: return category || 'N/A';
    }
  };

  const evPct = opportunity.evPercent || 0;
  const fairOdds = opportunity.fairOdds;
  const fairProb = opportunity.fairProbability;
  
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
              opportunity.category === 'ev' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
              opportunity.category === 'arbitrage' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
              opportunity.category === 'middling' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
              'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            {getCategoryLabel(opportunity.category)}
          </Badge>
        </td>

        {/* Event */}
        <td className="px-3 py-4">
          <div>
            <div className="font-medium text-sm">
              {opportunity.event.away} vs {opportunity.event.home}
            </div>
            <div className="flex gap-1 mt-1">
              <Badge 
                variant={opportunity.event.status === 'live' ? 'destructive' : 'outline'} 
                className="text-xs"
              >
                {opportunity.event.status === 'live' ? 'LIVE' : 'PRE'}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {formatTimeChip(opportunity.event.startTime)}
              </Badge>
            </div>
          </div>
        </td>

        {/* League */}
        <td className="px-3 py-4">
          <Badge variant="outline" className="text-xs">{opportunity.event.league}</Badge>
        </td>

        {/* Prop */}
        <td className="px-3 py-4">
          <div className="text-sm">
            {formatPropInfo(opportunity)}
          </div>
        </td>

        {/* Market */}
        <td className="px-3 py-4">
          <div className="text-sm font-medium">
            {formatMarketInfo(opportunity)}
          </div>
        </td>

        {/* Hit % */}
        <td className="px-3 py-4 text-right">
          {fairProb ? (
            <span className="font-mono text-sm">
              {toPercent(fairProb)}
            </span>
          ) : (
            <span className="text-muted-foreground text-sm">—</span>
          )}
        </td>

        {/* +EV % */}
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

        {/* My Odds */}
        <td className="px-3 py-4">
          {opportunity.myPrice ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="inline-flex items-center h-7 px-2 text-xs font-mono border rounded-md cursor-pointer hover:bg-primary/5"
                  onClick={(e) => handleExternalLink(e, opportunity.myPrice.url)}
                >
                  {opportunity.myPrice.book} {toAmerican(opportunity.myPrice.odds)}
                  {opportunity.myPrice.url && <ExternalLink className="ml-1 h-3 w-3" />}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  <p className="font-medium">My Book Price:</p>
                  <p className="text-xs">
                    {opportunity.myPrice.book}: {toAmerican(opportunity.myPrice.odds)}
                  </p>
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
                  <div className="font-mono text-sm font-medium">
                    {toAmerican(fairOdds)}
                  </div>
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

        {/* Field Odds */}
        <td className="px-3 py-4 w-2/5">
          <div className="flex flex-wrap gap-1">
            {opportunity.fieldPrices?.slice(0, 6).map((price, idx) => (
              <Tooltip key={idx}>
                <TooltipTrigger asChild>
                  <div
                    className="inline-flex items-center h-6 px-2 text-xs font-mono border rounded-md cursor-pointer"
                  >
                    {price.book} {toAmerican(price.odds)}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{price.book}, {toAmerican(price.odds)}, {price.line || 'standard line'}</p>
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
                        {price.book}: {toAmerican(price.odds)} {price.line && `(${price.line})`}
                      </p>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </td>

        {/* Status */}
        <td className="px-3 py-4 text-right">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">
              {toRelTime(opportunity.updatedAt)}
            </div>
            <Badge 
              variant={opportunity.event.status === 'live' ? 'destructive' : 'outline'} 
              className="text-xs"
            >
              {opportunity.event.status === 'live' ? 'LIVE' : 'PRE'}
            </Badge>
          </div>
        </td>
      </tr>
    </TooltipProvider>
  );
}