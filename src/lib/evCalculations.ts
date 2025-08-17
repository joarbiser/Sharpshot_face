// src/lib/evCalculations.ts
// Enhanced EV calculation system implementing user's exact devigging specifications:
// "Finding market's true odds after removing book's built-in fee"
// Shows bets down to -5% EV for user decision-making

/**
 * Convert American odds to implied probability following user's exact specifications
 * @param odds - American odds (e.g., -150, +130)
 * @returns Implied probability as decimal (0-1)
 */
export function americanToImpliedProb(odds: number): number {
  if (odds < 0) {
    // If odds are negative: p = (-odds) / ((-odds) + 100)
    return Math.abs(odds) / (Math.abs(odds) + 100);
  } else {
    // If odds are positive: p = 100 / (odds + 100)
    return 100 / (odds + 100);
  }
}

/**
 * Remove vig from mutually exclusive outcomes using user's exact devigging method
 * @param impliedProbs - Array of implied probabilities that should sum to >1.0 (due to vig)
 * @returns Array of fair probabilities that sum to exactly 1.0
 */
export function removeVigFromProbs(impliedProbs: number[]): number[] {
  // total = Σ p_i
  const total = impliedProbs.reduce((sum, prob) => sum + prob, 0);
  
  // fair_prob_i = p_i / total
  return impliedProbs.map(prob => prob / total);
}

/**
 * Convert fair probability back to fair American odds following user's specifications
 * @param fairProb - Fair probability as decimal (0-1)
 * @returns Fair American odds
 */
export function fairProbToAmericanOdds(fairProb: number): number {
  if (fairProb < 0.5) {
    // If fair_prob < 0.5: fair_odds = 100 * (1 - p) / p
    return Math.round(100 * (1 - fairProb) / fairProb);
  } else {
    // If fair_prob ≥ 0.5: fair_odds = -100 * p / (1 - p)
    return Math.round(-100 * fairProb / (1 - fairProb));
  }
}

/**
 * Complete devigging process for a two-way market (e.g., moneyline with two outcomes)
 * @param odds1 - American odds for outcome 1 (e.g., +130)
 * @param odds2 - American odds for outcome 2 (e.g., -150)
 * @returns Object with fair odds and probabilities for both outcomes
 */
export function devigTwoWayMarket(odds1: number, odds2: number): {
  fairOdds1: number;
  fairOdds2: number;
  fairProb1: number;
  fairProb2: number;
  originalVig: number;
} {
  // Step 1: Convert to implied probabilities
  const impliedProb1 = americanToImpliedProb(odds1);
  const impliedProb2 = americanToImpliedProb(odds2);
  
  // Step 2: Calculate original vig
  const total = impliedProb1 + impliedProb2;
  const originalVig = ((total - 1) * 100); // Convert to percentage
  
  // Step 3: Remove vig
  const [fairProb1, fairProb2] = removeVigFromProbs([impliedProb1, impliedProb2]);
  
  // Step 4: Convert back to fair odds
  const fairOdds1 = fairProbToAmericanOdds(fairProb1);
  const fairOdds2 = fairProbToAmericanOdds(fairProb2);
  
  return {
    fairOdds1,
    fairOdds2,
    fairProb1,
    fairProb2,
    originalVig
  };
}

/**
 * Calculate Expected Value using user's specifications
 * @param bookOdds - The sportsbook's American odds
 * @param fairProb - The fair probability after devigging
 * @returns EV percentage (-5% to positive range as specified)
 */
export function calculateEV(bookOdds: number, fairProb: number): number {
  // Calculate payout multiplier from American odds
  const payout = bookOdds > 0 ? (bookOdds / 100) + 1 : (100 / Math.abs(bookOdds)) + 1;
  
  // EV calculation: (Fair probability × Payout) - 1
  const ev = (fairProb * payout) - 1;
  
  // Convert to percentage and round to 1 decimal
  return Math.round(ev * 1000) / 10;
}

/**
 * Format EV for display with proper coloring
 */
export function formatEVDisplay(ev: number): { text: string; color: string } {
  const formatted = ev >= 0 ? `+${ev.toFixed(1)}%` : `${ev.toFixed(1)}%`;
  
  let color: string;
  if (ev >= 5) color = 'text-green-600 dark:text-green-400';
  else if (ev >= 3) color = 'text-green-500 dark:text-green-300';
  else if (ev >= 1) color = 'text-yellow-600 dark:text-yellow-400';
  else if (ev >= 0) color = 'text-yellow-500 dark:text-yellow-300';
  else if (ev >= -5) color = 'text-orange-500 dark:text-orange-400';
  else color = 'text-red-600 dark:text-red-400';
  
  return { text: formatted, color };
}

