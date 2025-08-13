// src/lib/tradingMath.ts

// ===== Types =====
export type BookQuote = {
  bookId: string;
  priceAmerican: number;      // e.g., -105
  lastUpdated: string;        // ISO timestamp
};

export type MarketType = 'moneyline' | 'moneyline-3way' | 'spread' | 'total';

export type OutcomeId =
  | { market: 'moneyline'; side: 'home' | 'away' }
  | { market: 'moneyline-3way'; side: 'home' | 'draw' | 'away' }
  | { market: 'spread'; side: 'home' | 'away'; line: number }    // line from HOME perspective
  | { market: 'total'; side: 'over' | 'under'; line: number };

export type OutcomeSnapshot = {
  gameId: string;
  outcome: OutcomeId;      // normalized outcome key (same line/side)
  quotes: BookQuote[];     // quotes for this outcome from multiple books
};

export type EVResult = {
  kind: 'EV';
  gameId: string;
  outcome: OutcomeId;
  bookId: string;
  priceAmerican: number;
  evPct: number;           // rounded for UI
  fairProb: number;        // 0..1
  fairDecimal: number;
  fairAmerican: number;
  sampleSize: number;      // #books used per side (min)
  updatedAgoMs: number;
};

export type Arb2WayResult = {
  kind: 'Arb2';
  gameId: string;
  market: 'moneyline' | 'spread' | 'total';
  line?: number;           // for spread/total
  legA: { bookId: string; priceAmerican: number; decimal: number; updatedAgoMs: number };
  legB: { bookId: string; priceAmerican: number; decimal: number; updatedAgoMs: number };
  impliedSumPct: number;   // 0..100
  roiPct: number;          // guaranteed if pushRisk=false
  stakeSplit: { sA: number; sB: number };
  pushRisk: boolean;
};

export type Arb3WayResult = {
  kind: 'Arb3';
  gameId: string;
  legs: Array<{ side: 'home' | 'draw' | 'away'; bookId: string; priceAmerican: number; decimal: number; updatedAgoMs: number }>;
  impliedSumPct: number;
  roiPct: number;
  stakeSplit: { sHome: number; sDraw: number; sAway: number };
};

export type MiddleResult = {
  kind: 'Middle';
  gameId: string;
  market: 'total' | 'spread';
  over?:  { bookId: string; line: number; priceAmerican: number; decimal: number; updatedAgoMs: number };
  under?: { bookId: string; line: number; priceAmerican: number; decimal: number; updatedAgoMs: number };
  homeSide?: { bookId: string; line: number; priceAmerican: number; decimal: number; updatedAgoMs: number };
  awaySide?: { bookId: string; line: number; priceAmerican: number; decimal: number; updatedAgoMs: number };
  middleSize: number;      // integer count strictly between lines
  width: number;           // numeric width
  stakeSplit: { sLeg1: number; sLeg2: number };
  worstCaseLoss: number;
  bestCaseProfit: number;
  pushRisk: boolean;
};

export type AnyResult = EVResult | Arb2WayResult | Arb3WayResult | MiddleResult;

// ===== Config =====
export const CONFIG = {
  STALE_MS: 120_000,        // drop quotes older than 2 minutes
  EV_THRESHOLD_PCT: -5.0,   // show EV >= -5.0%
  MAX_KELLY: 0.5,
  EPS: 1e-12
};

// ===== Utilities: time, rounding, guards =====
export const roundCents = (x: number) => Math.round(x * 100) / 100;
export const roundPct1  = (x: number) => Math.round(x * 10) / 10;
export const round4     = (x: number) => Math.round(x * 1e4) / 1e4;

