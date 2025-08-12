// Preset Terminal types and utilities for Sharp Shot
export interface BettingPreset {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  createdBy: string;
  createdAt: string;
  lastUsed?: string;
  filters: PresetFilters;
  bookWeighting: BookWeighting;
  performance?: PresetPerformance;
}

export interface PresetFilters {
  sports: string[]; // ['NBA', 'NFL', 'MLB', 'NHL'] or ['all']
  categories: string[]; // ['ev', 'arbitrage', 'middling'] or ['all']
  minEV: number;
  maxEV?: number;
  oddsRange: {
    min: number;
    max: number;
  };
  sportsbooks: string[];
  markets: string[]; // ['Player Props', 'Game Props', 'Futures']
  minProbability?: number;
  maxProbability?: number;
  timeframe: 'today' | 'week' | 'month';
}

export interface BookWeighting {
  [sportsbook: string]: number; // Weight from 0.1 to 2.0
}

export interface PresetPerformance {
  totalBets: number;
  wins: number;
  losses: number;
  winRate: number;
  avgEV: number;
  totalProfit: number;
  roi: number;
  lastUpdated: string;
}

// Default book weightings based on Sharp Shot's recommended sharp books
export const DEFAULT_BOOK_WEIGHTS: BookWeighting = {
  'Pinnacle': 1.8,      // Sharpest book
  'Circa': 1.6,         // Sharp Vegas book
  'FanDuel': 1.3,       // Major market maker
  'DraftKings': 1.3,    // Major market maker
  'BetMGM': 1.2,        // Established book
  'Caesars': 1.2,       // Established book
  'PointsBet': 1.1,     // Decent liquidity
  'BetRivers': 1.0,     // Standard weight
  'ESPNBET': 1.0,       // Standard weight
  'Fanatics': 0.9,      // Newer book
  'BetOnline': 0.8,     // Offshore
  'Bovada': 0.8,        // Offshore
  'PuntNow': 0.7,       // Smaller book
  'Sportszino': 0.7,    // Smaller book
  'SportTrade': 0.6     // Exchange model
};

// Built-in Sharp Shot presets
export const BUILTIN_PRESETS: BettingPreset[] = [
  {
    id: 'high-value-ev',
    name: 'High Value +EV',
    description: 'Premium +EV opportunities with strong edge (5%+ EV)',
    isPublic: true,
    createdBy: 'Sharp Shot',
    createdAt: '2025-01-01T00:00:00Z',
    filters: {
      sports: ['all'],
      categories: ['ev'],
      minEV: 5,
      oddsRange: { min: -200, max: 200 },
      sportsbooks: ['all'],
      markets: ['all'],
      timeframe: 'today'
    },
    bookWeighting: DEFAULT_BOOK_WEIGHTS
  },
  {
    id: 'arbitrage-hunter',
    name: 'Arbitrage Hunter',
    description: 'Guaranteed profit opportunities across multiple sportsbooks',
    isPublic: true,
    createdBy: 'Sharp Shot',
    createdAt: '2025-01-01T00:00:00Z',
    filters: {
      sports: ['all'],
      categories: ['arbitrage'],
      minEV: 0,
      oddsRange: { min: -300, max: 300 },
      sportsbooks: ['all'],
      markets: ['all'],
      timeframe: 'today'
    },
    bookWeighting: DEFAULT_BOOK_WEIGHTS
  },
  {
    id: 'nfl-middling',
    name: 'NFL Middling Pro',
    description: 'NFL spread and total middling opportunities',
    isPublic: true,
    createdBy: 'Sharp Shot',
    createdAt: '2025-01-01T00:00:00Z',
    filters: {
      sports: ['NFL'],
      categories: ['middling'],
      minEV: 3,
      oddsRange: { min: -130, max: 130 },
      sportsbooks: ['all'],
      markets: ['Point Spread', 'Total Points'],
      timeframe: 'today'
    },
    bookWeighting: DEFAULT_BOOK_WEIGHTS
  },
  {
    id: 'player-props-ev',
    name: 'Player Props Edge',
    description: 'High-edge player prop opportunities across major sports',
    isPublic: true,
    createdBy: 'Sharp Shot',
    createdAt: '2025-01-01T00:00:00Z',
    filters: {
      sports: ['NBA', 'NFL', 'MLB'],
      categories: ['ev'],
      minEV: 4,
      oddsRange: { min: -150, max: 150 },
      sportsbooks: ['all'],
      markets: ['Player Props'],
      timeframe: 'today'
    },
    bookWeighting: DEFAULT_BOOK_WEIGHTS
  }
];

