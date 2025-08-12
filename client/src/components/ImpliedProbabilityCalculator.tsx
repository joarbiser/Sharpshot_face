import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, Percent, TrendingUp } from 'lucide-react';

interface ImpliedProbabilityResult {
  impliedProbability: number;
  fairOdds: number;
  vigPercentage: number;
  decimalOdds: number;
  fractionalOdds: string;
}

export function ImpliedProbabilityCalculator() {
  const [americanOdds, setAmericanOdds] = useState<string>('');
  const [result, setResult] = useState<ImpliedProbabilityResult | null>(null);

  const calculateImpliedProbability = (odds: number): ImpliedProbabilityResult => {
    let probability: number;
    
    if (odds > 0) {
      // Positive odds: implied probability = 100 / (odds + 100)
      probability = 100 / (odds + 100);
    } else {
      // Negative odds: implied probability = Math.abs(odds) / (Math.abs(odds) + 100)
      probability = Math.abs(odds) / (Math.abs(odds) + 100);
    }

    // Calculate decimal odds
    const decimalOdds = odds > 0 ? (odds / 100) + 1 : (100 / Math.abs(odds)) + 1;

    // Calculate fractional odds
    const fractionalOdds = odds > 0 ? `${odds}/100` : `100/${Math.abs(odds)}`;

    // Calculate fair odds (without vig)
    const fairProbability = probability;
    const fairOdds = fairProbability >= 0.5 ? 
      -(fairProbability / (1 - fairProbability)) * 100 : 
      ((1 - fairProbability) / fairProbability) * 100;

    // Estimate vig (simplified - typically 4-5% for major books)
    const estimatedVig = 4.5;

    return {
      impliedProbability: probability,
      fairOdds: Math.round(fairOdds),
      vigPercentage: estimatedVig,
      decimalOdds: Math.round(decimalOdds * 100) / 100,
      fractionalOdds
    };
  };

  const handleCalculate = () => {
    const odds = parseInt(americanOdds);
    if (isNaN(odds) || odds === 0) return;
    
    const calculatedResult = calculateImpliedProbability(odds);
    setResult(calculatedResult);
  };

  const formatProbability = (prob: number) => `${(prob * 100).toFixed(2)}%`;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <Percent className="h-5 w-5 text-[#D8AC35] dark:text-[#00ff41]" />
          Implied Probability Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Input Section */}
        <div className="space-y-3">
          <Label htmlFor="american-odds" className="text-sm font-medium">
            American Odds
          </Label>
          <div className="flex gap-2">
            <Input
              id="american-odds"
              type="number"
              placeholder="e.g., -110, +150"
              value={americanOdds}
              onChange={(e) => setAmericanOdds(e.target.value)}
              className="flex-1"
            />
            <button
              onClick={handleCalculate}
              disabled={!americanOdds}
              className="px-4 py-2 bg-[#D8AC35] dark:bg-[#00ff41] hover:bg-[#C4982A] dark:hover:bg-[#00e639] text-black font-mono font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              Calculate
            </button>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Implied Probability */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-[#D8AC35] dark:text-[#00ff41]" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Implied Probability
                  </span>
                </div>
                <div className="text-2xl font-bold font-mono text-gray-900 dark:text-white">
                  {formatProbability(result.impliedProbability)}
                </div>
              </div>

              {/* Decimal Odds */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="h-4 w-4 text-[#D8AC35] dark:text-[#00ff41]" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Decimal Odds
                  </span>
                </div>
                <div className="text-2xl font-bold font-mono text-gray-900 dark:text-white">
                  {result.decimalOdds}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold font-mono mb-3 text-gray-900 dark:text-white">
                BETTING ANALYTICS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Fractional Odds:</span>
                  <div className="font-mono font-bold text-gray-900 dark:text-white">
                    {result.fractionalOdds}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Est. Vig:</span>
                  <div className="font-mono font-bold text-gray-900 dark:text-white">
                    {result.vigPercentage.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Fair Odds:</span>
                  <div className="font-mono font-bold text-gray-900 dark:text-white">
                    {result.fairOdds > 0 ? '+' : ''}{result.fairOdds}
                  </div>
                </div>
              </div>
            </div>

            {/* Interpretation */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Sharp Shot Analysis
              </h4>
              <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <p>
                  <strong>Breakeven Rate:</strong> You need to win{' '}
                  <Badge variant="outline" className="font-mono">
                    {formatProbability(result.impliedProbability)}
                  </Badge>{' '}
                  of your bets to break even.
                </p>
                <p>
                  <strong>Edge Required:</strong> To be profitable, your win rate must exceed the implied probability.
                </p>
                <p>
                  <strong>Vig Impact:</strong> The sportsbook's {result.vigPercentage.toFixed(1)}% vig is built into these odds.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Reference */}
        <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p><strong>Quick Reference:</strong></p>
          <p>• Negative odds (-110): Favorite - you bet more to win less</p>
          <p>• Positive odds (+150): Underdog - you bet less to win more</p>
          <p>• Even odds (+100): 50/50 proposition</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default ImpliedProbabilityCalculator;