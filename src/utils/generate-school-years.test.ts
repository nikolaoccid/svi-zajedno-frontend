import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { generateSchoolYears } from './generate-school-years';

describe('generateSchoolYears', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-07T10:00:00Z'));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('offers the five years before and the four after the current year', () => {
    expect(generateSchoolYears()).toEqual([2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]);
  });

  it('leaves out years that already exist', () => {
    const years = generateSchoolYears([2025, 2026]);

    expect(years).not.toContain(2025);
    expect(years).not.toContain(2026);
    expect(years).toContain(2027);
  });

  it('ignores existing years outside the offered range', () => {
    expect(generateSchoolYears([1999])).toHaveLength(10);
  });
});
