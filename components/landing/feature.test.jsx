import { render, screen } from '@testing-library/react';
import Features from './feature';

describe('Features', () => {
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

  it('renders header section', () => {
    render(<Features />);
    expect(screen.getByText('Everything you need to take control of your money')).toBeInTheDocument();
  });

  it('renders features and mockups', () => {
    render(<Features />);
    
    // Feature 1
    expect(screen.getByText('Learn Finance With Quizzes')).toBeInTheDocument();
    expect(screen.getByText(/What is a key benefit of compound interest/)).toBeInTheDocument();

    // Feature 2
    expect(screen.getByText('Track SIP & Investments')).toBeInTheDocument();
    expect(screen.getByText('Portfolio Growth')).toBeInTheDocument();

    // Feature 3
    expect(screen.getAllByText('Financial Health Score')[0]).toBeInTheDocument();
    expect(screen.getByText('Debt-to-Income')).toBeInTheDocument();
  });
});
