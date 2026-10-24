import {
  signupSchema,
  dashboardGoalSchema,
  dashboardGoalUpdateSchema,
  portfolioContributionSchema,
  quizAttemptSchema,
  learningProgressUpdateSchema,
} from './validators';

describe('validators', () => {
  describe('signupSchema', () => {
    it('should validate valid data', () => {
      const result = signupSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123',
      });
      expect(result.success).toBe(true);
    });

    it('should fail if name is too short', () => {
      const result = signupSchema.safeParse({
        name: 'J',
        email: 'john@example.com',
        password: 'Password123',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Name must be atleast 2 characters');
      }
    });

    it('should fail if password does not contain uppercase', () => {
      const result = signupSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Must contain uppercase');
      }
    });
  });

  describe('dashboardGoalSchema', () => {
    it('should validate valid data', () => {
      const result = dashboardGoalSchema.safeParse({
        name: 'Vacation',
        emoji: '🏖️',
        targetAmount: 5000,
        currentAmount: 1000,
        color: '#ff0000',
      });
      expect(result.success).toBe(true);
    });

    it('should fail if targetAmount is negative', () => {
      const result = dashboardGoalSchema.safeParse({
        name: 'Vacation',
        emoji: '🏖️',
        targetAmount: -5000,
        currentAmount: 1000,
        color: '#ff0000',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('quizAttemptSchema', () => {
    it('should validate valid data', () => {
      const result = quizAttemptSchema.safeParse({
        topic: 'Finance Basics',
        score: 8,
        total: 10,
      });
      expect(result.success).toBe(true);
    });

    it('should fail if score is negative', () => {
      const result = quizAttemptSchema.safeParse({
        topic: 'Finance Basics',
        score: -1,
        total: 10,
      });
      expect(result.success).toBe(false);
    });
  });
});
