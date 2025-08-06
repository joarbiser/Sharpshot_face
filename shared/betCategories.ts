// Bet category types and classification utilities
export type BetCategory = 'ev' | 'arbitrage' | 'middling' | 'all';

export interface CategorizedBettingOpportunity {
  category: BetCategory;
  arbitrageProfit?: number; // For arbitrage bets
  middlingRange?: { min: number; max: number }; // For middling bets
}

// Classification logic for betting opportunities
export class BetCategorizer {
  
  /**
   * Classify a betting opportunity into categories
   */
  static categorizeBet(opportunity: any): BetCategory {
    // +EV Classification (Primary)
    if (opportunity.ev > 0) {
      // Check for arbitrage opportunity
      if (this.isArbitrageOpportunity(opportunity)) {
        return 'arbitrage';
      }
      
      // Check for middling opportunity  
      if (this.isMiddlingOpportunity(opportunity)) {
        return 'middling';
      }
      
      // Regular +EV opportunity
      return 'ev';
    }
    
    return 'ev'; // Default category
  }

  /**
   * Check if this is an arbitrage opportunity
   * Arbitrage: When you can bet on all outcomes and guarantee profit
   */
  private static isArbitrageOpportunity(opportunity: any): boolean {
    if (!opportunity.oddsComparison || opportunity.oddsComparison.length < 2) {
      return false;
    }

    // For arbitrage, we need odds that allow guaranteed profit regardless of outcome
    // This typically happens with significant odds discrepancies between books
    const odds = opportunity.oddsComparison.map((comp: any) => comp.odds);
    const maxOdds = Math.max(...odds);
    const minOdds = Math.min(...odds);
    
    // Arbitrage threshold: significant odds gap (simplified detection)
    const oddsGap = Math.abs(maxOdds - minOdds);
    const isSignificantGap = oddsGap > 50; // 50+ point difference
    const hasHighEV = opportunity.ev > 8; // High EV often indicates arbitrage
    
    return isSignificantGap && hasHighEV;
  }

  /**
   * Check if this is a middling opportunity
   * Middling: When point spreads/totals from different books create win-win scenarios
   */
  private static isMiddlingOpportunity(opportunity: any): boolean {
    if (!opportunity.oddsComparison || opportunity.oddsComparison.length < 2) {
      return false;
    }

    // Middling typically applies to spreads and totals
    const isSpreadOrTotal = opportunity.betType === 'Point Spread' || 
                           opportunity.betType === 'Total' || 
                           opportunity.betType === 'Run Line' ||
                           opportunity.betType === 'Puck Line';
    
    if (!isSpreadOrTotal) {
      return false;
    }

    // Check for line differences that could create middling opportunities
    const odds = opportunity.oddsComparison.map((comp: any) => comp.odds);
    const avgOdds = odds.reduce((sum: number, odd: number) => sum + odd, 0) / odds.length;
    
    // Middling indicators: moderate EV with line movement potential
    const hasModerateEV = opportunity.ev >= 3 && opportunity.ev <= 12;
    const hasLineMovement = Math.abs(opportunity.mainBookOdds - avgOdds) > 20;
    
    return hasModerateEV && hasLineMovement;
  }

  /**
   * Calculate potential arbitrage profit
   */
  static calculateArbitrageProfit(opportunity: any): number {
    if (!this.isArbitrageOpportunity(opportunity)) {
      return 0;
    }

    // Simplified arbitrage profit calculation
    // In practice, this would involve more complex calculations
    const baseProfit = opportunity.ev * 0.1; // Convert EV% to profit estimate
    return Math.round(baseProfit * 100) / 100;
  }

  /**
   * Get category display information
   */
  static getCategoryInfo(category: BetCategory) {
    const categoryInfo = {
      ev: {
        label: '+EV',
        description: 'Positive Expected Value opportunities',
        color: 'green',
        icon: '📈'
      },
      arbitrage: {
        label: 'Arbitrage',
        description: 'Guaranteed profit opportunities across multiple books',
        color: 'blue', 
        icon: '🔄'
      },
      middling: {
        label: 'Middling',
        description: 'Win-win scenarios with line differences',
        color: 'purple',
        icon: '🎯'
      },
      all: {
        label: 'All Bets',
        description: 'Show all betting opportunities',
        color: 'gray',
        icon: '📊'
      }
    };

    return categoryInfo[category];
  }

  /**
   * Get category statistics for display
   */
  static getCategoryStats(opportunities: any[]): Record<BetCategory, number> {
    const stats = {
      all: opportunities.length,
      ev: 0,
      arbitrage: 0,
      middling: 0
    };

    opportunities.forEach(opp => {
      const category = this.categorizeBet(opp);
      stats[category]++;
    });

    return stats;
  }
}