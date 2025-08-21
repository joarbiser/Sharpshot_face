// server/routes/enhancedOpportunities.ts
// Enhanced betting opportunities using devigging methods

import { Router } from 'express';
import { 
  americanToImpliedProbability, 
  calculateEVPercentage,
  probabilityToAmericanOdds,
  removeVig,
  decimalToAmerican,
  americanToDecimal
} from '../../src/lib/evCalculations';

const router = Router();

/**
 * Process betting opportunities with enhanced devigging
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

      // For two-way markets (moneyline, spread, total), use devigging
      if (opp.market === 'Moneyline' && allOdds.length >= 2) {
        // Find best odds on each side
        const positiveOdds = allOdds.filter((odds: number) => odds > 0);
        const negativeOdds = allOdds.filter((odds: number) => odds < 0);
        
        if (positiveOdds.length > 0 && negativeOdds.length > 0) {
          const bestPositive = Math.max(...positiveOdds);
          const bestNegative = Math.max(...negativeOdds); // Closest to 0 is "best"
          
          // Convert to decimal for devigging
          const decimalOdds = [americanToDecimal(bestPositive), americanToDecimal(bestNegative)];
          const fairProbs = removeVig(decimalOdds);
          
          // Calculate EV using current sportsbook odds vs fair probability
          const currentOdds = opp.sportsbooks?.[0]?.odds || allOdds[0];
          const isPositiveSide = currentOdds > 0;
          const fairProb = isPositiveSide ? fairProbs[0] : fairProbs[1];
          const enhancedEV = calculateEVPercentage(fairProb, currentOdds);
          
          return {
            ...opp,
            enhancedEV,
            vigInfo: {
              originalVig: 100 - (fairProbs[0] + fairProbs[1]) * 100,
              fairOdds: probabilityToAmericanOdds(fairProb),
              impliedProb: americanToImpliedProbability(currentOdds),
              fairProb
            }
          };
        }
      }

      // For multi-sportsbook comparison, calculate consensus
      const impliedProbs = allOdds.map(americanToImpliedProbability);
      const avgImpliedProb = impliedProbs.reduce((sum: number, prob: number) => sum + prob, 0) / impliedProbs.length;
      
      // Remove average vig to get fair probability
      const totalVig = (avgImpliedProb - 0.5) * 2; // Estimate for single-sided market
      const fairProb = Math.max(0.05, Math.min(0.95, avgImpliedProb - totalVig));
      
      const currentOdds = opp.sportsbooks?.[0]?.odds || allOdds[0];
      const enhancedEV = calculateEVPercentage(fairProb, currentOdds);
      
      return {
        ...opp,
        enhancedEV,
        vigInfo: {
          originalVig: totalVig * 100,
          fairOdds: probabilityToAmericanOdds(fairProb),
          impliedProb: americanToImpliedProbability(currentOdds),
          fairProb
        }
      };
    });

    res.json({ 
      opportunities: enhancedOpportunities,
      deviggingMethod: 'Enhanced Devigging',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing devigged opportunities:', error);
    res.status(500).json({ error: 'Failed to process opportunities' });
  }
});

/**
 * Example endpoint showing devigging in action
 */
router.get('/devigging-example', (req, res) => {
  // Example: +130 vs -150
  const positiveOdds = 130;
  const negativeOdds = -150;
  
  // Convert to decimal
  const decimalOdds = [americanToDecimal(positiveOdds), americanToDecimal(negativeOdds)];
  const fairProbs = removeVig(decimalOdds);
  
  // Calculate implied probabilities
  const impliedProb1 = americanToImpliedProbability(positiveOdds);
  const impliedProb2 = americanToImpliedProbability(negativeOdds);
  const totalImplied = impliedProb1 + impliedProb2;
  
  res.json({
    example: {
      originalOdds: { positive: positiveOdds, negative: negativeOdds },
      impliedProbs: { prob1: impliedProb1, prob2: impliedProb2, total: totalImplied },
      vig: ((totalImplied - 1) * 100).toFixed(2) + '%',
      fairProbs: { prob1: fairProbs[0], prob2: fairProbs[1] },
      fairOdds: { 
        positive: probabilityToAmericanOdds(fairProbs[0]), 
        negative: probabilityToAmericanOdds(fairProbs[1]) 
      }
    }
  });
});

export default router;