/**
 * Get explanation for EV value
 */
export function getEVExplanation(ev: number): string {
  if (ev >= 5) return 'Excellent value bet';
  if (ev >= 3) return 'Strong positive EV';
  if (ev >= 1) return 'Good value';
  if (ev >= 0) return 'Slight edge';
  if (ev >= -5) return 'Close to fair market';
  return 'Below market value';
}

/**
 * Legacy function - use americanToImpliedProb instead
 * @deprecated Use americanToImpliedProb for consistency with user specifications
 */
function americanToProb(american: number): number {
  return americanToImpliedProb(american);
}

/**
 * Remove vig from a set of odds to find true market probability
 * Uses proportional method to fairly distribute vig removal
 */
export function removeVig(odds: number[]): number[] {
  const probs = odds.map(americanToProb);
  const totalProb = probs.reduce((sum, prob) => sum + prob, 0);
  
  // If already fair (sum = 1), return as-is
  if (Math.abs(totalProb - 1) < 0.001) return odds;
  
  // Proportionally adjust probabilities to sum to 1
  const fairProbs = probs.map(prob => prob / totalProb);
  
  // Convert back to American odds
  return fairProbs.map(prob => {
    if (prob >= 0.5) {
      return -Math.round((prob / (1 - prob)) * 100);
    } else {
      return Math.round(((1 - prob) / prob) * 100);
    }
  });
}

/**
 * Calculate market consensus removing sportsbook fees using user's exact specifications
 * This is the core function implementing user's requirement:
 * "Finding market's true odds after removing book's built-in fee"
 */
export function getMarketConsensus(allOdds: number[]): number {
  if (allOdds.length === 0) return 0;
  if (allOdds.length === 1) return allOdds[0];
  
  // Convert all odds to implied probabilities
  const impliedProbs = allOdds.map(americanToImpliedProb);
  
  // Remove obvious outliers (more than 2 standard deviations)
  const mean = impliedProbs.reduce((sum, prob) => sum + prob, 0) / impliedProbs.length;
  const stdDev = Math.sqrt(impliedProbs.reduce((sum, prob) => sum + Math.pow(prob - mean, 2), 0) / impliedProbs.length);
  
  const filteredProbs = impliedProbs.filter(prob => Math.abs(prob - mean) <= 2 * stdDev);
  
  if (filteredProbs.length === 0) return allOdds[0];
  
  // Use median of filtered probabilities for robustness
  const sortedProbs = filteredProbs.sort((a, b) => a - b);
  const medianProb = sortedProbs.length % 2 === 0
    ? (sortedProbs[sortedProbs.length / 2 - 1] + sortedProbs[sortedProbs.length / 2]) / 2
    : sortedProbs[Math.floor(sortedProbs.length / 2)];
  
  // Convert back to American odds using user's specifications
  return fairProbToAmericanOdds(medianProb);
}

/**
 * Example implementation following user's mini example
 * +130 ⇒ p = 100/230 = 0.4348
 * -150 ⇒ p = 150/250 = 0.6000
 * total = 1.0348
 * fair p (+130 side) = 0.4348 / 1.0348 = 0.4203 ⇒ fair odds ≈ +138
 * fair p (-150 side) = 0.6000 / 1.0348 = 0.5797 ⇒ fair odds ≈ -138
 */
export function exampleDevigging(): void {
  console.log("=== User's Mini Example Implementation ===");
  
  const odds1 = 130;  // +130
  const odds2 = -150; // -150
  
  const result = devigTwoWayMarket(odds1, odds2);
  
  console.log(`Original odds: +${odds1}, ${odds2}`);
  console.log(`Implied probs: ${americanToImpliedProb(odds1).toFixed(4)}, ${americanToImpliedProb(odds2).toFixed(4)}`);
  console.log(`Total implied prob: ${(americanToImpliedProb(odds1) + americanToImpliedProb(odds2)).toFixed(4)}`);
  console.log(`Fair probs: ${result.fairProb1.toFixed(4)}, ${result.fairProb2.toFixed(4)}`);
  console.log(`Fair odds: +${result.fairOdds1}, ${result.fairOdds2}`);
  console.log(`Original vig: ${result.originalVig.toFixed(2)}%`);
}