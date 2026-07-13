import { getServerSession } from './session';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

jest.mock('@/lib/auth', () => ({
  auth: {
    api: {
      getSession: jest.fn(),
    },
  },
}));

jest.mock('next/headers', () => ({
  headers: jest.fn(),
}));

describe('getServerSession', () => {
  it('calls auth.api.getSession with resolved headers', async () => {
    const mockHeaders = new Headers({ 'x-test': '123' });
    (headers as jest.Mock).mockResolvedValue(mockHeaders);
    
    const mockSession = { user: { name: 'Test' } };
    (auth.api.getSession as unknown as jest.Mock).mockResolvedValue(mockSession);

    const session = await getServerSession();
    
    expect(headers).toHaveBeenCalled();
    expect(auth.api.getSession).toHaveBeenCalledWith({ headers: mockHeaders });
    expect(session).toBe(mockSession);
  });
});