// Preset utility functions
export class PresetManager {
  /**
   * Apply preset filters to opportunities
   */
  static applyPresetFilters(opportunities: any[], preset: BettingPreset): any[] {
    return opportunities.filter(opp => {
      // Sport filter
      if (!preset.filters.sports.includes('all') && !preset.filters.sports.includes(opp.sport)) {
        return false;
      }

      // Category filter
      if (!preset.filters.categories.includes('all') && !preset.filters.categories.includes(opp.category)) {
        return false;
      }

      // EV filter
      if (opp.ev < preset.filters.minEV) {
        return false;
      }
      if (preset.filters.maxEV && opp.ev > preset.filters.maxEV) {
        return false;
      }

      // Odds filter
      if (opp.mainBookOdds < preset.filters.oddsRange.min || opp.mainBookOdds > preset.filters.oddsRange.max) {
        return false;
      }

      // Sportsbook filter
      if (!preset.filters.sportsbooks.includes('all')) {
        const hasRequiredBook = opp.oddsComparison?.some((book: any) => 
          preset.filters.sportsbooks.includes(book.sportsbook)
        );
        if (!hasRequiredBook) {
          return false;
        }
      }

      // Market filter
      if (!preset.filters.markets.includes('all') && !preset.filters.markets.includes(opp.market)) {
        return false;
      }

      return true;
    });
  }

  /**
   * Calculate weighted true odds using book weighting
   */
  static calculateWeightedOdds(oddsComparison: any[], bookWeighting: BookWeighting): number {
    let weightedSum = 0;
    let totalWeight = 0;

    for (const book of oddsComparison) {
      const weight = bookWeighting[book.sportsbook] || 1.0;
      const impliedProb = this.calculateImpliedProbability(book.odds);
      
      weightedSum += impliedProb * weight;
      totalWeight += weight;
    }

    const weightedProb = weightedSum / totalWeight;
    return this.probabilityToOdds(weightedProb);
  }

  /**
   * Convert implied probability to American odds
   */
  private static probabilityToOdds(probability: number): number {
    if (probability >= 0.5) {
      return Math.round(-(probability / (1 - probability)) * 100);
    } else {
      return Math.round(((1 - probability) / probability) * 100);
    }
  }

  /**
   * Calculate implied probability from American odds
   */
  private static calculateImpliedProbability(odds: number): number {
    if (odds > 0) {
      return 100 / (odds + 100);
    } else {
      return Math.abs(odds) / (Math.abs(odds) + 100);
    }
  }

  /**
   * Create a new preset
   */
  static createPreset(name: string, description: string, filters: PresetFilters, bookWeighting: BookWeighting, isPublic: boolean = false): BettingPreset {
    return {
      id: `preset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      description,
      isPublic,
      createdBy: 'User',
      createdAt: new Date().toISOString(),
      filters,
      bookWeighting
    };
  }

  /**
   * Clone an existing preset
   */
  static clonePreset(preset: BettingPreset, newName?: string): BettingPreset {
    return {
      ...preset,
      id: `preset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: newName || `${preset.name} (Copy)`,
      createdBy: 'User',
      createdAt: new Date().toISOString(),
      isPublic: false,
      lastUsed: undefined,
      performance: undefined
    };
  }

  /**
   * Update preset performance statistics
   */
  static updatePresetPerformance(preset: BettingPreset, betResult: { won: boolean; ev: number; profit: number }): BettingPreset {
    const performance = preset.performance || {
      totalBets: 0,
      wins: 0,
      losses: 0,
      winRate: 0,
      avgEV: 0,
      totalProfit: 0,
      roi: 0,
      lastUpdated: new Date().toISOString()
    };

    const newTotalBets = performance.totalBets + 1;
    const newWins = performance.wins + (betResult.won ? 1 : 0);
    const newLosses = performance.losses + (betResult.won ? 0 : 1);
    const newTotalProfit = performance.totalProfit + betResult.profit;
    const newAvgEV = ((performance.avgEV * performance.totalBets) + betResult.ev) / newTotalBets;

    return {
      ...preset,
      performance: {
        totalBets: newTotalBets,
        wins: newWins,
        losses: newLosses,
        winRate: Math.round((newWins / newTotalBets) * 10000) / 100,
        avgEV: Math.round(newAvgEV * 100) / 100,
        totalProfit: Math.round(newTotalProfit * 100) / 100,
        roi: Math.round((newTotalProfit / (newTotalBets * 100)) * 10000) / 100, // Assuming $100 average bet
        lastUpdated: new Date().toISOString()
      },
      lastUsed: new Date().toISOString()
    };
  }

  /**
   * Get preset recommendation based on user activity
   */
  static getRecommendedPresets(userPreferences: any): BettingPreset[] {
    // Simple recommendation logic - can be enhanced with ML
    const recommended = [...BUILTIN_PRESETS];
    
    if (userPreferences.favoriteEV === 'high') {
      return recommended.filter(p => p.filters.minEV >= 5);
    }
    
    if (userPreferences.riskTolerance === 'low') {
      return recommended.filter(p => p.filters.categories.includes('arbitrage'));
    }
    
    return recommended;
  }
}