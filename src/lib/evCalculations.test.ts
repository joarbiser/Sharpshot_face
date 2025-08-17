// src/lib/evCalculations.test.ts
// Test suite for user's exact devigging specifications

import { describe, it, expect } from 'vitest';
import { 
  americanToImpliedProb, 
  removeVigFromProbs, 
  fairProbToAmericanOdds,
  devigTwoWayMarket,
  calculateEV 
} from './evCalculations';

describe('User Devigging Specifications', () => {
  describe('americanToImpliedProb', () => {
    it('converts negative odds correctly', () => {
      // -150 ⇒ p = 150/250 = 0.6000
      const result = americanToImpliedProb(-150);
      expect(result).toBeCloseTo(0.6000, 4);
    });

    it('converts positive odds correctly', () => {
      // +130 ⇒ p = 100/230 = 0.4348
      const result = americanToImpliedProb(130);
      expect(result).toBeCloseTo(0.4348, 4);
    });

    it('handles edge cases', () => {
      expect(americanToImpliedProb(-110)).toBeCloseTo(0.5238, 4);
      expect(americanToImpliedProb(110)).toBeCloseTo(0.4762, 4);
      expect(americanToImpliedProb(-200)).toBeCloseTo(0.6667, 4);
      expect(americanToImpliedProb(200)).toBeCloseTo(0.3333, 4);
    });
  });

  describe('removeVigFromProbs', () => {
    it('normalizes probabilities to sum to 1.0', () => {
      const impliedProbs = [0.4348, 0.6000]; // total = 1.0348
      const result = removeVigFromProbs(impliedProbs);
      
      expect(result[0]).toBeCloseTo(0.4203, 4); // 0.4348 / 1.0348
      expect(result[1]).toBeCloseTo(0.5797, 4); // 0.6000 / 1.0348
      expect(result[0] + result[1]).toBeCloseTo(1.0, 6);
    });

    it('handles three-way markets', () => {
      const impliedProbs = [0.3, 0.4, 0.5]; // total = 1.2
      const result = removeVigFromProbs(impliedProbs);
      
      expect(result[0]).toBeCloseTo(0.25, 4);   // 0.3 / 1.2
      expect(result[1]).toBeCloseTo(0.3333, 4); // 0.4 / 1.2
      expect(result[2]).toBeCloseTo(0.4167, 4); // 0.5 / 1.2
      expect(result.reduce((sum, prob) => sum + prob, 0)).toBeCloseTo(1.0, 6);
    });
  });

  describe('fairProbToAmericanOdds', () => {
    it('converts fair probability < 0.5 to positive odds', () => {
      // fair_prob = 0.4203 ⇒ fair_odds = 100 * (1 - 0.4203) / 0.4203 ≈ +138
      const result = fairProbToAmericanOdds(0.4203);
      expect(result).toBeCloseTo(138, 0);
    });

    it('converts fair probability ≥ 0.5 to negative odds', () => {
      // fair_prob = 0.5797 ⇒ fair_odds = -100 * 0.5797 / (1 - 0.5797) ≈ -138
      const result = fairProbToAmericanOdds(0.5797);
      expect(result).toBeCloseTo(-138, 0);
    });

    it('handles edge cases', () => {
      expect(fairProbToAmericanOdds(0.5)).toBe(-100);
      expect(fairProbToAmericanOdds(0.25)).toBe(300);
      expect(fairProbToAmericanOdds(0.75)).toBe(-300);
    });
  });

  describe('devigTwoWayMarket - User Mini Example', () => {
    it('matches user specification exactly', () => {
      // User's example: +130 and -150
      const result = devigTwoWayMarket(130, -150);
      
      // Check implied probabilities
      expect(americanToImpliedProb(130)).toBeCloseTo(0.4348, 4);
      expect(americanToImpliedProb(-150)).toBeCloseTo(0.6000, 4);
      
      // Check total (should be > 1.0 due to vig)
      const total = americanToImpliedProb(130) + americanToImpliedProb(-150);
      expect(total).toBeCloseTo(1.0348, 4);
      
      // Check fair probabilities
      expect(result.fairProb1).toBeCloseTo(0.4203, 4); // 0.4348 / 1.0348
      expect(result.fairProb2).toBeCloseTo(0.5797, 4); // 0.6000 / 1.0348
      
      // Check fair odds (approximately ±138)
      expect(result.fairOdds1).toBeCloseTo(138, 0);  // ≈ +138
      expect(result.fairOdds2).toBeCloseTo(-138, 0); // ≈ -138
      
      // Check vig calculation
      expect(result.originalVig).toBeCloseTo(3.48, 2); // (1.0348 - 1) * 100
    });
  });

  describe('calculateEV', () => {
    it('calculates positive EV correctly', () => {
      // If fair probability is 0.55 and book offers +110 (implied 0.4762)
      // Payout = (110/100) + 1 = 2.1
      // EV = (0.55 * 2.1) - 1 = 0.155 = +15.5%
      const ev = calculateEV(110, 0.55);
      expect(ev).toBeCloseTo(15.5, 1);
    });

    it('calculates negative EV correctly', () => {
      // If fair probability is 0.45 and book offers -110 (implied 0.5238)
      // Payout = (100/110) + 1 = 1.909
      // EV = (0.45 * 1.909) - 1 = -0.141 = -14.1%
      const ev = calculateEV(-110, 0.45);
      expect(ev).toBeCloseTo(-14.1, 1);
    });

    it('calculates near-fair EV correctly', () => {
      // If fair probability is 0.52 and book offers -110 (close to fair)
      const ev = calculateEV(-110, 0.52);
      expect(ev).toBeCloseTo(-0.7, 1); // Should be close to 0
    });
  });

  describe('Integration Test - Complete Workflow', () => {
    it('processes a complete two-way market devigging workflow', () => {
      // Market: Team A +120 vs Team B -140
      const oddsA = 120;
      const oddsB = -140;
      
      // Step 1: Devig the market
      const devigged = devigTwoWayMarket(oddsA, oddsB);
      
      // Step 2: Calculate EV for each side
      const evA = calculateEV(oddsA, devigged.fairProb1);
      const evB = calculateEV(oddsB, devigged.fairProb2);
      
      // Both EVs should be negative (typical for fair markets with vig)
      expect(evA).toBeLessThan(0);
      expect(evB).toBeLessThan(0);
      
      // Fair probabilities should sum to 1.0
      expect(devigged.fairProb1 + devigged.fairProb2).toBeCloseTo(1.0, 6);
      
      // Original vig should be positive
      expect(devigged.originalVig).toBeGreaterThan(0);
    });
  });
});