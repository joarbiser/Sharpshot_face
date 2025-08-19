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
  isEven?: boolean;
}

export function OpportunityRow({ opportunity, onClick, isEven = false }: OpportunityRowProps) {
  
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
    
    // For totals: "Under 0.5", "Over 6.5"
    if (market.type === 'total' && market.line !== undefined) {
      const sideText = market.side === 'over' ? 'Over' : 'Under';
      return `${sideText} ${market.line}`;
    }
    
    // For spreads with team: "San Diego Padres +3.5", "Chicago White Sox -6.5"
    if (market.type === 'spread' && market.line !== undefined) {
      const team = market.side === 'home' ? opportunity.event.home : opportunity.event.away;
      const sign = market.line >= 0 ? '+' : '';
      return `${team} ${sign}${market.line}`;
    }
    
    // For moneyline: show the team name "Kansas City Royals"
    if (market.type === 'moneyline') {
      const team = market.side === 'home' ? opportunity.event.home : opportunity.event.away;
      return team;
    }
    
    // For player props: "Player Name Over 12.5"
    if (market.type === 'player_prop' && market.player) {
      if (market.line !== undefined) {
        const sideText = market.side === 'over' ? 'Over' : market.side === 'under' ? 'Under' : market.side;
        return `${market.player} ${sideText} ${market.line}`;
      }
      return `${market.player} ${market.side || 'Prop'}`;
    }
    
    // Fallback for any unhandled cases
    if (market.line !== undefined) {
      const sideText = market.side === 'over' ? 'Over' : market.side === 'under' ? 'Under' : market.side;
      return `${sideText} ${market.line}`;
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
        className={`border-b border-border/30 hover:bg-muted/20 cursor-pointer transition-all duration-200 ${
          isEven ? 'bg-background' : 'bg-muted/5'
        }`}
        onClick={onClick}
      >
        {/* Category */}
        <td className="px-4 py-3">
          <div 
            className={`text-xs font-mono font-medium uppercase tracking-wider px-2 py-1 rounded ${
              opportunity.category === 'ev' ? 'text-green-400 bg-green-500/10 border border-green-500/20' :
              opportunity.category === 'arbitrage' ? 'text-purple-400 bg-purple-500/10 border border-purple-500/20' :
              opportunity.category === 'middling' ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20' :
              'text-muted-foreground bg-muted/50 border border-border/50'
            }`}
          >
            {getCategoryLabel(opportunity.category)}
          </div>
        </td>

        {/* Event */}
        <td className="px-4 py-3">
          <div>
            <div className="font-medium text-sm text-foreground">
              {opportunity.event.away} vs {opportunity.event.home}
            </div>
            <div className="flex gap-1 mt-1">
              <div 
                className={`text-xs px-1.5 py-0.5 rounded font-mono font-medium ${
                  opportunity.event.status === 'live' 
                    ? 'text-red-400 bg-red-500/10 border border-red-500/20' 
                    : 'text-muted-foreground bg-muted/30 border border-border/30'
                }`}
              >
                {opportunity.event.status === 'live' ? 'LIVE' : 'PRE'}
              </div>
              <div className="text-xs px-1.5 py-0.5 rounded font-mono text-muted-foreground bg-muted/30 border border-border/30">
                {formatTimeChip(opportunity.event.startTime)}
              </div>
            </div>
          </div>
        </td>

        {/* League */}
        <td className="px-4 py-3">
          <div className="text-xs px-1.5 py-0.5 rounded font-mono text-muted-foreground bg-muted/30 border border-border/30">
            {opportunity.event.league}
          </div>
        </td>

        {/* Prop */}
        <td className="px-4 py-3">
          <div className="text-sm font-medium text-foreground">
            {formatPropInfo(opportunity)}
          </div>
        </td>

        {/* Market */}
        <td className="px-4 py-3">
          <div className="text-sm text-muted-foreground">
            {formatMarketInfo(opportunity)}
          </div>
        </td>

        {/* Hit % */}
        <td className="px-4 py-3 text-right">
          {fairProb ? (
            <span className="font-mono text-sm text-muted-foreground">
              {toPercent(fairProb)}
            </span>
          ) : (
            <span className="text-muted-foreground text-sm">—</span>
          )}
        </td>

        {/* +EV % */}
        <td className="px-4 py-3 text-right">
          <Tooltip>
            <TooltipTrigger>
              <span className={`font-mono text-sm font-bold ${getEVColor(evPct)}`}>
                {toPercent(evPct, true)}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>EV% = value of your selected book compared to fair odds. Red = negative, Yellow = neutral, Green = positive.</p>
            </TooltipContent>
          </Tooltip>
        </td>

        {/* My Odds */}
        <td className="px-4 py-3">
          {opportunity.myPrice ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="inline-flex items-center h-6 px-2 text-xs font-mono bg-muted/30 border border-border/50 rounded cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={(e) => handleExternalLink(e, opportunity.myPrice.url)}
                >
                  <span className="text-muted-foreground text-xs">{opportunity.myPrice.book}</span>
                  <span className="ml-1 font-bold">{toAmerican(opportunity.myPrice.odds)}</span>
                  {opportunity.myPrice.url && <ExternalLink className="ml-1 h-3 w-3 text-muted-foreground" />}
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
        <td className="px-4 py-3 text-right">
          <Tooltip>
            <TooltipTrigger>
              <div>
                {fairOdds ? (
                  <div className="font-mono text-sm font-bold text-foreground">
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
        <td className="px-4 py-3 w-2/5">
          <div className="flex flex-wrap gap-1">
            {opportunity.fieldPrices?.slice(0, 6).map((price, idx) => (
              <Tooltip key={idx}>
                <TooltipTrigger asChild>
                  <div className="inline-flex items-center h-5 px-1.5 text-xs font-mono bg-muted/20 border border-border/30 rounded cursor-pointer hover:bg-muted/40 transition-colors">
                    <span className="text-muted-foreground text-xs">{price.book}</span>
                    <span className="ml-1 font-medium">{toAmerican(price.odds)}</span>
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
                  <div className="inline-flex items-center h-5 px-1.5 text-xs font-mono bg-muted/20 border border-border/30 rounded cursor-pointer hover:bg-muted/40 transition-colors text-muted-foreground">
                    +{opportunity.fieldPrices.length - 6}
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
        <td className="px-4 py-3 text-right">
          <div className="text-xs font-mono text-muted-foreground">
            {toRelTime(opportunity.updatedAt)}
          </div>
        </td>
      </tr>
    </TooltipProvider>
  );
}