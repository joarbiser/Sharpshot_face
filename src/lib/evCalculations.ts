// src/lib/evCalculations.ts
// Expected Value calculation utilities for sports betting

/**
 * Convert American odds to decimal odds
 */
export function americanToDecimal(americanOdds: number): number {
  if (americanOdds > 0) {
    return (americanOdds / 100) + 1;
  } else {
    return (100 / Math.abs(americanOdds)) + 1;
  }
}

/**
 * Convert decimal odds to American odds
 */
export function decimalToAmerican(decimalOdds: number): number {
  if (decimalOdds >= 2.0) {
    return Math.round((decimalOdds - 1) * 100);
  } else {
    return Math.round(-100 / (decimalOdds - 1));
  }
}

/**
 * Calculate implied probability from American odds
 */
export function americanToImpliedProbability(americanOdds: number): number {
  if (americanOdds > 0) {
    return 100 / (americanOdds + 100);
  } else {
    return Math.abs(americanOdds) / (Math.abs(americanOdds) + 100);
  }
}

/**
 * Calculate implied probability from decimal odds
 */
export function decimalToImpliedProbability(decimalOdds: number): number {
  return 1 / decimalOdds;
}

/**
 * Calculate Expected Value (EV) percentage
 */
export function calculateEVPercentage(
  trueWinProbability: number,
  americanOdds: number,
  stake: number = 100
): number {
  // Calculate actual payout based on offered odds
  let actualPayout: number;
  if (americanOdds > 0) {
    actualPayout = (americanOdds / 100) * stake;
  } else {
    actualPayout = (100 / Math.abs(americanOdds)) * stake;
  }
  
  const amountWon = actualPayout;
  const amountLost = stake;
  const probabilityOfLosing = 1 - trueWinProbability;
  
  const ev = (trueWinProbability * amountWon) - (probabilityOfLosing * amountLost);
  return (ev / stake) * 100;
}

/**
 * Calculate Expected Value using decimal odds
 */
export function calculateEVFromDecimal(
  trueWinProbability: number,
  decimalOdds: number,
  stake: number = 100
): number {
  const payout = decimalOdds * stake;
  const profit = payout - stake;
  const probabilityOfLosing = 1 - trueWinProbability;
  
  const ev = (trueWinProbability * profit) - (probabilityOfLosing * stake);
  return (ev / stake) * 100;
}

/**
 * Calculate fair odds from true probability
 */
export function probabilityToDecimalOdds(probability: number): number {
  return 1 / probability;
}

/**
 * Calculate fair American odds from true probability
 */
export function probabilityToAmericanOdds(probability: number): number {
  const decimalOdds = probabilityToDecimalOdds(probability);
  return decimalToAmerican(decimalOdds);
}

/**
 * Remove vig (juice) from a set of odds to get fair probabilities
 */
export function removeVig(odds: number[]): number[] {
  const impliedProbs = odds.map(decimalToImpliedProbability);
  const totalImpliedProb = impliedProbs.reduce((sum, prob) => sum + prob, 0);
  
  // Normalize to remove vig
  return impliedProbs.map(prob => prob / totalImpliedProb);
}

/**
 * Calculate Kelly Criterion bet size
 */
export function kellyBetSize(
  bankroll: number,
  trueWinProbability: number,
  decimalOdds: number
): number {
  const q = 1 - trueWinProbability; // Probability of losing
  const b = decimalOdds - 1; // Net odds received on the wager
  
  const kellyFraction = (trueWinProbability * b - q) / b;
  
  // Don't bet if Kelly fraction is negative (negative EV)
  if (kellyFraction <= 0) return 0;
  
  // Cap at 25% of bankroll for risk management
  const cappedFraction = Math.min(kellyFraction, 0.25);
  
  return bankroll * cappedFraction;
}

/**
 * Calculate arbitrage opportunity
 */
export function calculateArbitrage(
  decimalOdds1: number,
  decimalOdds2: number
): { isArbitrage: boolean; profit?: number; stake1?: number; stake2?: number } {
  const impliedProb1 = decimalToImpliedProbability(decimalOdds1);
  const impliedProb2 = decimalToImpliedProbability(decimalOdds2);
  const totalImpliedProb = impliedProb1 + impliedProb2;
  
  if (totalImpliedProb >= 1) {
    return { isArbitrage: false };
  }
  
  // Calculate stakes for $100 total bet
  const totalStake = 100;
  const stake1 = totalStake * impliedProb1 / totalImpliedProb;
  const stake2 = totalStake * impliedProb2 / totalImpliedProb;
  
  const payout1 = stake1 * decimalOdds1;
  const payout2 = stake2 * decimalOdds2;
  const profit = Math.min(payout1, payout2) - totalStake;
  
  return {
    isArbitrage: true,
    profit: profit,
    stake1: stake1,
    stake2: stake2
  };
}

/**
 * Calculate break-even win rate
 */
export function breakEvenWinRate(americanOdds: number): number {
  return americanToImpliedProbability(americanOdds) * 100;
}

/**
 * Format odds for display
 */
export function formatOdds(decimalOdds: number, format: 'american' | 'decimal' = 'american'): string {
  if (format === 'decimal') {
    return decimalOdds.toFixed(2);
  }
  
  const americanOdds = decimalToAmerican(decimalOdds);
  return americanOdds > 0 ? `+${americanOdds}` : `${americanOdds}`;
}

/**
 * Validate EV calculation inputs
 */
export function validateEVInputs(
  probability: number,
  odds: number
): { isValid: boolean; error?: string } {
  if (probability < 0 || probability > 1) {
    return { isValid: false, error: 'Probability must be between 0 and 1' };
  }
  
  if (odds <= 0) {
    return { isValid: false, error: 'Odds must be positive' };
  }
  
  return { isValid: true };
}