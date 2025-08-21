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
    return arr.findIndex(o => {
      const compareKey = `${o.event?.home}-${o.event?.away}-${o.market?.type}-${o.market?.side}-${o.market?.line}`;
      return compareKey === key;
    }) === index;
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