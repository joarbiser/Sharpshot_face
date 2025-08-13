import {
  type OutcomeSnapshot, type AnyResult,
  detectEV2Way, detectArb2Way, detectArb3Way,
  detectMiddleTotals, detectMiddleSpreads,
  mergeAndPrioritize, CONFIG
} from '../lib/tradingMath';

// Provide a function the app can call after odds refresh.
// `snapshotsByOutcomeKey` must map normalized keys to snapshots,
// and `lookupOpposite(key)` should return the opposing outcome key for same line.
// `getGameStart(gameId)` must return numeric epoch ms used for secondary sorting.
export function computeOpportunities(params: {
  snapshots: OutcomeSnapshot[];
  groupByOutcome: (s: OutcomeSnapshot) => string;
  getOppositeKey: (key: string) => string | null;
  getGameStart: (gameId: string) => number;
  targetBookId: string;           // the book user is considering (for EV)
}) {
  const { snapshots, groupByOutcome, getOppositeKey, getGameStart, targetBookId } = params;

  // index
  const byKey = new Map<string, OutcomeSnapshot>();
  for (const s of snapshots) byKey.set(groupByOutcome(s), s);

  const evList: AnyResult[] = [];
  const arb2List: AnyResult[] = [];
  const arb3List: AnyResult[] = [];
  const midList: AnyResult[] = [];

  // Pairwise scan for EV and 2-way arbs / middles
  for (const [key, snap] of byKey.entries()) {
    const oppKey = getOppositeKey(key);
    if (!oppKey) continue;
    const opp = byKey.get(oppKey);
    if (!opp) continue;

    // EV (2-way)
    const ev = detectEV2Way(snap.gameId, snap.outcome, snap.quotes, opp.quotes, targetBookId);
    if (ev) evList.push(ev);

    // Arb 2-way
    const arb2 = detectArb2Way(snap.gameId, snap, opp, 100);
    if (arb2) arb2List.push(arb2);

    // Middles (totals or spreads)
    if (snap.outcome.market === 'total' && opp.outcome.market === 'total') {
      const mid = snap.outcome.side === 'over'
        ? detectMiddleTotals(snap.gameId, snap, opp, 100)
        : detectMiddleTotals(snap.gameId, opp, snap, 100);
      if (mid) midList.push(mid);
    }
    if (snap.outcome.market === 'spread' && opp.outcome.market === 'spread') {
      // Expect pairing: home negative vs away positive
      const isHome = snap.outcome.side === 'home';
      const home = isHome ? snap : opp;
      const away = isHome ? opp : snap;
      const mid = detectMiddleSpreads(snap.gameId, home, away, 100);
      if (mid) midList.push(mid);
    }
  }

  // Optional: 3-way markets detection
  // If we have moneyline-3way, group by game and compute Arb3 on best odds
  // (Assumes client provides three keys per game: home/draw/away)
  // Skipping for now unless we already have normalized 1X2 snapshots.

  // Merge & sort (priority inside)
  const merged = mergeAndPrioritize([evList, arb2List, arb3List, midList], getGameStart);
  return { merged, counts: { ev: evList.length, arb2: arb2List.length, arb3: arb3List.length, mid: midList.length } };
}