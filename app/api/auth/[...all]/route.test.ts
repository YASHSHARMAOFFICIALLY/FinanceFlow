import { POST, GET, runtime, dynamic, maxDuration } from './route';
import { toNextJsHandler } from 'better-auth/next-js';

jest.mock('@/lib/auth', () => ({
  auth: {
    /* mock auth object */
  },
}));

jest.mock('better-auth/next-js', () => ({
  toNextJsHandler: jest.fn(() => ({
    POST: jest.fn(),
    GET: jest.fn(),
  })),
}));

describe('Auth API Route', () => {
  it('exports correctly configured Next.js route handlers', () => {
    // Assert constants
    expect(runtime).toBe('nodejs');
    expect(dynamic).toBe('force-dynamic');
    expect(maxDuration).toBe(30);

    // Assert that handler wrapper was called
    expect(toNextJsHandler).toHaveBeenCalled();

    // Assert POST and GET are defined
    expect(POST).toBeDefined();
    expect(GET).toBeDefined();
  });
});
