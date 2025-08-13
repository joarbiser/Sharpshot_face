// src/lib/tradingMath.test.ts

import { describe, it, expect, beforeEach } from 'vitest';
import {
  americanToDecimal,
  americanToProb,
  probToAmerican,
  median,
  trimmedMean,
  buildFair2Way,
  buildFair3Way,
  detectEV2Way,
  detectArb2Way,
  detectArb3Way,
  detectMiddleTotals,
  detectMiddleSpreads,
  countIntegers,
  isStale,
  msSince,
  validAmerican,
  analyzeGameOpportunities,
  processLiveOpportunitiesData,
  evPerDollar,
  BookQuote,
  OutcomeSnapshot,
  CONFIG
} from './tradingMath';

describe('Odds Conversion Functions', () => {
  describe('americanToDecimal', () => {
    it('converts positive American odds correctly', () => {
      expect(americanToDecimal(100)).toBeCloseTo(2.0);
      expect(americanToDecimal(150)).toBeCloseTo(2.5);
      expect(americanToDecimal(200)).toBeCloseTo(3.0);
    });

    it('converts negative American odds correctly', () => {
      expect(americanToDecimal(-100)).toBeCloseTo(2.0);
      expect(americanToDecimal(-110)).toBeCloseTo(1.909);
      expect(americanToDecimal(-200)).toBeCloseTo(1.5);
    });

    it('throws error for invalid odds', () => {
      expect(() => americanToDecimal(50)).toThrow('Invalid American odds');
      expect(() => americanToDecimal(-50)).toThrow('Invalid American odds');
      expect(() => americanToDecimal(0)).toThrow('Invalid American odds');
    });
  });

  describe('americanToProb', () => {
    it('converts American odds to probability correctly', () => {
      expect(americanToProb(100)).toBeCloseTo(0.5);
      expect(americanToProb(-110)).toBeCloseTo(0.524, 3);
      expect(americanToProb(150)).toBeCloseTo(0.4);
    });
  });

  describe('probToAmerican', () => {
    it('converts probability to American odds correctly', () => {
      expect(probToAmerican(0.5)).toBeCloseTo(100);
      expect(probToAmerican(0.6)).toBeCloseTo(-150);
      expect(probToAmerican(0.4)).toBeCloseTo(150);
    });

    it('throws error for invalid probabilities', () => {
      expect(() => probToAmerican(0)).toThrow('Invalid probability');
      expect(() => probToAmerican(1)).toThrow('Invalid probability');
      expect(() => probToAmerican(1.5)).toThrow('Invalid probability');
    });
  });
});

