import { GET, POST } from './route';
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

// Mock dependencies
jest.mock('@/lib/db', () => ({
  db: {
    dashboardGoal: {
      findMany: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));

jest.mock('@/lib/session', () => ({
  getServerSession: jest.fn(),
}));

describe('/api/dashboard/goals', () => {
  const mockSession = { user: { id: 'user123' } };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('returns 401 if unauthorized', async () => {
      (getServerSession as jest.Mock).mockResolvedValueOnce(null);

      const response = await GET();
      expect(response.status).toBe(401);

      const data = await response.json();
      expect(data.error).toBe('Unauthorized');
    });

    it('returns goals if authorized', async () => {
      (getServerSession as jest.Mock).mockResolvedValueOnce(mockSession);
      const mockGoals = [
        { id: '1', name: 'Goal 1' },
        { id: '2', name: 'Goal 2' },
      ];
      (db.dashboardGoal.findMany as jest.Mock).mockResolvedValueOnce(mockGoals);

      const response = await GET();
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.goals).toEqual(mockGoals);
      expect(db.dashboardGoal.findMany).toHaveBeenCalledWith({
        where: { userId: 'user123' },
        orderBy: [{ achieved: 'asc' }, { createdAt: 'asc' }],
      });
    });
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
        body: JSON.stringify({ name: 'G' }), // name too short, missing required fields
      });

      const response = await POST(request);
      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data.error).toBeDefined();
    });

    it('creates a goal if valid', async () => {
      (getServerSession as jest.Mock).mockResolvedValueOnce(mockSession);

      const newGoalData = {
        name: 'New Car',
        emoji: '🚗',
        targetAmount: 20000,
        currentAmount: 5000,
        color: '#000000',
      };

      const request = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify(newGoalData),
      });

      const mockCreatedGoal = { id: 'goal-1', ...newGoalData };
      (db.$transaction as jest.Mock).mockImplementationOnce(async (callback) => {
        // mock tx
        const tx = {
          dashboardGoal: { create: jest.fn().mockResolvedValue(mockCreatedGoal) },
          dashboardActivity: { create: jest.fn().mockResolvedValue({}) },
        };
        return await callback(tx);
      });

      const response = await POST(request);
      expect(response.status).toBe(201);

      const data = await response.json();
      expect(data.goal).toEqual(mockCreatedGoal);
      expect(db.$transaction).toHaveBeenCalled();
    });
  });
});
