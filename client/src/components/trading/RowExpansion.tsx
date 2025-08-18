import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ExternalLink, DollarSign, TrendingUp, BarChart3 } from 'lucide-react';
import { BettingOpportunity } from './OpportunityTable';

interface RowExpansionProps {
  opportunity: BettingOpportunity;
}

export function RowExpansion({ opportunity }: RowExpansionProps) {
  const formatOdds = (odds: number) => {
    return odds > 0 ? `+${odds}` : `${odds}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="bg-muted/10 border-t">
      <div className="p-6 space-y-6">
        {/* Full Price Ladder */}
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Price Ladder
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* My Price - Highlighted */}
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">{opportunity.myPrice.book}</div>
                    <div className="text-xs text-muted-foreground">My Book</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-primary">
                      {formatOdds(opportunity.myPrice.odds)}
                    </div>
                    {opportunity.myPrice.url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-6 h-6 p-0 mt-1"
                        onClick={() => window.open(opportunity.myPrice.url, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Field Prices */}
            {opportunity.fullLadder ? opportunity.fullLadder.map((price, idx) => (
              <Card key={idx} className="hover:bg-muted/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm">{price.book}</div>
                      {price.line !== undefined && price.line !== opportunity.market.line && (
                        <div className="text-xs text-muted-foreground">
                          Line: {price.line > 0 ? '+' : ''}{price.line}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-medium">
                        {formatOdds(price.odds)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) : opportunity.fieldPrices.map((price, idx) => (
              <Card key={idx} className="hover:bg-muted/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm">{price.book}</div>
                      {price.line !== undefined && price.line !== opportunity.market.line && (
                        <div className="text-xs text-muted-foreground">
                          Line: {price.line > 0 ? '+' : ''}{price.line}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-medium">
                        {formatOdds(price.odds)}
                      </div>
                      {price.url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-6 h-6 p-0 mt-1"
                          onClick={() => window.open(price.url, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Kelly Stake Suggestion */}
        {opportunity.kellyStake && (
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Stake Suggestion
            </h4>
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Kelly Criterion</div>
                    <div className="font-bold text-lg">
                      {formatCurrency(opportunity.kellyStake)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Expected Value</div>
                    <div className="font-bold text-lg text-green-600">
                      {formatCurrency(opportunity.kellyStake * (opportunity.evPercent / 100))}
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  Based on {opportunity.evPercent.toFixed(1)}% edge and Kelly fraction
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Mini History Sparkline */}
        {opportunity.history && opportunity.history.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Price History
            </h4>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-end gap-1 h-16">
                  {opportunity.history.map((point, idx) => {
                    const maxOdds = Math.max(...opportunity.history!.map(h => Math.abs(h.odds)));
                    const minOdds = Math.min(...opportunity.history!.map(h => Math.abs(h.odds)));
                    const normalizedHeight = ((Math.abs(point.odds) - minOdds) / (maxOdds - minOdds)) * 100;
                    
                    return (
                      <Tooltip key={idx}>
                        <TooltipTrigger>
                          <div
                            className="bg-primary/50 hover:bg-primary transition-colors rounded-sm"
                            style={{
                              height: `${Math.max(normalizedHeight, 10)}%`,
                              width: '4px'
                            }}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-xs">
                            {formatOdds(point.odds)}
                            <br />
                            {new Date(point.timestamp).toLocaleTimeString()}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>
                    {new Date(opportunity.history[0].timestamp).toLocaleTimeString()}
                  </span>
                  <span>
                    {new Date(opportunity.history[opportunity.history.length - 1].timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}