describe('Utility Functions', () => {
  describe('median', () => {
    it('calculates median correctly for odd length arrays', () => {
      expect(median([1, 2, 3, 4, 5])).toBe(3);
      expect(median([5, 1, 3])).toBe(3);
    });

    it('calculates median correctly for even length arrays', () => {
      expect(median([1, 2, 3, 4])).toBe(2.5);
      expect(median([4, 1, 3, 2])).toBe(2.5);
    });

    it('handles empty arrays and invalid values', () => {
      expect(median([])).toBeNaN();
      expect(median([NaN, Infinity, -Infinity])).toBeNaN();
      expect(median([1, NaN, 3])).toBe(2);
    });
  });

  describe('trimmedMean', () => {
    it('calculates trimmed mean correctly', () => {
      const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const result = trimmedMean(values, 0.2); // trim 20% from each end
      expect(result).toBeCloseTo(5.5);
    });

    it('handles small arrays', () => {
      expect(trimmedMean([1, 2, 3])).toBeCloseTo(2);
    });
  });

  describe('validAmerican', () => {
    it('validates American odds correctly', () => {
      expect(validAmerican(-110)).toBe(true);
      expect(validAmerican(150)).toBe(true);
      expect(validAmerican(-100)).toBe(true);
      expect(validAmerican(100)).toBe(true);
      
      expect(validAmerican(50)).toBe(false);
      expect(validAmerican(-50)).toBe(false);
      expect(validAmerican(0)).toBe(false);
      expect(validAmerican(Infinity)).toBe(false);
    });
  });

  describe('msSince', () => {
    it('calculates time difference correctly', () => {
      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
      const result = msSince(fiveMinutesAgo.toISOString());
      expect(result).toBeGreaterThan(4.9 * 60 * 1000);
      expect(result).toBeLessThan(5.1 * 60 * 1000);
    });

    it('handles invalid dates', () => {
      expect(msSince('invalid-date')).toBe(Number.POSITIVE_INFINITY);
    });
  });

  describe('isStale', () => {
    it('identifies stale quotes correctly', () => {
      const now = new Date();
      const fresh: BookQuote = {
        bookId: 'test',
        priceAmerican: -110,
        lastUpdated: now.toISOString()
      };
      const stale: BookQuote = {
        bookId: 'test',
        priceAmerican: -110,
        lastUpdated: new Date(now.getTime() - CONFIG.STALE_MS - 1000).toISOString()
      };

      expect(isStale(fresh)).toBe(false);
      expect(isStale(stale)).toBe(true);
    });
  });

  describe('countIntegers', () => {
    it('counts integers between two numbers correctly', () => {
      expect(countIntegers(1.5, 4.5)).toBe(3); // 2, 3, 4
      expect(countIntegers(2.5, 7.5)).toBe(5); // 3, 4, 5, 6, 7
      expect(countIntegers(-2.5, 2.5)).toBe(5); // -2, -1, 0, 1, 2
    });

    it('handles edge cases', () => {
      expect(countIntegers(1, 2)).toBe(0); // no integers strictly between 1 and 2
      expect(countIntegers(1, 3)).toBe(1); // only 2
      expect(countIntegers(3, 1)).toBe(1); // same result regardless of order
    });
  });
});

describe('Fair Probability Building', () => {
  let homeQuotes: BookQuote[];
  let awayQuotes: BookQuote[];
  let drawQuotes: BookQuote[];

  beforeEach(() => {
    const now = new Date().toISOString();
    homeQuotes = [
      { bookId: 'book1', priceAmerican: -110, lastUpdated: now },
      { bookId: 'book2', priceAmerican: -105, lastUpdated: now },
      { bookId: 'book3', priceAmerican: -115, lastUpdated: now }
    ];
    awayQuotes = [
      { bookId: 'book1', priceAmerican: -110, lastUpdated: now },
      { bookId: 'book2', priceAmerican: -105, lastUpdated: now },
      { bookId: 'book3', priceAmerican: -115, lastUpdated: now }
    ];
    drawQuotes = [
      { bookId: 'book1', priceAmerican: 250, lastUpdated: now },
      { bookId: 'book2', priceAmerican: 240, lastUpdated: now },
      { bookId: 'book3', priceAmerican: 260, lastUpdated: now }
    ];
  });

  describe('buildFair2Way', () => {
    it('builds fair probabilities for 2-way market', () => {
      const result = buildFair2Way(homeQuotes, awayQuotes);
      expect(result).not.toBeNull();
      expect(result!.pOutcome + result!.pOpp).toBeCloseTo(1, 5);
      expect(result!.sampleSize).toBe(3);
    });

    it('excludes specified book correctly', () => {
      const result = buildFair2Way(homeQuotes, awayQuotes, 'book1');
      expect(result).not.toBeNull();
      expect(result!.sampleSize).toBe(2);
    });

    it('returns null when insufficient quotes', () => {
      const fewQuotes = homeQuotes.slice(0, 1);
      const result = buildFair2Way(fewQuotes, awayQuotes);
      expect(result).toBeNull();
    });
  });

  describe('buildFair3Way', () => {
    it('builds fair probabilities for 3-way market', () => {
      const result = buildFair3Way(homeQuotes, drawQuotes, awayQuotes);
      expect(result).not.toBeNull();
      expect(result!.pH + result!.pD + result!.pA).toBeCloseTo(1, 5);
      expect(result!.sampleSize).toBe(3);
    });
  });
});

