// server/tradingMathService.ts
// Minimal integration of trading math library into the server pipeline

import { processLiveOpportunitiesData, AnyResult } from "../src/lib/tradingMath";

export class TradingMathService {
  
  // Process real betting data with trading math calculations
  processLiveBettingData(gameData: any[]): {
    opportunities: AnyResult[];
    stats: {
      totalGames: number;
      totalOpportunities: number;
      evCount: number;
      arbCount: number;
      middleCount: number;
      booksScanned: number;
    };
  } {
    console.log('Processing live betting data with trading math...');
    
    const opportunities = processLiveOpportunitiesData(gameData);
    
    // Calculate stats
    const stats = {
      totalGames: gameData.length,
      totalOpportunities: opportunities.length,
      evCount: opportunities.filter(o => o.kind === 'EV').length,
      arbCount: opportunities.filter(o => o.kind === 'Arb2' || o.kind === 'Arb3').length,
      middleCount: opportunities.filter(o => o.kind === 'Middle').length,
      booksScanned: this.extractUniqueBooksCount(gameData)
    };
    
    console.log(`Trading math analysis: ${stats.totalOpportunities} opportunities from ${stats.totalGames} games`);
    return { opportunities, stats };
  }

  // Helper to extract unique sportsbook count from game data
  private extractUniqueBooksCount(gameData: any[]): number {
    const uniqueBooks = new Set<string>();
    
    for (const game of gameData) {
      if (!game.markets) continue;
      
      for (const market of game.markets) {
        for (const outcome of market.outcomes || []) {
          for (const book of outcome.books || []) {
            if (book.bookId) {
              uniqueBooks.add(book.bookId);
            }
          }
        }
      }
    }
    
    return uniqueBooks.size;
  }

  // Convert trading math results to existing UI format  
  convertOpportunityToUIFormat(opportunity: AnyResult, sport: string = 'mixed'): any {
    const baseFormat = {
      id: this.generateOpportunityId(opportunity),
      gameId: opportunity.gameId,
      type: opportunity.kind.toLowerCase(),
      sport: sport,
      status: 'live',
      lastUpdated: new Date().toISOString()
    };

    switch (opportunity.kind) {
      case 'EV':
        return {
          ...baseFormat,
          sportsbook: opportunity.bookId,
          odds: opportunity.priceAmerican,
          evPercent: opportunity.evPct,
          fairPrice: opportunity.fairAmerican,
          fairDecimal: opportunity.fairDecimal,
          impliedProbability: (opportunity.fairProb * 100).toFixed(1),
          sampleSize: opportunity.sampleSize,
          market: opportunity.outcome.market,
          side: opportunity.outcome.side,
          line: 'line' in opportunity.outcome ? opportunity.outcome.line : undefined
        };

      case 'Arb2':
        return {
          ...baseFormat,
          market: opportunity.market,
          line: opportunity.line,
          legA: {
            sportsbook: opportunity.legA.bookId,
            odds: opportunity.legA.priceAmerican,
            decimal: opportunity.legA.decimal
          },
          legB: {
            sportsbook: opportunity.legB.bookId,
            odds: opportunity.legB.priceAmerican,
            decimal: opportunity.legB.decimal
          },
          roiPercent: opportunity.roiPct,
          impliedSum: opportunity.impliedSumPct,
          stakeSplit: opportunity.stakeSplit,
          pushRisk: opportunity.pushRisk
        };

      case 'Arb3':
        return {
          ...baseFormat,
          market: 'moneyline-3way',
          legs: opportunity.legs,
          roiPercent: opportunity.roiPct,
          impliedSum: opportunity.impliedSumPct,
          stakeSplit: opportunity.stakeSplit
        };

      case 'Middle':
        return {
          ...baseFormat,
          market: opportunity.market,
          middleSize: opportunity.middleSize,
          width: opportunity.width,
          worstCaseLoss: opportunity.worstCaseLoss,
          bestCaseProfit: opportunity.bestCaseProfit,
          stakeSplit: opportunity.stakeSplit,
          pushRisk: opportunity.pushRisk,
          ...(opportunity.market === 'total' ? {
            over: opportunity.over,
            under: opportunity.under
          } : {
            homeSide: opportunity.homeSide,
            awaySide: opportunity.awaySide
          })
        };
    }
  }

  // Generate consistent opportunity IDs
  private generateOpportunityId(opportunity: AnyResult): string {
    const timestamp = Date.now();
    switch (opportunity.kind) {
      case 'EV':
        return `ev_${opportunity.gameId}_${opportunity.bookId}_${timestamp}`;
      case 'Arb2':
        return `arb2_${opportunity.gameId}_${opportunity.legA.bookId}_${opportunity.legB.bookId}_${timestamp}`;
      case 'Arb3':
        return `arb3_${opportunity.gameId}_${opportunity.legs.map(l => l.bookId).join('_')}_${timestamp}`;
      case 'Middle':
        return `middle_${opportunity.gameId}_${opportunity.market}_${timestamp}`;
    }
  }

  // Filter opportunities by category for UI
  filterOpportunitiesByCategory(
    opportunities: AnyResult[], 
    category: 'all' | 'ev' | 'arbitrage' | 'middling'
  ): AnyResult[] {
    switch (category) {
      case 'ev':
        return opportunities.filter(o => o.kind === 'EV');
      case 'arbitrage':
        return opportunities.filter(o => o.kind === 'Arb2' || o.kind === 'Arb3');
      case 'middling':
        return opportunities.filter(o => o.kind === 'Middle');
      default:
        return opportunities;
    }
  }
}

export const tradingMathService = new TradingMathService();