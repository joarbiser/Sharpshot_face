// server/normalizeEvent.ts
import { nowUtcISO, toUtcISO } from '../src/lib/time';
import { mapProviderStatusToRaw, computeTruthStatus, NormalizedEvent } from '../src/lib/eventStatus';

export function normalizeEventFromProvider(p: any): NormalizedEvent {
  // Handle various time field names from areyouwatchingthis API
  const startISO = p.gameTime || p.time || p.date || p.start_time_utc || p.start_time || p.commence_time || p.kickoff;
  let startTimeUtc: string;
  
  if (startISO) {
    try {
      // Convert to proper UTC ISO format
      startTimeUtc = toUtcISO(startISO) || new Date(startISO).toISOString();
    } catch (error) {
      console.warn('Failed to parse start time:', startISO, error);
      startTimeUtc = new Date().toISOString(); // fallback to now
    }
  } else {
    startTimeUtc = new Date().toISOString(); // fallback to now
  }

  // Extract provider raw status from various possible fields
  const providerRawStatus = (
    p.status || 
    p.game_status || 
    p.phase || 
    p.progress ||
    p.state ||
    p.gameStatus ||
    p.matchStatus ||
    ''
  ).toString();
  
  const normalizedRawStatus = mapProviderStatusToRaw(providerRawStatus);

  const truthStatus = computeTruthStatus(normalizedRawStatus, nowUtcISO() || '', startTimeUtc);
  const eventId = String(p.gameID || p.id || p.event_id || Math.random());

  // Enhanced sport normalization for expanded coverage
  const rawSport = String(p.sport || p.league || 'UNKNOWN').toLowerCase();
  let normalizedSport = rawSport.toUpperCase();
  
  // Normalize sport names for consistent filtering
  if (rawSport.includes('mma') || rawSport.includes('ufc') || rawSport.includes('mixed martial arts')) {
    normalizedSport = 'MMA';
  } else if (rawSport.includes('cricket')) {
    normalizedSport = 'CRICKET';
  } else if (rawSport.includes('racing') || rawSport.includes('motorsports') || rawSport.includes('nascar') || rawSport.includes('f1')) {
    normalizedSport = 'RACING';
  } else if (rawSport.includes('football') && !rawSport.includes('american')) {
    normalizedSport = 'SOCCER';
  } else if (rawSport.includes('american football') || rawSport === 'nfl') {
    normalizedSport = 'NFL';
  }

  const event: NormalizedEvent = {
    id: eventId,
    league: normalizedSport,
    homeTeam: String(p.homeTeamName || p.team2Name || p.home_team || p.home || p.team2 || 'Team B'),
    awayTeam: String(p.awayTeamName || p.team1Name || p.away_team || p.away || p.team1 || 'Team A'),
    startTimeUtc,
    providerRawStatus,
    normalizedRawStatus,
    truthStatus,
    period: p.period || p.half || p.quarter || undefined,
    clock: p.clock || p.timeLeft || p.time_remaining || null
  };

  // Runtime validation (dev-only)
  if (process.env.NODE_ENV !== 'production') {
    const isLiveVariant = ['in_progress','live','1H','2H','HT','Q1','Q2','Q3','Q4','OT'].includes(normalizedRawStatus ?? '');
    if (truthStatus === 'LIVE' && !isLiveVariant) {
      console.warn('[STATUS-MISMATCH] Live truthStatus but non-live normalizedRawStatus:', eventId, providerRawStatus, startTimeUtc);
    }
    
    // Check for provider claiming in_progress before start time
    const now = Date.now();
    const startMs = Date.parse(startTimeUtc);
    if (!isNaN(startMs) && now < startMs && isLiveVariant) {
      console.warn('[PROVIDER-BUG] Provider claims in_progress before start time:', eventId, providerRawStatus, startTimeUtc);
    }
  }

  return event;
}