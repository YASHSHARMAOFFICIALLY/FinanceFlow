import { POST, DELETE } from './route';
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
    portfolioSnapshot: {
      findFirst: jest.fn(),
      createMany: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));

jest.mock('@/lib/session', () => ({
  getServerSession: jest.fn(),
}));

describe('/api/dashboard/portfolio', () => {
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
        body: JSON.stringify({ amountInvested: -100 }), // must be positive
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
    });

    it('returns 409 if portfolio history is not initialized', async () => {
      (getServerSession as jest.Mock).mockResolvedValueOnce(mockSession);
      (db.portfolioSnapshot.findFirst as jest.Mock).mockResolvedValueOnce(null);

      const request = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify({ amountInvested: 100 }),
      });

      const response = await POST(request);
      expect(response.status).toBe(409);
    });

    it('updates portfolio and returns new values', async () => {
      (getServerSession as jest.Mock).mockResolvedValueOnce(mockSession);
      
      const latestPoint = {
        invested: 1000,
        value: 1200,
      };
      (db.portfolioSnapshot.findFirst as jest.Mock).mockResolvedValueOnce(latestPoint);

      (db.$transaction as jest.Mock).mockImplementationOnce(async (callback) => {
        const tx = {
          portfolioSnapshot: { createMany: jest.fn().mockResolvedValue({}) },
          dashboardActivity: { create: jest.fn().mockResolvedValue({}) },
        };
        return await callback(tx);
      });

      const request = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify({ amountInvested: 500 }),
      });

      const response = await POST(request);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.portfolio.investedValue).toBe(1500);
      expect(data.portfolio.currentValue).toBe(1700);
      expect(data.portfolio.totalReturn).toBe(200); // 1700 - 1500
    });
  });

  describe('DELETE', () => {
    it('returns 401 if unauthorized', async () => {
      (getServerSession as jest.Mock).mockResolvedValueOnce(null);

      const response = await DELETE();
      expect(response.status).toBe(401);
    });

    it('resets portfolio to zero', async () => {
      (getServerSession as jest.Mock).mockResolvedValueOnce(mockSession);
      
      (db.$transaction as jest.Mock).mockImplementationOnce(async (callback) => {
        const tx = {
          portfolioSnapshot: { createMany: jest.fn().mockResolvedValue({}) },
          dashboardActivity: { create: jest.fn().mockResolvedValue({}) },
        };
        return await callback(tx);
      });

      const response = await DELETE();
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.portfolio.investedValue).toBe(0);
      expect(data.portfolio.currentValue).toBe(0);
      expect(data.portfolio.totalReturn).toBe(0);
    });
  });
});
