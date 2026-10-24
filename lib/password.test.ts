import { hashPassword, comparePassword } from './password';
import bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('password utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('hashPassword', () => {
    it('should hash password with bcrypt', async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashed-password');
      
      const result = await hashPassword('my-password');
      
      expect(bcrypt.hash).toHaveBeenCalledWith('my-password', 12);
      expect(result).toBe('hashed-password');
    });
  });

  describe('comparePassword', () => {
    it('should compare password with hash', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
      
      const result = await comparePassword('my-password', 'hashed-password');
      
      expect(bcrypt.compare).toHaveBeenCalledWith('my-password', 'hashed-password');
      expect(result).toBe(true);
    });
  });
});