export function msSince(iso: string): number {
  const t = Date.parse(iso);
  return isNaN(t) ? Number.POSITIVE_INFINITY : (Date.now() - t);
}
export function isStale(q: BookQuote, staleMs: number = CONFIG.STALE_MS): boolean {
  return msSince(q.lastUpdated) > staleMs;
}
export function isIntegerLine(x: number): boolean {
  return Math.abs(x - Math.round(x)) < 1e-9;
}
export function validAmerican(A: number): boolean {
  return Number.isFinite(A) && Math.abs(A) >= 100 && Math.abs(A) <= 100000;
}

// ===== Odds & probability conversions =====
export function americanToDecimal(A: number): number {
  if (!validAmerican(A)) throw new Error(`Invalid American odds: ${A}`);
  return A > 0 ? 1 + A / 100 : 1 + 100 / (-A);
}
export function americanToProb(A: number): number {
  if (!validAmerican(A)) throw new Error(`Invalid American odds: ${A}`);
  return A > 0 ? 100 / (A + 100) : (-A) / ((-A) + 100);
}
export function probToAmerican(p: number): number {
  if (!(p > 0 && p < 1)) throw new Error(`Invalid probability: ${p}`);
  return (p <= 0.5) ? (100 * (1 - p)) / p : (-100 * p) / (1 - p);
}

// ===== Aggregation helpers =====
export function median(values: number[]): number {
  const arr = values.filter(Number.isFinite).slice().sort((a,b)=>a-b);
  if (!arr.length) return NaN;
  const mid = Math.floor(arr.length / 2);
  return (arr.length % 2) ? arr[mid] : (arr[mid-1] + arr[mid]) / 2;
}
export function trimmedMean(values: number[], trimPct = 0.1): number {
  const arr = values.filter(Number.isFinite).slice().sort((a,b)=>a-b);
  if (!arr.length) return NaN;
  const k = Math.floor(arr.length * trimPct);
  const trimmed = arr.slice(k, arr.length - k);
  const sum = trimmed.reduce((s,v)=>s+v, 0);
  return sum / trimmed.length;
}
export function bestDecimal(quotes: BookQuote[]): { bookId: string; priceAmerican: number; decimal: number; updatedAgoMs: number } {
  const fresh = quotes.filter(q => !isStale(q));
  const mapped = fresh.map(q => ({
    bookId: q.bookId,
    priceAmerican: q.priceAmerican,
    decimal: americanToDecimal(q.priceAmerican),
    updatedAgoMs: msSince(q.lastUpdated)
  }));
  if (!mapped.length) throw new Error('No fresh quotes available');
  return mapped.reduce((best, cur) => cur.decimal > best.decimal ? cur : best, mapped[0]);
}

// ===== No-vig (fair) probabilities =====
export function buildFair2Way(
  outcomeQuotes: BookQuote[],
  oppQuotes: BookQuote[],
  excludeBookId?: string,
  useTrimmedMean = false
): { pOutcome: number; pOpp: number; sampleSize: number } | null {
  const othersOutcome = outcomeQuotes.filter(q => q.bookId !== excludeBookId && !isStale(q));
  const othersOpp     = oppQuotes.filter(q => q.bookId !== excludeBookId && !isStale(q));
  if (othersOutcome.length < 2 || othersOpp.length < 2) return null;

  const agg = (xs: BookQuote[]) => (useTrimmedMean ? trimmedMean : median)(xs.map(q => americanToProb(q.priceAmerican)));
  const pO = agg(othersOutcome);
  const pX = agg(othersOpp);
  if (!Number.isFinite(pO) || !Number.isFinite(pX)) return null;

  const S = pO + pX;
  if (S <= 0) return null;

  return { pOutcome: pO / S, pOpp: pX / S, sampleSize: Math.min(othersOutcome.length, othersOpp.length) };
}

