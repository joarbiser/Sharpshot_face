// Formatting helpers for Trading Terminal
import { formatDistanceToNow } from 'date-fns';

export function toAmerican(odds: number): string {
  if (odds >= 0) {
    return `+${Math.round(odds)}`;
  }
  return `${Math.round(odds)}`;
}

export function toPercent(x: number, withSign = false): string {
  const pct = (x * 100).toFixed(1);
  if (withSign && x > 0) {
    return `+${pct}%`;
  }
  return `${pct}%`;
}

export function toRelTime(timestamp: string | Date): string {
  try {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    if (isNaN(date.getTime())) return '—';
    
    return formatDistanceToNow(date, { addSuffix: true })
      .replace('about ', '')
      .replace(' ago', ' ago');
  } catch {
    return '—';
  }
}

export function fmtMarket(row: any): string {
  const { propType, sideLabel, marketLine } = row;
  
  if (propType === 'moneyline' && sideLabel) {
    return `Moneyline – ${sideLabel}`;
  }
  
  if (propType === 'spread' && sideLabel && marketLine) {
    return `Spread – ${marketLine} ${sideLabel}`;
  }
  
  if (propType === 'total' && sideLabel && marketLine) {
    return `Total – ${sideLabel} ${marketLine}`;
  }
  
  return propType || 'Market';
}

export function getEVColor(evPct: number): string {
  if (evPct <= -0.02) return 'text-red-500';
  if (evPct < 0) return 'text-orange-500';
  if (evPct === 0) return 'text-yellow-500';
  if (evPct <= 0.03) return 'text-lime-500';
  return 'text-green-500';
}