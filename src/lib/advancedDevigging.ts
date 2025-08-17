// src/lib/advancedDevigging.ts
// Advanced devigging system for accurate EV analysis

export interface DeviggingResult {
  originalImpliedProb: number;
  fairProbability: number;
  vigRemoved: number;
  expectedValue: number;
  valueCategory: string;
  fairOdds: number;
}

/**
 * Calculate devigged fair probability and EV for display
 * Uses our exact mathematical specifications
 */
export function calculateDeviggingDisplay(
  americanOdds: number,
  marketType: string = 'moneyline'
): DeviggingResult {
  // Step 1: Convert American odds to implied probability using our exact formula
  const impliedProb = americanOdds > 0 
    ? 100 / (americanOdds + 100)
    : (-americanOdds) / ((-americanOdds) + 100);

  // Step 2: Estimate vig based on market type
  let vigPerSide: number;
  switch (marketType.toLowerCase()) {
    case 'moneyline':
      vigPerSide = 0.020; // ~2% per side (4% total overround)
      break;
    case 'spread':
    case 'total':
      vigPerSide = 0.0227; // ~2.27% per side (4.54% total, standard -110 both sides)
      break;
    default:
      vigPerSide = 0.025; // Default 2.5% per side
  }

  // Step 3: Remove vig to get fair probability
  const fairProb = Math.max(0.01, Math.min(0.99, impliedProb - vigPerSide));

  // Step 4: Calculate expected value
  // EV = (Fair Probability × Payout) - 1
  // Payout for American odds: positive odds = odds/100, negative odds = 100/|odds|
  const payout = americanOdds > 0 ? americanOdds / 100 : 100 / Math.abs(americanOdds);
  const expectedValue = (fairProb * (1 + payout)) - 1;
  const evPercentage = expectedValue * 100;

  // Step 5: Convert fair probability back to American odds
  const fairOdds = fairProb >= 0.5 
    ? Math.round(-fairProb / (1 - fairProb) * 100)
    : Math.round((1 - fairProb) / fairProb * 100);

  // Step 6: Categorize value
  let valueCategory: string;
  if (evPercentage >= 5) valueCategory = 'Excellent Value';
  else if (evPercentage >= 3) valueCategory = 'Strong +EV';
  else if (evPercentage >= 1) valueCategory = 'Good Value';
  else if (evPercentage >= 0) valueCategory = 'Slight Edge';
  else if (evPercentage >= -5) valueCategory = 'Near Fair';
  else valueCategory = 'Below Market';

  return {
    originalImpliedProb: impliedProb,
    fairProbability: fairProb,
    vigRemoved: vigPerSide,
    expectedValue: evPercentage,
    valueCategory,
    fairOdds
  };
}

/**
 * Quick helper for display formatting
 */
export function formatProbability(prob: number): string {
  return `${(prob * 100).toFixed(1)}%`;
}

/**
 * Quick helper for odds formatting
 */
export function formatOdds(odds: number): string {
  return odds > 0 ? `+${odds}` : `${odds}`;
}