export function buildFair3Way(
  homeQuotes: BookQuote[], drawQuotes: BookQuote[], awayQuotes: BookQuote[],
  excludeBookId?: string,
  useTrimmedMean = false
): { pH: number; pD: number; pA: number; sampleSize: number } | null {
  const H = homeQuotes.filter(q => q.bookId !== excludeBookId && !isStale(q));
  const D = drawQuotes.filter(q => q.bookId !== excludeBookId && !isStale(q));
  const A = awayQuotes.filter(q => q.bookId !== excludeBookId && !isStale(q));
  if (H.length < 2 || D.length < 2 || A.length < 2) return null;

  const agg = (xs: BookQuote[]) => (useTrimmedMean ? trimmedMean : median)(xs.map(q => americanToProb(q.priceAmerican)));
  const pH_raw = agg(H), pD_raw = agg(D), pA_raw = agg(A);
  const S = pH_raw + pD_raw + pA_raw;
  if (S <= 0) return null;

  return { pH: pH_raw / S, pD: pD_raw / S, pA: pA_raw / S, sampleSize: Math.min(H.length, D.length, A.length) };
}

// ===== EV math & detection =====
export function evPerDollar(pFair: number, decimal: number): number {
  // EV per $1 staked = p * (decimal - 1) - (1 - p)
  return pFair * (decimal - 1) - (1 - pFair);
}

export function detectEV2Way(
  gameId: string,
  outcome: OutcomeId,
  outcomeQuotes: BookQuote[],
  oppQuotes: BookQuote[],
  targetBookId: string
): EVResult | null {
  const fair = buildFair2Way(outcomeQuotes, oppQuotes, targetBookId);
  if (!fair) return null;

  const target = outcomeQuotes.find(q => q.bookId === targetBookId && !isStale(q));
  if (!target) return null;

  const D = americanToDecimal(target.priceAmerican);
  const EV = evPerDollar(fair.pOutcome, D);
  const EVpct = 100 * EV;
  if (EVpct < CONFIG.EV_THRESHOLD_PCT) return null;

  const updatedAgoMs = msSince(target.lastUpdated);
  const fairDec = 1 / fair.pOutcome;
  const fairAm  = probToAmerican(fair.pOutcome);

  return {
    kind: 'EV',
    gameId,
    outcome,
    bookId: targetBookId,
    priceAmerican: target.priceAmerican,
    evPct: roundPct1(EVpct),
    fairProb: fair.pOutcome,
    fairDecimal: round4(fairDec),
    fairAmerican: Math.round(fairAm),
    sampleSize: fair.sampleSize,
    updatedAgoMs
  };
}

// ===== Arbitrage (2-Way & 3-Way) =====
export function detectArb2Way(
  gameId: string,
  outcomeA: OutcomeSnapshot,  // one side at specific line
  outcomeB: OutcomeSnapshot,  // exact opposing side at same line
  stake: number = 100
): Arb2WayResult | null {
  const bestA = bestDecimal(outcomeA.quotes);
  const bestB = bestDecimal(outcomeB.quotes);
  const invSum = 1 / bestA.decimal + 1 / bestB.decimal;
  if (invSum >= 1 - CONFIG.EPS) return null;

  const sA = stake * bestB.decimal / (bestA.decimal + bestB.decimal);
  const sB = stake * bestA.decimal / (bestA.decimal + bestB.decimal);
  const roiPct = 100 * (1 - invSum);

  const pushRisk =
    (outcomeA.outcome.market === 'spread' || outcomeA.outcome.market === 'total') &&
    isIntegerLine(('line' in outcomeA.outcome) ? outcomeA.outcome.line : NaN);

  return {
    kind: 'Arb2',
    gameId,
    market: outcomeA.outcome.market as 'moneyline'|'spread'|'total',
    line: ('line' in outcomeA.outcome) ? outcomeA.outcome.line : undefined,
    legA: { ...bestA },
    legB: { ...bestB },
    impliedSumPct: roundPct1(100 * invSum),
    roiPct: roundPct1(roiPct),
    stakeSplit: { sA: roundCents(sA), sB: roundCents(sB) },
    pushRisk
  };
}

