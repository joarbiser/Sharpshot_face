// src/lib/eventStatus.test.ts
import { describe, it, expect } from 'vitest';
import { computeTruthStatus, mapProviderStatusToRaw, type RawStatus } from './eventStatus';

const NOW = '2025-08-14T23:59:00Z';
const START = '2025-08-15T00:30:00Z'; // 31 min in the future relative to NOW

describe('eventStatus', () => {
  describe('computeTruthStatus', () => {
    it('scheduled stays UPCOMING before start', () => {
      expect(computeTruthStatus('scheduled', '2025-08-14T23:00:00Z', START)).toBe('UPCOMING');
    });

    it('do not mark LIVE based only on time at/after start', () => {
      expect(computeTruthStatus('scheduled', '2025-08-15T00:31:00Z', '2025-08-15T00:30:00Z')).toBe('UPCOMING');
    });

    it('explicit live variants are LIVE', () => {
      expect(computeTruthStatus('in_progress' as RawStatus, NOW, START)).toBe('LIVE');
      expect(computeTruthStatus('1H' as RawStatus, NOW, START)).toBe('LIVE');
      expect(computeTruthStatus('Q2' as RawStatus, NOW, START)).toBe('LIVE');
      expect(computeTruthStatus('live' as RawStatus, NOW, START)).toBe('LIVE');
    });

    it('final/ended variants are FINISHED', () => {
      expect(computeTruthStatus('final' as RawStatus, NOW, START)).toBe('FINISHED');
      expect(computeTruthStatus('ft' as RawStatus, NOW, START)).toBe('FINISHED');
      expect(computeTruthStatus('completed' as RawStatus, NOW, START)).toBe('FINISHED');
    });

    it('unknown stays UNKNOWN (we refuse to lie)', () => {
      expect(computeTruthStatus('unknown', NOW, START)).toBe('UNKNOWN');
      expect(computeTruthStatus('unknown', NOW, START)).toBe('UNKNOWN');
    });

    it('postponed/cancelled are FINISHED', () => {
      expect(computeTruthStatus('abandoned' as RawStatus, NOW, START)).toBe('FINISHED');
    });

    it('pre-game statuses stay UPCOMING regardless of time', () => {
      // Even if current time is after start time, if status is not_started, keep as UPCOMING
      expect(computeTruthStatus('not_started', '2025-08-15T00:45:00Z', '2025-08-15T00:30:00Z')).toBe('UPCOMING');
      expect(computeTruthStatus('scheduled', '2025-08-15T01:00:00Z', '2025-08-15T00:30:00Z')).toBe('UPCOMING');
    });
  });

  describe('mapProviderStatusToRaw', () => {
    it('provider mapping covers common synonyms', () => {
      expect(mapProviderStatusToRaw('Not_Started')).toBe('not_started');
      expect(mapProviderStatusToRaw('LIVE')).toBe('live');
      expect(mapProviderStatusToRaw('q3')).toBe('Q3');
      expect(mapProviderStatusToRaw('Canceled')).toBe('abandoned');
    });

    it('handles case variations and underscores', () => {
      expect(mapProviderStatusToRaw('IN_PROGRESS')).toBe('in_progress');
      expect(mapProviderStatusToRaw('halftime')).toBe('HT'); // Maps to normalized format
      expect(mapProviderStatusToRaw('FINAL')).toBe('final');
      expect(mapProviderStatusToRaw('SCHEDULED')).toBe('scheduled');
    });

    it('maps sport-specific statuses', () => {
      expect(mapProviderStatusToRaw('1st')).toBe('1H');
      expect(mapProviderStatusToRaw('2nd')).toBe('2H');
      expect(mapProviderStatusToRaw('3rd')).toBe('Q3');
      expect(mapProviderStatusToRaw('4th')).toBe('Q4');
      expect(mapProviderStatusToRaw('OT')).toBe('OT'); // Maps to normalized format
    });

    it('handles unknown statuses gracefully', () => {
      expect(mapProviderStatusToRaw('weird_custom_status')).toBe('weird_custom_status');
      expect(mapProviderStatusToRaw('')).toBe('unknown');
    });
  });
});