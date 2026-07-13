import { PATCH } from './route';
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
    learningModuleProgress: {
      findFirst: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));

jest.mock('@/lib/session', () => ({
  getServerSession: jest.fn(),
}));

describe('/api/dashboard/learning/[moduleId]', () => {
  const mockSession = { user: { id: 'user123' } };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('PATCH', () => {
    it('returns 401 if unauthorized', async () => {
      (getServerSession as jest.Mock).mockResolvedValueOnce(null);

      const response = await PATCH(new Request('http://localhost', { method: 'PATCH' }), {
        params: Promise.resolve({ moduleId: 'm1' }),
      });
      expect(response.status).toBe(401);
    });

    it('returns 400 for invalid payload', async () => {
      (getServerSession as jest.Mock).mockResolvedValueOnce(mockSession);

      const request = new Request('http://localhost', {
        method: 'PATCH',
        body: JSON.stringify({ action: 'unknown_action' }),
      });

      const response = await PATCH(request, {
        params: Promise.resolve({ moduleId: 'm1' }),
      });
      expect(response.status).toBe(400);
    });

    it('returns 404 if module not found', async () => {
      (getServerSession as jest.Mock).mockResolvedValueOnce(mockSession);
      (db.learningModuleProgress.findFirst as jest.Mock).mockResolvedValueOnce(null);

      const request = new Request('http://localhost', {
        method: 'PATCH',
        body: JSON.stringify({ action: 'complete_lesson' }),
      });

      const response = await PATCH(request, {
        params: Promise.resolve({ moduleId: 'm1' }),
      });
      expect(response.status).toBe(404);
    });

    it('updates learning progress correctly', async () => {
      (getServerSession as jest.Mock).mockResolvedValueOnce(mockSession);
      
      const mockModule = {
        id: 'm1',
        title: 'Basics',
        lessons: 5,
        completedLessons: 2,
        sortOrder: 1,
      };
      
      (db.learningModuleProgress.findFirst as jest.Mock).mockResolvedValueOnce(mockModule);

      const mockUpdatedModules = [
        { id: 'm1', completedLessons: 3 },
      ];

      (db.$transaction as jest.Mock).mockImplementationOnce(async (callback) => {
        const tx = {
          learningModuleProgress: {
            update: jest.fn().mockResolvedValue({}),
            findFirst: jest.fn().mockResolvedValue(null),
            findMany: jest.fn().mockResolvedValue(mockUpdatedModules),
          },
          dashboardActivity: { create: jest.fn().mockResolvedValue({}) },
        };
        return await callback(tx);
      });

      const request = new Request('http://localhost', {
        method: 'PATCH',
        body: JSON.stringify({ action: 'complete_lesson' }),
      });

      const response = await PATCH(request, {
        params: Promise.resolve({ moduleId: 'm1' }),
      });
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.modules).toEqual(mockUpdatedModules);
    });
  });
});