export function detectArb3Way(
  gameId: string,
  home: OutcomeSnapshot, draw: OutcomeSnapshot, away: OutcomeSnapshot,
  stake: number = 100
): Arb3WayResult | null {
  const H = bestDecimal(home.quotes);
  const D = bestDecimal(draw.quotes);
  const A = bestDecimal(away.quotes);
  const invSum = 1/H.decimal + 1/D.decimal + 1/A.decimal;
  if (invSum >= 1 - CONFIG.EPS) return null;

  const K = 1 / invSum;
  const sHome = stake * (K / H.decimal);
  const sDraw = stake * (K / D.decimal);
  const sAway = stake * (K / A.decimal);
  const roiPct = 100 * (K - 1);

  return {
    kind: 'Arb3',
    gameId,
    legs: [
      { side: 'home', ...H },
      { side: 'draw', ...D },
      { side: 'away', ...A }
    ],
    impliedSumPct: roundPct1(100 * invSum),
    roiPct: roundPct1(roiPct),
    stakeSplit: {
      sHome: roundCents(sHome),
      sDraw: roundCents(sDraw),
      sAway: roundCents(sAway)
    }
  };
}

// ===== Middles (Totals & Spreads) =====
export function countIntegers(a: number, b: number): number {
  const lo = Math.min(a, b), hi = Math.max(a, b);
  const first = Math.ceil(lo + 1e-9);
  const last  = Math.floor(hi - 1e-9);
  return Math.max(0, last - first + 1);
}
export function stakeSplitMiddleBalanced(S: number, D1: number, D2: number): { s1: number; s2: number } {
  // Balance tail losses: s1/s2 = D2/D1
  const s1 = S * D2 / (D1 + D2);
  const s2 = S * D1 / (D1 + D2);
  return { s1, s2 };
}
export function detectMiddleTotals(
  gameId: string,
  overOutcome: OutcomeSnapshot,
  underOutcome: OutcomeSnapshot,
  stake: number = 100
): MiddleResult | null {
  const Lo = (overOutcome.outcome.market === 'total' && overOutcome.outcome.side === 'over') ? overOutcome.outcome.line : NaN;
  const Lu = (underOutcome.outcome.market === 'total' && underOutcome.outcome.side === 'under') ? underOutcome.outcome.line : NaN;
  if (!Number.isFinite(Lo) || !Number.isFinite(Lu) || !(Lu > Lo)) return null;

  const bestOver  = bestDecimal(overOutcome.quotes);
  const bestUnder = bestDecimal(underOutcome.quotes);
  const middleSize = countIntegers(Lo, Lu);
  if (middleSize < 1) return null;

  const { s1: sOver, s2: sUnder } = stakeSplitMiddleBalanced(stake, bestOver.decimal, bestUnder.decimal);
  const worst = sOver * (bestOver.decimal - 1) - sUnder;
  const best  = sOver * (bestOver.decimal - 1) + sUnder * (bestUnder.decimal - 1);

  return {
    kind: 'Middle',
    gameId,
    market: 'total',
    over:  { bookId: bestOver.bookId, line: Lo, priceAmerican: bestOver.priceAmerican, decimal: bestOver.decimal, updatedAgoMs: bestOver.updatedAgoMs },
    under: { bookId: bestUnder.bookId, line: Lu, priceAmerican: bestUnder.priceAmerican, decimal: bestUnder.decimal, updatedAgoMs: bestUnder.updatedAgoMs },
    middleSize,
    width: Lu - Lo,
    stakeSplit: { sLeg1: roundCents(sOver), sLeg2: roundCents(sUnder) },
    worstCaseLoss: roundCents(worst),
    bestCaseProfit: roundCents(best),
    pushRisk: (isIntegerLine(Lo) || isIntegerLine(Lu))
  };
}

