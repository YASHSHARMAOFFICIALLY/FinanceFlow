import { calculateMonthlyNeeded } from './goal-utils';

describe('calculateMonthlyNeeded', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T00:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return 0 if targetDate is not provided', () => {
    expect(calculateMonthlyNeeded(1000, 500)).toBe(0);
    expect(calculateMonthlyNeeded(1000, 500, null)).toBe(0);
  });

  it('should return 0 if currentAmount is greater than or equal to targetAmount', () => {
    expect(calculateMonthlyNeeded(1000, 1000, new Date('2024-12-01T00:00:00Z'))).toBe(0);
    expect(calculateMonthlyNeeded(1000, 1200, new Date('2024-12-01T00:00:00Z'))).toBe(0);
  });

  it('should return 0 if targetDate is in the past', () => {
    expect(calculateMonthlyNeeded(1000, 500, new Date('2023-12-01T00:00:00Z'))).toBe(0);
  });

  it('should calculate the correct monthly amount for future dates', () => {
    // 1000 target, 0 current, target is 2024-10-01.
    // 2024-10-01 minus 2024-01-01 -> 9 months remaining
    // 1000 / 9 = 111.11... -> Math.ceil -> 112
    expect(calculateMonthlyNeeded(1000, 0, new Date('2024-10-01T00:00:00Z'))).toBe(112);
  });

  it('should handle target date in the current month', () => {
    // 2024-01-15 minus 2024-01-01 -> 0 months -> Math.max(1, 0) = 1 month
    // 1000 / 1 = 1000
    expect(calculateMonthlyNeeded(1000, 0, new Date('2024-01-15T00:00:00Z'))).toBe(1000);
  });

  it('should handle fractional target amount properly', () => {
    // target 1000.5, current 500.2
    // 10 months away (2024-11-01) => 10 months remaining
    // (1000.5 - 500.2) / 10 = 500.3 / 10 = 50.03 -> ceil -> 51
    expect(calculateMonthlyNeeded(1000.5, 500.2, new Date('2024-11-01T00:00:00Z'))).toBe(51);
  });
});
