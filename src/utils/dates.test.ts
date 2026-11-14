import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { backendFormattedDate } from './backend-formatted-date';
import { croatianDateFormat } from './croatian-date-format';
import { frontendFormattedDate } from './frontend-formatted-date';

describe('date helpers', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-07T10:00:00Z'));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  describe('croatianDateFormat', () => {
    it('formats an ISO string as dd.mm.yyyy', () => {
      expect(croatianDateFormat('2025-09-01T08:30:00Z')).toBe('01.09.2025');
    });

    it('falls back to today when no date is given', () => {
      expect(croatianDateFormat()).toBe('07.03.2026');
    });

    it('returns nothing when asked not to default and there is no date', () => {
      expect(croatianDateFormat(undefined, true)).toBeUndefined();
    });

    it('uses UTC, so a late-evening UTC time keeps its calendar day', () => {
      expect(croatianDateFormat('2025-12-31T23:30:00Z')).toBe('31.12.2025');
    });
  });

  describe('frontendFormattedDate', () => {
    it('formats an ISO string as yyyy-mm-dd', () => {
      expect(frontendFormattedDate('2025-09-01T08:30:00Z')).toBe('2025-09-01');
    });

    it('falls back to today when no date is given', () => {
      expect(frontendFormattedDate()).toBe('2026-03-07');
    });
  });

  describe('backendFormattedDate', () => {
    it('parses a string into a Date', () => {
      expect(backendFormattedDate('2025-09-01T08:30:00Z')).toEqual(new Date('2025-09-01T08:30:00Z'));
    });

    it('passes a Date through unchanged', () => {
      const date = new Date('2025-09-01T08:30:00Z');
      expect(backendFormattedDate(date)).toBe(date);
    });
  });
});
