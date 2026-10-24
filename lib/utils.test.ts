import { cn } from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('should merge tailwind classes', () => {
      expect(cn('p-4', 'm-4')).toBe('p-4 m-4');
    });

    it('should handle conditional classes', () => {
      expect(cn('p-4', true && 'm-4', false && 'bg-red-500')).toBe('p-4 m-4');
    });

    it('should resolve tailwind class conflicts', () => {
      expect(cn('p-4', 'p-8')).toBe('p-8');
      expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    });

    it('should handle arrays of classes', () => {
      expect(cn(['p-4', 'm-4'], 'text-center')).toBe('p-4 m-4 text-center');
    });
  });
});
