// src/lib/opportunityUtils.ts
// Utility functions for processing betting opportunities

import { BettingOpportunity } from '../../shared/schema';

/**
 * Remove duplicate opportunities based on unique combination of event and market details
 * @param opportunities - Array of betting opportunities
 * @returns Array of unique opportunities
 */
export function deduplicateOpportunities(opportunities: BettingOpportunity[]): BettingOpportunity[] {
  // Remove duplicates based on unique combination
  const uniqueOpportunities = opportunities.filter((opp, index, arr) => {
    const key = `${opp.event?.home}-${opp.event?.away}-${opp.market?.type}-${opp.market?.side}-${opp.market?.line}`;
    return arr.findIndex(o => 
      `${o.event?.home}-${o.event?.away}-${o.market?.type}-${o.market?.side}-${o.market?.line}` === key
    ) === index;
  });

  return uniqueOpportunities;
}

/**
 * Validate opportunity data structure
 * @param opportunity - Betting opportunity to validate
 * @returns boolean indicating if opportunity is valid
 */
export function validateOpportunity(opportunity: BettingOpportunity): boolean {
  // Check required fields
  if (!opportunity.id || !opportunity.event || !opportunity.market || !opportunity.myPrice) {
    return false;
  }

  // Check event fields
  if (!opportunity.event.home || !opportunity.event.away || !opportunity.event.sport) {
    return false;
  }

  // Check market fields
  if (!opportunity.market.type || !opportunity.market.side) {
    return false;
  }

  // Check price fields
  if (!opportunity.myPrice.odds || !opportunity.myPrice.book) {
    return false;
  }

  return true;
}

/**
 * Sort opportunities by EV percentage (highest first)
 * @param opportunities - Array of betting opportunities
 * @returns Sorted array of opportunities
 */
export function sortOpportunitiesByEV(opportunities: BettingOpportunity[]): BettingOpportunity[] {
  return opportunities.sort((a, b) => {
    const aEV = a.evPercent || a.ev || 0;
    const bEV = b.evPercent || b.ev || 0;
    return bEV - aEV;
  });
}

/**
 * Filter opportunities by minimum EV percentage
 * @param opportunities - Array of betting opportunities
 * @param minEV - Minimum EV percentage threshold
 * @returns Filtered array of opportunities
 */
export function filterOpportunitiesByEV(opportunities: BettingOpportunity[], minEV: number): BettingOpportunity[] {
  return opportunities.filter(opp => {
    const ev = opp.evPercent || opp.ev || 0;
    return ev >= minEV;
  });
}

/**
 * Group opportunities by sport
 * @param opportunities - Array of betting opportunities
 * @returns Object with sport as key and opportunities as value
 */
export function groupOpportunitiesBySport(opportunities: BettingOpportunity[]): Record<string, BettingOpportunity[]> {
  return opportunities.reduce((groups, opp) => {
    const sport = opp.event?.sport || opp.sport || 'Unknown';
    if (!groups[sport]) {
      groups[sport] = [];
    }
    groups[sport].push(opp);
    return groups;
  }, {} as Record<string, BettingOpportunity[]>);
}

/**
 * Get unique market types from opportunities
 * @param opportunities - Array of betting opportunities
 * @returns Array of unique market types
 */
export function getUniqueMarketTypes(opportunities: BettingOpportunity[]): string[] {
  const marketTypes = new Set(
    opportunities.map(opp => opp.market?.type || opp.bet || 'Unknown')
  );
  return Array.from(marketTypes);
}

/**
 * Format opportunity key for deduplication or comparison
 * @param opportunity - Betting opportunity
 * @returns Formatted key string
 */
export function createOpportunityKey(opportunity: BettingOpportunity): string {
  return `${opportunity.event?.home || ''}-${opportunity.event?.away || ''}-${opportunity.market?.type || ''}-${opportunity.market?.side || ''}-${opportunity.market?.line || ''}`;
}

/**
 * Format bet type properly for display
 * @param side - Market side (home, away, over, under)
 * @param type - Market type (moneyline, spread, total)
 * @param line - Line value for spreads and totals
 * @returns Formatted bet type string
 */
export function formatBetType(side: string, type: string, line?: number): string {
  const typeLC = type.toLowerCase();
  
  if (typeLC === 'moneyline') {
    return side === 'home' ? 'Home ML' : 'Away ML';
  }
  
  if (typeLC === 'spread' || typeLC === 'point spread') {
    if (line !== undefined) {
      return side === 'home' ? `Home ${line > 0 ? '+' : ''}${line}` : `Away ${line > 0 ? '+' : ''}${line}`;
    }
    return side === 'home' ? 'Home Spread' : 'Away Spread';
  }
  
  if (typeLC === 'total' || typeLC === 'over/under') {
    if (line !== undefined) {
      return side === 'over' ? `Over ${line}` : `Under ${line}`;
    }
    return side === 'over' ? 'Over' : 'Under';
  }
  
  return `${side} ${type}`;
}

/**
 * Get sport name from league string
 * @param league - League identifier string
 * @returns Standardized sport name
 */
export function getSportName(league: string): string {
  const leagueLower = league.toLowerCase();
  
  if (leagueLower.includes('nfl') || leagueLower.includes('football')) return 'Football';
  if (leagueLower.includes('nba') || leagueLower.includes('basketball')) return 'Basketball';
  if (leagueLower.includes('mlb') || leagueLower.includes('baseball')) return 'Baseball';
  if (leagueLower.includes('nhl') || leagueLower.includes('hockey')) return 'Hockey';
  if (leagueLower.includes('soccer') || leagueLower.includes('fifa') || leagueLower.includes('uefa')) return 'Soccer';
  if (leagueLower.includes('tennis')) return 'Tennis';
  if (leagueLower.includes('golf')) return 'Golf';
  if (leagueLower.includes('mma') || leagueLower.includes('ufc')) return 'MMA';
  if (leagueLower.includes('boxing')) return 'Boxing';
  if (leagueLower.includes('racing') || leagueLower.includes('f1') || leagueLower.includes('nascar')) return 'Racing';
  if (leagueLower.includes('esports') || leagueLower.includes('lol') || leagueLower.includes('csgo')) return 'Esports';
  
  return league;
}