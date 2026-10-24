import { PATCH, DELETE } from './route';
import { getServerSession } from '@/lib/session';
import { db } from '@/lib/db';

jest.mock('next/server', () => ({
  NextResponse: {
    json: (body: any, init?: any) => ({
      status: init?.status || 200,
      json: async () => body,
    }),
  },
}));

jest.mock('@/lib/session', () => ({
  getServerSession: jest.fn(),
}));

jest.mock('@/lib/db', () => ({
  db: {
    dashboardGoal: {
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    dashboardActivity: {
      create: jest.fn(),
    },
    $transaction: jest.fn((callback) => callback(db)),
  },
}));

jest.mock('@/lib/goal-utils', () => ({
  calculateMonthlyNeeded: jest.fn().mockReturnValue(100),
}));

describe('Goals API Route', () => {
  const mockSession = { user: { id: 'user-1' } };
  const mockGoal = {
    id: 'goal-1',
    userId: 'user-1',
    name: 'Test Goal',
    targetAmount: 1000,
    currentAmount: 500,
    emoji: '🎯',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('PATCH', () => {
    it('returns 401 if unauthorized', async () => {
      (getServerSession as jest.Mock).mockResolvedValue(null);
      const req = new Request('http://localhost', { method: 'PATCH', body: JSON.stringify({}) });
      
      const res = await PATCH(req, { params: Promise.resolve({ goalId: 'goal-1' }) });
      expect(res.status).toBe(401);
    });

    it('returns 404 if goal not found', async () => {
      (getServerSession as jest.Mock).mockResolvedValue(mockSession);
      (db.dashboardGoal.findFirst as jest.Mock).mockResolvedValue(null);
      const req = new Request('http://localhost', { method: 'PATCH', body: JSON.stringify({}) });
      
      const res = await PATCH(req, { params: Promise.resolve({ goalId: 'goal-1' }) });
      expect(res.status).toBe(404);
    });

    it('updates goal successfully', async () => {
      (getServerSession as jest.Mock).mockResolvedValue(mockSession);
      (db.dashboardGoal.findFirst as jest.Mock).mockResolvedValue(mockGoal);
      (db.dashboardGoal.update as jest.Mock).mockResolvedValue({ ...mockGoal, currentAmount: 600 });
      
      const req = new Request('http://localhost', { 
        method: 'PATCH', 
        body: JSON.stringify({ currentAmount: 600 }) 
      });
      
      const res = await PATCH(req, { params: Promise.resolve({ goalId: 'goal-1' }) });
      expect(res.status).toBe(200);
      
      const json = await res.json();
      expect(json.goal.currentAmount).toBe(600);
      expect(db.dashboardGoal.update).toHaveBeenCalled();
      expect(db.dashboardActivity.create).toHaveBeenCalled();
    });
  });

  describe('DELETE', () => {
    it('returns 401 if unauthorized', async () => {
      (getServerSession as jest.Mock).mockResolvedValue(null);
      const req = new Request('http://localhost', { method: 'DELETE' });
      
      const res = await DELETE(req, { params: Promise.resolve({ goalId: 'goal-1' }) });
      expect(res.status).toBe(401);
    });

    it('deletes goal successfully', async () => {
      (getServerSession as jest.Mock).mockResolvedValue(mockSession);
      (db.dashboardGoal.findFirst as jest.Mock).mockResolvedValue(mockGoal);
      
      const req = new Request('http://localhost', { method: 'DELETE' });
      
      const res = await DELETE(req, { params: Promise.resolve({ goalId: 'goal-1' }) });
      expect(res.status).toBe(200);
      
      expect(db.dashboardGoal.delete).toHaveBeenCalledWith({ where: { id: 'goal-1' } });
      expect(db.dashboardActivity.create).toHaveBeenCalled();
    });
  });
});