export function detectMiddleSpreads(
  gameId: string,
  homeOutcome: OutcomeSnapshot,
  awayOutcome: OutcomeSnapshot,
  stake: number = 100
): MiddleResult | null {
  const Lh = (homeOutcome.outcome.market === 'spread' && homeOutcome.outcome.side === 'home') ? homeOutcome.outcome.line : NaN;
  const La = (awayOutcome.outcome.market === 'spread' && awayOutcome.outcome.side === 'away') ? awayOutcome.outcome.line : NaN;
  if (!Number.isFinite(Lh) || !Number.isFinite(La) || !(Lh > -La)) return null;

  const bestHome = bestDecimal(homeOutcome.quotes);
  const bestAway = bestDecimal(awayOutcome.quotes);
  const middleSize = countIntegers(-La, Lh);
  if (middleSize < 1) return null;

  const { s1: sHome, s2: sAway } = stakeSplitMiddleBalanced(stake, bestHome.decimal, bestAway.decimal);
  const worst = sHome * (bestHome.decimal - 1) - sAway;
  const best  = sHome * (bestHome.decimal - 1) + sAway * (bestAway.decimal - 1);

  return {
    kind: 'Middle',
    gameId,
    market: 'spread',
    homeSide: { bookId: bestHome.bookId, line: Lh, priceAmerican: bestHome.priceAmerican, decimal: bestHome.decimal, updatedAgoMs: bestHome.updatedAgoMs },
    awaySide: { bookId: bestAway.bookId, line: La, priceAmerican: bestAway.priceAmerican, decimal: bestAway.decimal, updatedAgoMs: bestAway.updatedAgoMs },
    middleSize,
    width: Lh - (-La),
    stakeSplit: { sLeg1: roundCents(sHome), sLeg2: roundCents(sAway) },
    worstCaseLoss: roundCents(worst),
    bestCaseProfit: roundCents(best),
    pushRisk: (isIntegerLine(Lh) || isIntegerLine(La))
  };
}

// ===== Main Analysis Functions =====
export function analyzeGameOpportunities(
  gameId: string,
  outcomeSnapshots: OutcomeSnapshot[],
  stake: number = 100
): AnyResult[] {
  const results: AnyResult[] = [];
  
  // Group by market and line for efficient processing
  const byMarket = new Map<string, OutcomeSnapshot[]>();
  for (const snap of outcomeSnapshots) {
    const key = snap.outcome.market + ('line' in snap.outcome ? `_${snap.outcome.line}` : '');
    if (!byMarket.has(key)) byMarket.set(key, []);
    byMarket.get(key)!.push(snap);
  }

  // Process each market group
  for (const [marketKey, snapshots] of byMarket) {
    const market = snapshots[0].outcome.market;
    
    if (market === 'moneyline') {
      const home = snapshots.find(s => s.outcome.side === 'home');
      const away = snapshots.find(s => s.outcome.side === 'away');
      
      if (home && away) {
        // Check for 2-way arbitrage
        const arb = detectArb2Way(gameId, home, away, stake);
        if (arb) results.push(arb);
        
        // Check for +EV opportunities on each side
        for (const bookId of new Set(home.quotes.concat(away.quotes).map(q => q.bookId))) {
          const evHome = detectEV2Way(gameId, home.outcome, home.quotes, away.quotes, bookId);
          const evAway = detectEV2Way(gameId, away.outcome, away.quotes, home.quotes, bookId);
          if (evHome) results.push(evHome);
          if (evAway) results.push(evAway);
        }
      }
    } else if (market === 'moneyline-3way') {
      const home = snapshots.find(s => s.outcome.side === 'home');
      const draw = snapshots.find(s => s.outcome.side === 'draw');
      const away = snapshots.find(s => s.outcome.side === 'away');
      
      if (home && draw && away) {
        const arb3 = detectArb3Way(gameId, home, draw, away, stake);
        if (arb3) results.push(arb3);
      }
    } else if (market === 'total') {
      const over = snapshots.find(s => s.outcome.side === 'over');
      const under = snapshots.find(s => s.outcome.side === 'under');
      
      if (over && under) {
        // Check for 2-way arbitrage
        const arb = detectArb2Way(gameId, over, under, stake);
        if (arb) results.push(arb);
        
        // Check for middle opportunity
        const middle = detectMiddleTotals(gameId, over, under, stake);
        if (middle) results.push(middle);
        
        // Check for +EV opportunities
        for (const bookId of new Set(over.quotes.concat(under.quotes).map(q => q.bookId))) {
          const evOver = detectEV2Way(gameId, over.outcome, over.quotes, under.quotes, bookId);
          const evUnder = detectEV2Way(gameId, under.outcome, under.quotes, over.quotes, bookId);
          if (evOver) results.push(evOver);
          if (evUnder) results.push(evUnder);
        }
      }
    } else if (market === 'spread') {
      const home = snapshots.find(s => s.outcome.side === 'home');
      const away = snapshots.find(s => s.outcome.side === 'away');
      
      if (home && away) {
        // Check for 2-way arbitrage
        const arb = detectArb2Way(gameId, home, away, stake);
        if (arb) results.push(arb);
        
        // Check for middle opportunity
        const middle = detectMiddleSpreads(gameId, home, away, stake);
        if (middle) results.push(middle);
        
        // Check for +EV opportunities
        for (const bookId of new Set(home.quotes.concat(away.quotes).map(q => q.bookId))) {
          const evHome = detectEV2Way(gameId, home.outcome, home.quotes, away.quotes, bookId);
          const evAway = detectEV2Way(gameId, away.outcome, away.quotes, home.quotes, bookId);
          if (evHome) results.push(evHome);
          if (evAway) results.push(evAway);
        }
      }
    }
  }

  return results;
}

