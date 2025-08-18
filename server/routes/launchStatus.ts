import { Router } from 'express';
import { LaunchValidationService } from '../launchValidation';
import { BettingDataService } from '../bettingDataService';
import dataIntegrityRoutes from './dataIntegrity';

const router = Router();
const bettingService = new BettingDataService();

// 🚨 LAUNCH STATUS ENDPOINT - Real-time launch readiness
router.get('/launch-status', async (req, res) => {
  try {
    console.log('🚀 LAUNCH STATUS CHECK initiated...');
    
    // Fetch current system data
    const [liveOpportunities, upcomingOpportunities] = await Promise.all([
      bettingService.getLiveBettingOpportunities().catch(() => []),
      bettingService.getUpcomingBettingOpportunities().catch(() => [])
    ]);
    
    // System health metrics
    const systemHealth = {
      booksScanned: 25, // Current sportsbook count from logs
      evSignals: liveOpportunities.filter(opp => opp.category === 'ev').length,
      arbitrageOpportunities: liveOpportunities.filter(opp => opp.category === 'arbitrage').length,
      lastUpdate: new Date().toISOString()
    };
    
    // Perform comprehensive launch readiness check
    const launchCheck = LaunchValidationService.performLaunchReadinessCheck({
      liveOpportunities,
      upcomingOpportunities,
      systemHealth
    });
    
    console.log('🚀 LAUNCH STATUS REPORT:');
    launchCheck.report.forEach(line => console.log(`   ${line}`));
    
    res.json({
      isLaunchReady: launchCheck.isReady,
      systemHealth,
      dataQuality: {
        liveOpportunities: liveOpportunities.length,
        upcomingOpportunities: upcomingOpportunities.length,
        totalGamesTracked: liveOpportunities.length + upcomingOpportunities.length,
        lastValidated: new Date().toISOString()
      },
      launchReport: launchCheck.report,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('🚨 LAUNCH STATUS CHECK FAILED:', error);
    res.status(500).json({
      isLaunchReady: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

// 🚨 DATA INTEGRITY ENDPOINT - Real-time data validation
router.get('/data-integrity', async (req, res) => {
  try {
    const opportunities = await bettingService.getUpcomingBettingOpportunities();
    const validationResults = opportunities.map(opp => ({
      id: opp.id,
      game: opp.game,
      validation: LaunchValidationService.validateBettingOpportunity(opp)
    }));
    
    const failedValidations = validationResults.filter(result => !result.validation.isValid);
    
    res.json({
      totalOpportunities: opportunities.length,
      validOpportunities: validationResults.length - failedValidations.length,
      failedValidations: failedValidations.length,
      issues: failedValidations.map(result => ({
        game: result.game,
        errors: result.validation.errors
      })),
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Data integrity check failed',
      timestamp: new Date().toISOString()
    });
  }
});

// Mount data integrity routes
router.use('/data-integrity', dataIntegrityRoutes);

export default router;