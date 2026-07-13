import { POST } from './route';
import { db } from '@/lib/db';
import { getServerSession } from '@/lib/session';

jest.mock('next/server', () => ({
  NextResponse: {
    json: (body: any, init?: any) => ({
      status: init?.status || 200,
      json: async () => body,
    }),
  },
}));

jest.mock('@/lib/db', () => ({
  db: {
    $transaction: jest.fn(),
  },
}));

jest.mock('@/lib/session', () => ({
  getServerSession: jest.fn(),
}));

jest.mock('@/lib/quiz-utils', () => ({
  calculateQuizXP: jest.fn().mockReturnValue(50),
}));

describe('/api/dashboard/quiz-attempts', () => {
  const mockSession = { user: { id: 'user123' } };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST', () => {
    it('returns 401 if unauthorized', async () => {
      (getServerSession as jest.Mock).mockResolvedValueOnce(null);

      const response = await POST(new Request('http://localhost', { method: 'POST' }));
      expect(response.status).toBe(401);
    });

    it('returns 400 for invalid payload', async () => {
      (getServerSession as jest.Mock).mockResolvedValueOnce(mockSession);

      const request = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify({ score: 10 }), // missing topic and total
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
    });

    it('returns 400 if score is greater than total', async () => {
      (getServerSession as jest.Mock).mockResolvedValueOnce(mockSession);

      const request = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify({ topic: 'Finance', score: 11, total: 10 }),
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe('Score cannot be greater than total questions');
    });

    it('creates a quiz attempt if valid', async () => {
      (getServerSession as jest.Mock).mockResolvedValueOnce(mockSession);

      const payload = {
        topic: 'Investing',
        score: 8,
        total: 10,
      };

      const request = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      const mockAttempt = { id: 'attempt-1', ...payload, xpEarned: 50 };
      (db.$transaction as jest.Mock).mockImplementationOnce(async (callback) => {
        const tx = {
          quizAttempt: { create: jest.fn().mockResolvedValue(mockAttempt) },
          dashboardActivity: { create: jest.fn().mockResolvedValue({}) },
        };
        return await callback(tx);
      });

      const response = await POST(request);
      expect(response.status).toBe(201);

      const data = await response.json();
      expect(data.attempt).toEqual(mockAttempt);
      expect(db.$transaction).toHaveBeenCalled();
    });
  });
});
