import { render, screen, fireEvent, act } from '@testing-library/react';
import FinanceConcepts from './FinanceConcept';

// Mock useScrollReveal hook for the header
jest.mock('@/hooks/useScrollRevel', () => ({
  useScrollReveal: () => ({ current: null })
}));

describe('FinanceConcepts', () => {
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
    render(<FinanceConcepts />);
    expect(screen.getByText('Key concepts every investor must know')).toBeInTheDocument();
  });

  it('renders concept cards', () => {
    render(<FinanceConcepts />);
    expect(screen.getByText('Compound Interest')).toBeInTheDocument();
    expect(screen.getByText('Diversification')).toBeInTheDocument();
    expect(screen.getByText('Inflation')).toBeInTheDocument();
    expect(screen.getByText('Emergency Fund')).toBeInTheDocument();
    expect(screen.getByText('Asset Allocation')).toBeInTheDocument();
    expect(screen.getByText('Rupee-Cost Averaging')).toBeInTheDocument();
  });

  it('opens and closes modal on click', () => {
    render(<FinanceConcepts />);
    
    // Click on Compound Interest card
    const card = screen.getByText('Compound Interest').closest('.group');
    fireEvent.click(card);
    
    // Check if modal actions appear
    expect(screen.getByText('Learn More')).toBeInTheDocument();
    expect(screen.getByText('Try Calculator')).toBeInTheDocument();
    
    // Close modal
    const closeBtn = screen.getByText('✕');
    fireEvent.click(closeBtn);
    
    // Modal should be closed
    expect(screen.queryByText('Learn More')).not.toBeInTheDocument();
  });

  it('handles animation delays correctly', () => {
    render(<FinanceConcepts />);
    act(() => {
      jest.runAllTimers();
    });
    // Element should still be present
    expect(screen.getByText('Compound Interest')).toBeInTheDocument();
  });
});
