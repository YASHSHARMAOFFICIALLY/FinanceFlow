import { render, screen, act } from '@testing-library/react';
import LearningPath from './learningpath';

// Mock useScrollReveal hook for the header
jest.mock('@/hooks/useScrollRevel', () => ({
  useScrollReveal: () => ({ current: null })
}));

describe('LearningPath', () => {
  beforeAll(() => {
    global.IntersectionObserver = class {
      constructor(callback) {
        this.callback = callback;
      }
      observe(el) {
        this.callback([{ isIntersecting: true, target: el }]);
      }
      unobserve() {}
      disconnect() {}
    };
  });

  afterAll(() => {
    delete global.IntersectionObserver;
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('renders learning path header', () => {
    render(<LearningPath />);
    expect(screen.getByText('Your path to financial mastery')).toBeInTheDocument();
    expect(screen.getByText('Your Progress')).toBeInTheDocument();
  });

  it('renders all learning steps', () => {
    render(<LearningPath />);
    expect(screen.getByText('Budgeting Basics')).toBeInTheDocument();
    expect(screen.getByText('Emergency Fund')).toBeInTheDocument();
    expect(screen.getByText('Mutual Funds & SIPs')).toBeInTheDocument();
    expect(screen.getByText('Stock Market Basics')).toBeInTheDocument();
    expect(screen.getByText('Long-term Wealth Building')).toBeInTheDocument();
  });

  it('handles animation delays correctly', () => {
    render(<LearningPath />);
    act(() => {
      jest.runAllTimers();
    });
    // Element should still be present
    expect(screen.getByText('Step 01')).toBeInTheDocument();
  });
});
