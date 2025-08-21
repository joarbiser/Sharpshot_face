// src/lib/opportunityUtils.ts
// Utility functions for processing betting opportunities

import type { BettingOpportunity } from '../../shared/schema';

/**
 * Remove duplicate opportunities based on sportsbook and market
 */
export function deduplicateOpportunities(opportunities: any[]): any[] {
  const seen = new Set();
  
  return opportunities.filter(opp => {
    const key = `${opp.id || ''}-${opp.myPrice?.book || ''}-${opp.market?.type || ''}-${opp.market?.side || ''}`;
    
    if (seen.has(key)) {
      return false;
    }
    
    seen.add(key);
    return true;
  });
}

/**
 * Format bet type for display
 */
export function formatBetType(side: string, type: string, line?: number): string {
  const typeLC = type.toLowerCase();
  
  if (typeLC === 'moneyline' || typeLC === 'ml') {
    return side === 'home' ? 'Home ML' : 'Away ML';
  }
  
  if (typeLC === 'spread' || typeLC === 'point spread') {
    if (line !== undefined) {
      return side === 'home' ? `Home ${line > 0 ? '+' : ''}${line}` : `Away ${line > 0 ? '+' : ''}${line}`;
    }
    return side === 'home' ? 'Home Spread' : 'Away Spread';
  }
  
  if (typeLC === 'total' || typeLC === 'over/under' || typeLC === 'ou') {
    if (line !== undefined) {
      return side === 'over' ? `Over ${line}` : `Under ${line}`;
    }
    return side === 'over' ? 'Over' : 'Under';
  }
  
  // Default formatting
  return `${side.charAt(0).toUpperCase() + side.slice(1)} ${type}`;
}

/**
 * Get sport name from league identifier
 */
export function getSportName(league: string): string {
  if (!league) return 'Unknown';
  
  const leagueLower = league.toLowerCase();
  
  // Football
  if (leagueLower.includes('nfl') || leagueLower.includes('ncaaf') || leagueLower.includes('football')) {
    return 'Football';
  }
  
  // Basketball
  if (leagueLower.includes('nba') || leagueLower.includes('ncaab') || leagueLower.includes('basketball')) {
    return 'Basketball';
  }
  
  // Baseball
  if (leagueLower.includes('mlb') || leagueLower.includes('baseball')) {
    return 'Baseball';
  }
  
  // Hockey
  if (leagueLower.includes('nhl') || leagueLower.includes('hockey')) {
    return 'Hockey';
  }
  
  // Soccer
  if (leagueLower.includes('soccer') || leagueLower.includes('mls') || leagueLower.includes('fifa') || 
      leagueLower.includes('uefa') || leagueLower.includes('epl') || leagueLower.includes('premier league')) {
    return 'Soccer';
  }
  
  // Tennis
  if (leagueLower.includes('tennis') || leagueLower.includes('atp') || leagueLower.includes('wta')) {
    return 'Tennis';
  }
  
  // Golf
  if (leagueLower.includes('golf') || leagueLower.includes('pga')) {
    return 'Golf';
  }
  
  // MMA/UFC
  if (leagueLower.includes('mma') || leagueLower.includes('ufc')) {
    return 'MMA';
  }
  
  // Boxing
  if (leagueLower.includes('boxing')) {
    return 'Boxing';
  }
  
  // Racing
  if (leagueLower.includes('racing') || leagueLower.includes('f1') || leagueLower.includes('nascar')) {
    return 'Racing';
  }
  
  // Esports
  if (leagueLower.includes('esports') || leagueLower.includes('lol') || leagueLower.includes('csgo') || 
      leagueLower.includes('dota')) {
    return 'Esports';
  }
  
  // Return original if no match found
  return league.charAt(0).toUpperCase() + league.slice(1);
}

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
 * Calculate implied probability from decimal odds
 */
export function impliedProbability(decimalOdds: number): number {
  return 1 / decimalOdds;
}

/**
 * Calculate expected value percentage
 */
export function calculateEV(trueWinProbability: number, decimalOdds: number, stake: number = 100): number {
  const impliedProb = impliedProbability(decimalOdds);
  const payout = decimalOdds * stake;
  const profit = payout - stake;
  
  const ev = (trueWinProbability * profit) - ((1 - trueWinProbability) * stake);
  return (ev / stake) * 100;
}

/**
 * Detect if opportunity is arbitrage
 */
export function isArbitrage(opportunities: any[]): boolean {
  if (opportunities.length < 2) return false;
  
  // Simple arbitrage detection - needs more sophisticated logic for production
  const totalImpliedProb = opportunities.reduce((sum, opp) => {
    return sum + impliedProbability(opp.myPrice?.odds || 1);
  }, 0);
  
  return totalImpliedProb < 1.0;
}

/**
 * Format currency amount
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Get EV color class based on value
 */
export function getEVColorClass(ev: number): string {
  if (ev > 10) return 'text-purple-500';
  if (ev >= 5) return 'text-green-500';
  if (ev >= 2) return 'text-emerald-500';
  if (ev >= 0) return 'text-blue-500';
  if (ev >= -5) return 'text-yellow-500';
  if (ev >= -10) return 'text-orange-500';
  return 'text-red-500';
}

/**
 * Validate opportunity data
 */
export function validateOpportunity(opportunity: any): boolean {
  return !!(
    opportunity.id &&
    opportunity.event &&
    opportunity.market &&
    opportunity.myPrice &&
    opportunity.myPrice.odds &&
    opportunity.myPrice.book
  );
}

/**
 * Sort opportunities by priority (EV, live status, etc.)
 */
export function sortOpportunities(opportunities: any[]): any[] {
  return opportunities.sort((a, b) => {
    // Live events first
    const aLive = a.event?.status === 'live' ? 1 : 0;
    const bLive = b.event?.status === 'live' ? 1 : 0;
    
    if (aLive !== bLive) {
      return bLive - aLive;
    }
    
    // Then by EV descending
    const aEV = a.evPercent || 0;
    const bEV = b.evPercent || 0;
    
    return bEV - aEV;
  });
}