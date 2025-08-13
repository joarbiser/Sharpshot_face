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

// Main integration function that can be called from existing odds refresh points
export function processSnapshotsForOpportunities(
  snapshots: OutcomeSnapshot[], 
  targetBookId: string = 'DraftKings'
) {
  return computeOpportunities({
    snapshots,
    groupByOutcome,
    getOppositeKey: getOppositeKeyFrom,
    getGameStart: getGameStartTime,
    targetBookId
  });
}