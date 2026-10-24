import { render, screen, act } from '@testing-library/react';
import FinanceTools from './financetool';

describe('FinanceTools', () => {
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
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('renders section header', () => {
    render(<FinanceTools />);
    expect(screen.getByText('Powerful calculators at your fingertips')).toBeInTheDocument();
    expect(screen.getByText(/All the financial tools you need/)).toBeInTheDocument();
  });

  it('renders all tool cards', () => {
    render(<FinanceTools />);
    
    // Check for some tool names
    expect(screen.getByText('SIP Calculator')).toBeInTheDocument();
    expect(screen.getByText('Compound Interest')).toBeInTheDocument();
    expect(screen.getByText('Budget Planner')).toBeInTheDocument();
    expect(screen.getByText('Net Worth Tracker')).toBeInTheDocument();
    expect(screen.getByText('EMI Calculator')).toBeInTheDocument();
    expect(screen.getByText('Goal Planner')).toBeInTheDocument();
  });

  it('handles intersection observer delays', () => {
    render(<FinanceTools />);
    act(() => {
      jest.runAllTimers();
    });
    // The delay shouldn't cause errors
    expect(screen.getByText('SIP Calculator')).toBeInTheDocument();
  });
});
