// Bet category types and classification utilities
export type BetCategory = 'ev' | 'arbitrage' | 'middling' | 'all' | 'player_props';

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
    // Check for arbitrage opportunity first (highest priority)
    if (this.isArbitrageOpportunity(opportunity)) {
      return 'arbitrage';
    }
    
    // Check for middling opportunity  
    if (this.isMiddlingOpportunity(opportunity)) {
      return 'middling';
    }
    
    // Regular +EV opportunity (if EV > 0)
    if (opportunity.ev > 0) {
      return 'ev';
    }
    
    return 'ev'; // Default category for regular bets
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
    // More strict arbitrage detection: significant odds gaps + high implied profit
    const odds = opportunity.oddsComparison.map((comp: any) => comp.odds);
    const maxOdds = Math.max(...odds);
    const minOdds = Math.min(...odds);
    
    // Calculate implied probabilities
    const impliedProbs = odds.map(odd => this.oddsToImpliedProbability(odd));
    const totalImpliedProb = impliedProbs.reduce((sum, prob) => sum + prob, 0);
    
    // True arbitrage: when total implied probability < 1.0 (guaranteed profit)
    const isArbitrage = totalImpliedProb < 0.98; // Allow small margin for rounding
    const oddsGap = Math.abs(maxOdds - minOdds);
    const hasSignificantGap = oddsGap > 75; // Higher threshold for arbitrage
    
    return isArbitrage && hasSignificantGap;
  }

  /**
   * Convert American odds to implied probability
   */
  private static oddsToImpliedProbability(americanOdds: number): number {
    if (americanOdds > 0) {
      return 100 / (americanOdds + 100);
    } else {
      return Math.abs(americanOdds) / (Math.abs(americanOdds) + 100);
    }
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
                           opportunity.betType === 'Puck Line' ||
                           opportunity.betType === 'Goals' ||
                           opportunity.betType === 'Points';
    
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
        icon: '+EV'
      },
      arbitrage: {
        label: 'Arbitrage',
        description: 'Guaranteed profit opportunities across multiple books',
        color: 'blue', 
        icon: 'ARB'
      },
      middling: {
        label: 'Middling',
        description: 'Win-win scenarios with line differences',
        color: 'purple',
        icon: 'MID'
      },
      all: {
        label: 'All Bets',
        description: 'Show all betting opportunities',
        color: 'gray',
        icon: 'ALL'
      },
      player_props: {
        label: 'Props',
        description: 'Player proposition bets and futures',
        color: 'orange',
        icon: 'PROP'
      }
    };

    return categoryInfo[category];
  }

  /**
   * Calculate implied probability from American odds
   */
  static calculateImpliedProbability(odds: number): number {
    if (odds > 0) {
      return 100 / (odds + 100);
    } else {
      return Math.abs(odds) / (Math.abs(odds) + 100);
    }
  }

  /**
   * Calculate arbitrage stakes for guaranteed profit
   */
  static calculateArbitrageStakes(side1Odds: number, side2Odds: number, totalStake: number = 100) {
    const prob1 = this.calculateImpliedProbability(side1Odds);
    const prob2 = this.calculateImpliedProbability(side2Odds);
    const totalProb = prob1 + prob2;
    
    // Check if arbitrage is possible
    if (totalProb >= 1) {
      return null; // No arbitrage opportunity
    }
    
    const stake1 = (totalStake * prob1) / totalProb;
    const stake2 = (totalStake * prob2) / totalProb;
    const guaranteedProfit = totalStake - (stake1 + stake2);
    
    return {
      stake1: Math.round(stake1 * 100) / 100,
      stake2: Math.round(stake2 * 100) / 100,
      profit: Math.round(guaranteedProfit * 100) / 100,
      roi: Math.round((guaranteedProfit / totalStake) * 10000) / 100
    };
  }

  /**
   * Calculate middling stakes and potential outcomes
   */
  static calculateMiddlingStakes(overOdds: number, underOdds: number, totalStake: number = 100) {
    // Split stake evenly for middling
    const stakePerSide = totalStake / 2;
    
    const overPayout = stakePerSide * (overOdds > 0 ? (overOdds / 100) + 1 : (100 / Math.abs(overOdds)) + 1);
    const underPayout = stakePerSide * (underOdds > 0 ? (underOdds / 100) + 1 : (100 / Math.abs(underOdds)) + 1);
    
    return {
      overStake: stakePerSide,
      underStake: stakePerSide,
      middleWin: Math.round((overPayout + underPayout - totalStake) * 100) / 100,
      singleWin: Math.round((Math.max(overPayout, underPayout) - totalStake) * 100) / 100,
      maxLoss: -stakePerSide
    };
  }

  /**
   * Get category statistics for display
   */
  static getCategoryStats(opportunities: any[]): Record<BetCategory, number> {
    const stats = {
      all: opportunities.length,
      ev: 0,
      arbitrage: 0,
      middling: 0,
      player_props: 0
    };

    opportunities.forEach(opp => {
      let category = this.categorizeBet(opp);
      
      // Handle player props separately
      if (opp.category === 'player_props' || opp.market === 'Player Props') {
        category = 'player_props';
      }
      
      if (stats[category] !== undefined) {
        stats[category]++;
      }
    });

    return stats;
  }
}