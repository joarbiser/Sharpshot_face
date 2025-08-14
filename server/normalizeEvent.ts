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
    ''
  ).toString();
  
  const normalizedRawStatus = mapProviderStatusToRaw(providerRawStatus);

  const event: NormalizedEvent = {
    id: String(p.gameID || p.id || p.event_id || Math.random()),
    league: String(p.sport || p.league || 'UNKNOWN').toUpperCase(),
    homeTeam: String(p.homeTeamName || p.team2Name || p.home_team || p.home || p.team2 || 'Team B'),
    awayTeam: String(p.awayTeamName || p.team1Name || p.away_team || p.away || p.team1 || 'Team A'),
    startTimeUtc,
    providerRawStatus,
    normalizedRawStatus,
    truthStatus: computeTruthStatus(normalizedRawStatus, nowUtcISO() || '', startTimeUtc),
    period: p.period || p.half || p.quarter || undefined,
    clock: p.clock || p.timeLeft || p.time_remaining || null
  };

  return event;
}