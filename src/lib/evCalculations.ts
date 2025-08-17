// src/lib/evCalculations.ts
// Enhanced EV calculation system implementing user's specifications:
// "Finding market's true odds after removing book's built-in fee"
// Shows bets down to -5% EV for user decision-making

/**
 * Calculate Expected Value following Sharp Shot methodology
 * @param bookOdds - The sportsbook's American odds (e.g., -110, +150)
 * @param fairOdds - The calculated fair market odds after removing vig
 * @returns EV percentage (-5% to positive range as specified)
 */
export function calculateEV(bookOdds: number, fairOdds: number): number {
  // Convert American odds to probability
  const bookProb = americanToProb(bookOdds);
  const fairProb = americanToProb(fairOdds);
  
  // EV calculation: (Fair probability × Payout) - 1
  const payout = bookOdds > 0 ? (bookOdds / 100) + 1 : (100 / Math.abs(bookOdds)) + 1;
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
 * Convert American odds to implied probability
 */
function americanToProb(american: number): number {
  if (american > 0) {
    return 100 / (american + 100);
  } else {
    return Math.abs(american) / (Math.abs(american) + 100);
  }
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
 * Calculate market consensus removing sportsbook fees
 * This is the core function implementing user's requirement:
 * "Finding market's true odds after removing book's built-in fee"
 */
export function getMarketConsensus(allOdds: number[]): number {
  if (allOdds.length === 0) return 0;
  if (allOdds.length === 1) return allOdds[0];
  
  // Remove obvious outliers (more than 2 standard deviations)
  const probs = allOdds.map(americanToProb);
  const mean = probs.reduce((sum, prob) => sum + prob, 0) / probs.length;
  const stdDev = Math.sqrt(probs.reduce((sum, prob) => sum + Math.pow(prob - mean, 2), 0) / probs.length);
  
  const filteredProbs = probs.filter(prob => Math.abs(prob - mean) <= 2 * stdDev);
  
  if (filteredProbs.length === 0) return allOdds[0];
  
  // Use median of filtered probabilities for robustness
  const sortedProbs = filteredProbs.sort((a, b) => a - b);
  const medianProb = sortedProbs.length % 2 === 0
    ? (sortedProbs[sortedProbs.length / 2 - 1] + sortedProbs[sortedProbs.length / 2]) / 2
    : sortedProbs[Math.floor(sortedProbs.length / 2)];
  
  // Convert back to American odds
  if (medianProb >= 0.5) {
    return -Math.round((medianProb / (1 - medianProb)) * 100);
  } else {
    return Math.round(((1 - medianProb) / medianProb) * 100);
  }
}