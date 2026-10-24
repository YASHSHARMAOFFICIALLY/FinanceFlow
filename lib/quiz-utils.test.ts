import { calculateQuizXP } from './quiz-utils';

describe('calculateQuizXP', () => {
  it('returns 10 when score is 0', () => {
    expect(calculateQuizXP(0)).toBe(10);
  });

  it('multiplies score by 10', () => {
    expect(calculateQuizXP(5)).toBe(50);
    expect(calculateQuizXP(10)).toBe(100);
    expect(calculateQuizXP(40)).toBe(400);
  });

  it('caps at 500', () => {
    expect(calculateQuizXP(50)).toBe(500);
    expect(calculateQuizXP(100)).toBe(500);
  });
});