describe('EV Detection', () => {
  let homeQuotes: BookQuote[];
  let awayQuotes: BookQuote[];

  beforeEach(() => {
    const now = new Date().toISOString();
    homeQuotes = [
      { bookId: 'pinacle', priceAmerican: -105, lastUpdated: now },
      { bookId: 'circa', priceAmerican: -110, lastUpdated: now },
      { bookId: 'target', priceAmerican: 110, lastUpdated: now } // +EV line
    ];
    awayQuotes = [
      { bookId: 'pinacle', priceAmerican: -105, lastUpdated: now },
      { bookId: 'circa', priceAmerican: -110, lastUpdated: now },
      { bookId: 'target', priceAmerican: -120, lastUpdated: now }
    ];
  });

  describe('detectEV2Way', () => {
    it('detects +EV opportunities', () => {
      const outcome = { market: 'moneyline' as const, side: 'home' as const };
      const result = detectEV2Way('game1', outcome, homeQuotes, awayQuotes, 'target');
      
      expect(result).not.toBeNull();
      expect(result!.kind).toBe('EV');
      expect(result!.evPct).toBeGreaterThan(CONFIG.EV_THRESHOLD_PCT);
    });

    it('returns null for -EV below threshold', () => {
      const outcome = { market: 'moneyline' as const, side: 'home' as const };
      const result = detectEV2Way('game1', outcome, homeQuotes, awayQuotes, 'circa');
      
      expect(result).toBeNull();
    });
  });
});

describe('Arbitrage Detection', () => {
  let homeSnapshot: OutcomeSnapshot;
  let awaySnapshot: OutcomeSnapshot;
  let drawSnapshot: OutcomeSnapshot;

  beforeEach(() => {
    const now = new Date().toISOString();
    
    homeSnapshot = {
      gameId: 'game1',
      outcome: { market: 'moneyline', side: 'home' },
      quotes: [
        { bookId: 'book1', priceAmerican: 110, lastUpdated: now }, // good price for home
        { bookId: 'book2', priceAmerican: 105, lastUpdated: now }
      ]
    };
    
    awaySnapshot = {
      gameId: 'game1',
      outcome: { market: 'moneyline', side: 'away' },
      quotes: [
        { bookId: 'book1', priceAmerican: 105, lastUpdated: now },
        { bookId: 'book3', priceAmerican: 110, lastUpdated: now } // good price for away
      ]
    };

    drawSnapshot = {
      gameId: 'game1',
      outcome: { market: 'moneyline-3way', side: 'draw' },
      quotes: [
        { bookId: 'book1', priceAmerican: 300, lastUpdated: now },
        { bookId: 'book2', priceAmerican: 310, lastUpdated: now }
      ]
    };
  });

  describe('detectArb2Way', () => {
    it('detects 2-way arbitrage opportunities', () => {
      const result = detectArb2Way('game1', homeSnapshot, awaySnapshot, 100);
      
      expect(result).not.toBeNull();
      expect(result!.kind).toBe('Arb2');
      expect(result!.roiPct).toBeGreaterThan(0);
      expect(result!.stakeSplit.sA + result!.stakeSplit.sB).toBeCloseTo(100, 1);
    });
  });

  describe('detectArb3Way', () => {
    it('detects 3-way arbitrage opportunities', () => {
      const homeFor3Way: OutcomeSnapshot = {
        gameId: 'game1',
        outcome: { market: 'moneyline-3way', side: 'home' },
        quotes: [{ bookId: 'book1', priceAmerican: 250, lastUpdated: new Date().toISOString() }]
      };
      const awayFor3Way: OutcomeSnapshot = {
        gameId: 'game1',  
        outcome: { market: 'moneyline-3way', side: 'away' },
        quotes: [{ bookId: 'book2', priceAmerican: 250, lastUpdated: new Date().toISOString() }]
      };

      const result = detectArb3Way('game1', homeFor3Way, drawSnapshot, awayFor3Way, 100);
      
      expect(result).not.toBeNull();
      expect(result!.kind).toBe('Arb3');
      expect(result!.roiPct).toBeGreaterThan(0);
    });
  });
});