// ===== Data Pipeline Integration =====
export function processLiveOpportunitiesData(gameData: any[]): AnyResult[] {
  const allResults: AnyResult[] = [];
  
  for (const game of gameData) {
    if (!game.gameID || !game.markets) continue;
    
    const outcomeSnapshots: OutcomeSnapshot[] = [];
    
    // Convert game data to outcome snapshots
    for (const market of game.markets) {
      const marketType = market.type?.toLowerCase();
      if (!marketType) continue;
      
      for (const outcome of market.outcomes || []) {
        const quotes: BookQuote[] = [];
        
        for (const book of outcome.books || []) {
          if (book.priceAmerican && book.bookId && book.lastUpdated) {
            quotes.push({
              bookId: book.bookId,
              priceAmerican: book.priceAmerican,
              lastUpdated: book.lastUpdated
            });
          }
        }
        
        if (quotes.length >= 2) {
          let outcomeId: OutcomeId;
          
          if (marketType === 'moneyline') {
            outcomeId = {
              market: 'moneyline',
              side: outcome.side === 'home' ? 'home' : 'away'
            };
          } else if (marketType === 'moneyline-3way') {
            outcomeId = {
              market: 'moneyline-3way',
              side: outcome.side as 'home' | 'draw' | 'away'
            };
          } else if (marketType === 'spread') {
            outcomeId = {
              market: 'spread',
              side: outcome.side === 'home' ? 'home' : 'away',
              line: parseFloat(outcome.line || '0')
            };
          } else if (marketType === 'total') {
            outcomeId = {
              market: 'total',
              side: outcome.side === 'over' ? 'over' : 'under',
              line: parseFloat(outcome.line || '0')
            };
          } else {
            continue;
          }
          
          outcomeSnapshots.push({
            gameId: game.gameID.toString(),
            outcome: outcomeId,
            quotes
          });
        }
      }
    }
    
    if (outcomeSnapshots.length > 0) {
      const gameResults = analyzeGameOpportunities(game.gameID.toString(), outcomeSnapshots);
      allResults.push(...gameResults);
    }
  }
  
  return allResults;
}