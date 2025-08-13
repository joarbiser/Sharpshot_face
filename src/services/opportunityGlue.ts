import { computeOpportunities } from './opportunityEngine';
import type { OutcomeSnapshot, OutcomeId } from '../lib/tradingMath';

export function outcomeKey(o: OutcomeId): string {
  switch (o.market) {
    case 'moneyline':      return `ml:${o.side}`;
    case 'moneyline-3way': return `1x2:${o.side}`;
    case 'spread':         return `sp:${o.side}:${o.line}`;
    case 'total':          return `tot:${o.side}:${o.line}`;
  }
}

export function groupByOutcome(s: OutcomeSnapshot): string {
  return `${s.gameId}|${outcomeKey(s.outcome)}`;
}

export function getOppositeKeyFrom(key: string): string | null {
  // Expect format gameId|tag
  const [gameId, tag] = key.split('|');
  if (!gameId || !tag) return null;
  
  if (tag.startsWith('ml:')) {
    const side = tag.split(':')[1];
    const opp  = side === 'home' ? 'away' : 'home';
    return `${gameId}|ml:${opp}`;
  }
  
  if (tag.startsWith('sp:')) {
    const [_, side, line] = tag.split(':');
    const opp = side === 'home' ? 'away' : 'home';
    return `${gameId}|sp:${opp}:${line}`;
  }
  
  if (tag.startsWith('tot:')) {
    const [_, side, line] = tag.split(':');
    const opp = side === 'over' ? 'under' : 'over';
    return `${gameId}|tot:${opp}:${line}`;
  }
  
  // 1x2 has 2 opposites; handle elsewhere if needed
  return null;
}

// Helper function to get game start time (placeholder - should integrate with existing schedule cache)
export function getGameStartTime(gameId: string): number {
  // This should integrate with your existing game schedule cache
  // For now, return current time as fallback
  return Date.now();
}

// Guardrails function to filter stale quotes (older than 120 seconds)
export function filterStaleQuotes(snapshots: OutcomeSnapshot[]): OutcomeSnapshot[] {
  const staleThreshold = 120_000; // 120 seconds in ms
  const now = Date.now();
  
  return snapshots.map(snapshot => ({
    ...snapshot,
    quotes: snapshot.quotes.filter(quote => {
      const quoteTime = new Date(quote.lastUpdated).getTime();
      return (now - quoteTime) <= staleThreshold;
    })
  })).filter(snapshot => snapshot.quotes.length > 0); // Remove snapshots with no valid quotes
}

// Main integration function that can be called from existing odds refresh points
export function processSnapshotsForOpportunities(
  snapshots: OutcomeSnapshot[], 
  targetBookId: string = 'DraftKings'
) {
  // Apply guardrails: filter stale quotes
  const freshSnapshots = filterStaleQuotes(snapshots);
  
  return computeOpportunities({
    snapshots: freshSnapshots,
    groupByOutcome,
    getOppositeKey: getOppositeKeyFrom,
    getGameStart: getGameStartTime,
    targetBookId
  });
}

// Integration hook for odds refresh points
export async function onOddsRefreshed(
  snapshots: OutcomeSnapshot[], 
  getGameStart: (gameId: string) => number, 
  targetBookId: string
) {
  const { merged, counts } = computeOpportunities({
    snapshots: filterStaleQuotes(snapshots),
    groupByOutcome,
    getOppositeKey: getOppositeKeyFrom,
    getGameStart,
    targetBookId
  });
  
  // Expose `merged` to state; do not alter UI components here.
  // e.g., store.dispatch(opportunitiesSlice.actions.setData(merged))
  return { merged, counts };
}