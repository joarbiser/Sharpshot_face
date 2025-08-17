// server/routes/enhancedOpportunities.ts
// Enhanced betting opportunities using user's exact devigging specifications

import { Router } from 'express';
import { 
  americanToImpliedProb, 
  devigTwoWayMarket, 
  calculateEV,
  fairProbToAmericanOdds 
} from '../../src/lib/evCalculations';

const router = Router();

/**
 * Process betting opportunities with enhanced devigging
 * Following user's exact specifications for removing sportsbook vig
 */
router.post('/process-devigged-opportunities', async (req, res) => {
  try {
    const { opportunities } = req.body;
    
    if (!opportunities || !Array.isArray(opportunities)) {
      return res.status(400).json({ error: 'Invalid opportunities data' });
    }

    const enhancedOpportunities = opportunities.map(opp => {
      // Extract all odds for this market from different sportsbooks
      const allOdds = opp.sportsbooks?.map((book: any) => book.odds).filter((odds: any) => odds) || [];
      
      if (allOdds.length < 2) {
        return { ...opp, enhancedEV: null, vigInfo: null };
      }

      // For two-way markets (moneyline, spread, total), use exact devigging
      if (opp.market === 'Moneyline' && allOdds.length >= 2) {
        // Find best odds on each side
        const positiveOdds = allOdds.filter((odds: number) => odds > 0);
        const negativeOdds = allOdds.filter((odds: number) => odds < 0);
        
        if (positiveOdds.length > 0 && negativeOdds.length > 0) {
          const bestPositive = Math.max(...positiveOdds);
          const bestNegative = Math.max(...negativeOdds); // Closest to 0 is "best"
          
          // Apply user's exact devigging method
          const devigged = devigTwoWayMarket(bestPositive, bestNegative);
          
          // Calculate EV using current sportsbook odds vs fair probability
          const currentOdds = opp.sportsbooks?.[0]?.odds || allOdds[0];
          const isPositiveSide = currentOdds > 0;
          const fairProb = isPositiveSide ? devigged.fairProb1 : devigged.fairProb2;
          const enhancedEV = calculateEV(currentOdds, fairProb);
          
          return {
            ...opp,
            enhancedEV,
            vigInfo: {
              originalVig: devigged.originalVig,
              fairOdds: isPositiveSide ? devigged.fairOdds1 : devigged.fairOdds2,
              impliedProb: americanToImpliedProb(currentOdds),
              fairProb
            }
          };
        }
      }

      // For multi-sportsbook comparison, calculate consensus
      const impliedProbs = allOdds.map(americanToImpliedProb);
      const avgImpliedProb = impliedProbs.reduce((sum: number, prob: number) => sum + prob, 0) / impliedProbs.length;
      
      // Remove average vig to get fair probability
      const totalVig = (avgImpliedProb - 0.5) * 2; // Estimate for single-sided market
      const fairProb = Math.max(0.05, Math.min(0.95, avgImpliedProb - totalVig));
      
      const currentOdds = opp.sportsbooks?.[0]?.odds || allOdds[0];
      const enhancedEV = calculateEV(currentOdds, fairProb);
      
      return {
        ...opp,
        enhancedEV,
        vigInfo: {
          originalVig: totalVig * 100,
          fairOdds: fairProbToAmericanOdds(fairProb),
          impliedProb: americanToImpliedProb(currentOdds),
          fairProb
        }
      };
    });

    res.json({ 
      opportunities: enhancedOpportunities,
      deviggingMethod: 'User Exact Specifications',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing devigged opportunities:', error);
    res.status(500).json({ error: 'Failed to process opportunities' });
  }
});

/**
 * Example endpoint showing user's mini example in action
 */
router.get('/devigging-example', (req, res) => {
  // User's mini example: +130 vs -150
  const result = devigTwoWayMarket(130, -150);
  
  res.json({
    example: "User's Mini Example",
    originalOdds: ["+130", "-150"],
    impliedProbs: [
      americanToImpliedProb(130).toFixed(4),
      americanToImpliedProb(-150).toFixed(4)
    ],
    total: (americanToImpliedProb(130) + americanToImpliedProb(-150)).toFixed(4),
    fairProbs: [
      result.fairProb1.toFixed(4),
      result.fairProb2.toFixed(4)
    ],
    fairOdds: [`+${result.fairOdds1}`, `${result.fairOdds2}`],
    vigRemoved: `${result.originalVig.toFixed(2)}%`
  });
});

export default router;