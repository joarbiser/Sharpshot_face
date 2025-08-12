import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BetCategorizer } from '../../../shared/betCategories';
import { Calculator, DollarSign, TrendingUp, Target } from 'lucide-react';

interface ArbitrageCalculatorProps {
  opportunity?: any;
  className?: string;
}

export function ArbitrageCalculator({ opportunity, className = "" }: ArbitrageCalculatorProps) {
  const [totalStake, setTotalStake] = useState<number>(100);
  const [side1Odds, setSide1Odds] = useState<number>(-110);
  const [side2Odds, setSide2Odds] = useState<number>(+105);
  const [calculation, setCalculation] = useState<any>(null);

  useEffect(() => {
    if (opportunity && opportunity.oddsComparison && opportunity.oddsComparison.length >= 2) {
      const odds = opportunity.oddsComparison.map((comp: any) => comp.odds).sort((a: number, b: number) => b - a);
      setSide1Odds(odds[0]);
      setSide2Odds(odds[odds.length - 1]);
    }
  }, [opportunity]);

  useEffect(() => {
    const result = BetCategorizer.calculateArbitrageStakes(side1Odds, side2Odds, totalStake);
    setCalculation(result);
  }, [side1Odds, side2Odds, totalStake]);

  const formatOdds = (odds: number) => {
    return odds > 0 ? `+${odds}` : `${odds}`;
  };

  const isArbitrage = calculation && calculation.profit > 0;

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-mono">
          <Calculator className="h-5 w-5" />
          <span>ARBITRAGE CALCULATOR</span>
        </CardTitle>
        <CardDescription>
          Calculate guaranteed profit opportunities across different sportsbooks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label htmlFor="total-stake">Total Stake ($)</Label>
            <Input
              id="total-stake"
              type="number"
              value={totalStake}
              onChange={(e) => setTotalStake(Number(e.target.value))}
              min="1"
              max="10000"
            />
          </div>
          <div>
            <Label htmlFor="side1-odds">Side 1 Odds</Label>
            <Input
              id="side1-odds"
              type="number"
              value={side1Odds}
              onChange={(e) => setSide1Odds(Number(e.target.value))}
              placeholder="-110"
            />
          </div>
          <div>
            <Label htmlFor="side2-odds">Side 2 Odds</Label>
            <Input
              id="side2-odds"
              type="number"
              value={side2Odds}
              onChange={(e) => setSide2Odds(Number(e.target.value))}
              placeholder="+105"
            />
          </div>
        </div>

        <Separator />

        {/* Results Section */}
        {calculation ? (
          <>
            <div className="text-center">
              <Badge 
                variant={isArbitrage ? "default" : "destructive"}
                className={`text-lg px-4 py-2 ${isArbitrage ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
              >
                {isArbitrage ? '✓ ARBITRAGE OPPORTUNITY' : '✗ NO ARBITRAGE'}
              </Badge>
            </div>

            {isArbitrage ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Stake Distribution */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold font-mono">STAKE DISTRIBUTION</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span>Side 1 ({formatOdds(side1Odds)}):</span>
                      <span className="font-mono font-bold">${calculation.stake1}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span>Side 2 ({formatOdds(side2Odds)}):</span>
                      <span className="font-mono font-bold">${calculation.stake2}</span>
                    </div>
                  </div>
                </div>

                {/* Profit Analysis */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold font-mono">GUARANTEED PROFIT</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        Profit:
                      </span>
                      <span className="font-mono font-bold text-green-600 dark:text-green-400">
                        ${calculation.profit}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        ROI:
                      </span>
                      <span className="font-mono font-bold text-green-600 dark:text-green-400">
                        {calculation.roi}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  No Arbitrage Opportunity
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  The combined implied probability is {((BetCategorizer.calculateImpliedProbability(side1Odds) + BetCategorizer.calculateImpliedProbability(side2Odds)) * 100).toFixed(1)}%.
                  Arbitrage requires less than 100%.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D8AC35] dark:border-[#00ff41] mx-auto"></div>
          </div>
        )}

        {/* Example Section */}
        <Separator />
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <h4 className="font-semibold mb-2">How Arbitrage Works:</h4>
          <p>
            Arbitrage betting guarantees profit by placing bets on all possible outcomes at different sportsbooks. 
            When the combined implied probability of all outcomes is less than 100%, you can guarantee profit regardless of the result.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

interface MiddlingCalculatorProps {
  opportunity?: any;
  className?: string;
}

export function MiddlingCalculator({ opportunity, className = "" }: MiddlingCalculatorProps) {
  const [totalStake, setTotalStake] = useState<number>(100);
  const [overOdds, setOverOdds] = useState<number>(-110);
  const [underOdds, setUnderOdds] = useState<number>(-110);
  const [overLine, setOverLine] = useState<number>(44.5);
  const [underLine, setUnderLine] = useState<number>(47.5);
  const [calculation, setCalculation] = useState<any>(null);

  useEffect(() => {
    if (opportunity && opportunity.oddsComparison && opportunity.oddsComparison.length >= 2) {
      const odds = opportunity.oddsComparison.map((comp: any) => comp.odds);
      setOverOdds(odds[0] || -110);
      setUnderOdds(odds[1] || -110);
    }
  }, [opportunity]);

  useEffect(() => {
    const result = BetCategorizer.calculateMiddlingStakes(overOdds, underOdds, totalStake);
    setCalculation(result);
  }, [overOdds, underOdds, totalStake]);

  const formatOdds = (odds: number) => {
    return odds > 0 ? `+${odds}` : `${odds}`;
  };

  const middleRange = underLine - overLine;
  const hasMiddle = middleRange > 0;

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-mono">
          <Target className="h-5 w-5" />
          <span>MIDDLING CALCULATOR</span>
        </CardTitle>
        <CardDescription>
          Calculate middle opportunities where you can win both bets
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <h3 className="font-semibold">Bet Stakes</h3>
            <div>
              <Label htmlFor="total-stake-middle">Total Stake ($)</Label>
              <Input
                id="total-stake-middle"
                type="number"
                value={totalStake}
                onChange={(e) => setTotalStake(Number(e.target.value))}
                min="1"
                max="10000"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Lines & Odds</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="over-line">Over Line</Label>
                <Input
                  id="over-line"
                  type="number"
                  value={overLine}
                  onChange={(e) => setOverLine(Number(e.target.value))}
                  step="0.5"
                />
              </div>
              <div>
                <Label htmlFor="over-odds">Over Odds</Label>
                <Input
                  id="over-odds"
                  type="number"
                  value={overOdds}
                  onChange={(e) => setOverOdds(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="under-line">Under Line</Label>
                <Input
                  id="under-line"
                  type="number"
                  value={underLine}
                  onChange={(e) => setUnderLine(Number(e.target.value))}
                  step="0.5"
                />
              </div>
              <div>
                <Label htmlFor="under-odds">Under Odds</Label>
                <Input
                  id="under-odds"
                  type="number"
                  value={underOdds}
                  onChange={(e) => setUnderOdds(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Results Section */}
        {calculation && (
          <>
            <div className="text-center">
              <Badge 
                variant={hasMiddle ? "default" : "secondary"}
                className={`text-lg px-4 py-2 ${hasMiddle ? 'bg-purple-500 hover:bg-purple-600' : ''}`}
              >
                {hasMiddle ? `✓ MIDDLE RANGE: ${overLine} - ${underLine}` : '● OVERLAPPING LINES'}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Stake Distribution */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold font-mono">STAKE DISTRIBUTION</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span>Over {overLine} ({formatOdds(overOdds)}):</span>
                    <span className="font-mono font-bold">${calculation.overStake}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span>Under {underLine} ({formatOdds(underOdds)}):</span>
                    <span className="font-mono font-bold">${calculation.underStake}</span>
                  </div>
                </div>
              </div>

              {/* Outcome Analysis */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold font-mono">POTENTIAL OUTCOMES</h3>
                <div className="space-y-3">
                  {hasMiddle && (
                    <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <span className="flex items-center">
                        <Target className="h-4 w-4 mr-1" />
                        Middle Hit:
                      </span>
                      <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                        +${calculation.middleWin}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Single Win:
                    </span>
                    <span className="font-mono font-bold text-green-600 dark:text-green-400">
                      +${calculation.singleWin}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Example Section */}
        <Separator />
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <h4 className="font-semibold mb-2">How Middling Works:</h4>
          <p>
            Middling creates opportunities to win both bets when the final result falls between your two lines. 
            Even if the middle doesn't hit, you're still getting +EV on each individual bet.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}