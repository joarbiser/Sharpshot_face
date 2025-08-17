import { Router } from 'express';
import { LaunchValidationService } from '../launchValidation';
import { BettingDataService } from '../bettingDataService';

const router = Router();
const bettingService = new BettingDataService();

// 🚨 REAL-TIME ODDS ACCURACY ENDPOINT
router.get('/odds-accuracy', async (req, res) => {
  try {
    console.log('🔍 ACCURACY CHECK: Performing real-time odds validation...');
    
    const [liveOpportunities, upcomingOpportunities] = await Promise.all([
      bettingService.getLiveBettingOpportunities().catch(() => []),
      bettingService.getUpcomingBettingOpportunities().catch(() => [])
    ]);
    
    const allOpportunities = [...liveOpportunities, ...upcomingOpportunities];
    
    // Validate data freshness (30-second tolerance)
    const now = Date.now();
    const staleCutoff = now - (30 * 1000); // 30 seconds ago
    
    const freshnessReport = allOpportunities.map(opp => {
      const oppTime = opp.gameTime ? new Date(opp.gameTime).getTime() : now;
      const age = (now - oppTime) / 1000;
      
      return {
        id: opp.id,
        game: opp.game,
        isFresh: age <= 30,
        ageSeconds: age,
        oddsCount: opp.oddsComparison ? opp.oddsComparison.length : 0
      };
    });
    
    const staleData = freshnessReport.filter(report => !report.isFresh);
    const freshData = freshnessReport.filter(report => report.isFresh);
    
    // Validate odds integrity
    const oddsValidation = allOpportunities.map(opp => {
      const validation = LaunchValidationService.validateBettingOpportunity(opp);
      return {
        id: opp.id,
        game: opp.game,
        isValid: validation.isValid,
        errors: validation.errors,
        sportsbookCount: opp.oddsComparison ? opp.oddsComparison.length : 0
      };
    });
    
    const invalidOpportunities = oddsValidation.filter(val => !val.isValid);
    
    res.json({
      timestamp: new Date().toISOString(),
      dataFreshness: {
        total: allOpportunities.length,
        fresh: freshData.length,
        stale: staleData.length,
        freshnessPercentage: (freshData.length / allOpportunities.length) * 100,
        staleData: staleData.slice(0, 10) // Limit for response size
      },
      oddsAccuracy: {
        total: allOpportunities.length,
        valid: oddsValidation.length - invalidOpportunities.length,
        invalid: invalidOpportunities.length,
        accuracyPercentage: ((oddsValidation.length - invalidOpportunities.length) / oddsValidation.length) * 100,
        invalidOpportunities: invalidOpportunities.slice(0, 10)
      },
      systemHealth: {
        avgSportsbooksPerGame: allOpportunities.reduce((sum, opp) => 
          sum + (opp.oddsComparison ? opp.oddsComparison.length : 0), 0) / allOpportunities.length,
        liveGames: liveOpportunities.length,
        upcomingGames: upcomingOpportunities.length
      }
    });
    
  } catch (error) {
    console.error('🚨 ACCURACY CHECK FAILED:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Data accuracy check failed',
      timestamp: new Date().toISOString()
    });
  }
});

// 🚨 SPORTSBOOK COVERAGE ANALYSIS
router.get('/sportsbook-coverage', async (req, res) => {
  try {
    console.log('📊 COVERAGE ANALYSIS: Analyzing sportsbook coverage...');
    
    const allOpportunities = await bettingService.getUpcomingBettingOpportunities();
    
    // Analyze sportsbook coverage across all opportunities
    const sportsbookCoverage = new Map<string, number>();
    const gameCount = new Map<string, Set<string>>();
    
    allOpportunities.forEach(opp => {
      if (opp.oddsComparison) {
        opp.oddsComparison.forEach(odds => {
          const book = odds.sportsbook;
          sportsbookCoverage.set(book, (sportsbookCoverage.get(book) || 0) + 1);
          
          if (!gameCount.has(book)) gameCount.set(book, new Set());
          gameCount.get(book)!.add(opp.game);
        });
      }
    });
    
    const coverageReport = Array.from(sportsbookCoverage.entries())
      .map(([book, opportunityCount]) => ({
        sportsbook: book,
        opportunityCount,
        gamesCovered: gameCount.get(book)?.size || 0,
        coveragePercentage: (opportunityCount / allOpportunities.length) * 100
      }))
      .sort((a, b) => b.opportunityCount - a.opportunityCount);
    
    const topBooks = coverageReport.slice(0, 10);
    const totalBooks = coverageReport.length;
    const avgOpportunitiesPerBook = allOpportunities.length > 0 ? 
      Array.from(sportsbookCoverage.values()).reduce((sum, count) => sum + count, 0) / totalBooks : 0;
    
    res.json({
      timestamp: new Date().toISOString(),
      totalSportsbooks: totalBooks,
      totalOpportunities: allOpportunities.length,
      avgOpportunitiesPerBook: Math.round(avgOpportunitiesPerBook * 100) / 100,
      topCoverage: topBooks,
      minimumRequirement: {
        required: 20,
        actual: totalBooks,
        meetsRequirement: totalBooks >= 20
      }
    });
    
  } catch (error) {
    console.error('🚨 COVERAGE ANALYSIS FAILED:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Coverage analysis failed',
      timestamp: new Date().toISOString()
    });
  }
});

export default router;