describe('Middle Detection', () => {
  let overSnapshot: OutcomeSnapshot;
  let underSnapshot: OutcomeSnapshot;

  beforeEach(() => {
    const now = new Date().toISOString();
    
    overSnapshot = {
      gameId: 'game1',
      outcome: { market: 'total', side: 'over', line: 45.5 },
      quotes: [{ bookId: 'book1', priceAmerican: -110, lastUpdated: now }]
    };
    
    underSnapshot = {
      gameId: 'game1', 
      outcome: { market: 'total', side: 'under', line: 47.5 },
      quotes: [{ bookId: 'book2', priceAmerican: -110, lastUpdated: now }]
    };
  });

  describe('detectMiddleTotals', () => {
    it('detects total middle opportunities', () => {
      const result = detectMiddleTotals('game1', overSnapshot, underSnapshot, 100);
      
      expect(result).not.toBeNull();
      expect(result!.kind).toBe('Middle');
      expect(result!.market).toBe('total');
      expect(result!.middleSize).toBe(2); // 46 and 47
      expect(result!.width).toBe(2);
    });

    it('returns null when no middle exists', () => {
      underSnapshot.outcome = { market: 'total', side: 'under', line: 45.5 };
      const result = detectMiddleTotals('game1', overSnapshot, underSnapshot, 100);
      expect(result).toBeNull();
    });
  });

  describe('detectMiddleSpreads', () => {
    it('detects spread middle opportunities', () => {
      const homeSnapshot: OutcomeSnapshot = {
        gameId: 'game1',
        outcome: { market: 'spread', side: 'home', line: -2.5 },
        quotes: [{ bookId: 'book1', priceAmerican: -110, lastUpdated: new Date().toISOString() }]
      };
      
      const awaySnapshot: OutcomeSnapshot = {
        gameId: 'game1',
        outcome: { market: 'spread', side: 'away', line: 4.5 },
        quotes: [{ bookId: 'book2', priceAmerican: -110, lastUpdated: new Date().toISOString() }]
      };

      const result = detectMiddleSpreads('game1', homeSnapshot, awaySnapshot, 100);
      
      expect(result).not.toBeNull();
      expect(result!.kind).toBe('Middle');
      expect(result!.market).toBe('spread');
      expect(result!.middleSize).toBeGreaterThan(0);
    });
  });
});

describe('Integration Functions', () => {
  describe('analyzeGameOpportunities', () => {
    it('analyzes game opportunities comprehensively', () => {
      const now = new Date().toISOString();
      
      const outcomeSnapshots: OutcomeSnapshot[] = [
        {
          gameId: 'game1',
          outcome: { market: 'moneyline', side: 'home' },
          quotes: [
            { bookId: 'book1', priceAmerican: 105, lastUpdated: now },
            { bookId: 'book2', priceAmerican: 100, lastUpdated: now }
          ]
        },
        {
          gameId: 'game1', 
          outcome: { market: 'moneyline', side: 'away' },
          quotes: [
            { bookId: 'book1', priceAmerican: 100, lastUpdated: now },
            { bookId: 'book3', priceAmerican: 105, lastUpdated: now }
          ]
        }
      ];

      const results = analyzeGameOpportunities('game1', outcomeSnapshots, 100);
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe('processLiveOpportunitiesData', () => {
    it('processes live data into opportunities', () => {
      const gameData = [{
        gameID: 12345,
        markets: [{
          type: 'moneyline',
          outcomes: [
            {
              side: 'home',
              books: [
                { bookId: 'book1', priceAmerican: 105, lastUpdated: new Date().toISOString() },
                { bookId: 'book2', priceAmerican: 100, lastUpdated: new Date().toISOString() }
              ]
            },
            {
              side: 'away', 
              books: [
                { bookId: 'book1', priceAmerican: 100, lastUpdated: new Date().toISOString() },
                { bookId: 'book3', priceAmerican: 105, lastUpdated: new Date().toISOString() }
              ]
            }
          ]
        }]
      }];

      const results = processLiveOpportunitiesData(gameData);
      expect(Array.isArray(results)).toBe(true);
    });

    it('handles empty or malformed data gracefully', () => {
      expect(processLiveOpportunitiesData([])).toEqual([]);
      expect(processLiveOpportunitiesData([{}])).toEqual([]);
      expect(processLiveOpportunitiesData([{ gameID: 123 }])).toEqual([]);
    });
  });
});