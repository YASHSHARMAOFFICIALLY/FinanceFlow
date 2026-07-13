import { render, screen } from '@testing-library/react';
import BlogSection from './BlogSection';

// Mock useScrollReveal hook
jest.mock('@/hooks/useScrollRevel', () => ({
  useScrollReveal: () => ({ current: null })
}));

describe('BlogSection', () => {
  it('renders section header', () => {
    render(<BlogSection />);
    expect(screen.getByText('Finance blogs worth reading')).toBeInTheDocument();
  });

  it('renders blog cards', () => {
    render(<BlogSection />);
    
    expect(screen.getByText('What is SIP and Why It Builds Wealth Over Time')).toBeInTheDocument();
    expect(screen.getByText('The Power of Compound Interest Explained Simply')).toBeInTheDocument();
    expect(screen.getByText('50/30/20 Rule: The Budgeting Framework That Works')).toBeInTheDocument();
  });

  it('renders blog tags', () => {
    render(<BlogSection />);
    
    expect(screen.getByText('Investing')).toBeInTheDocument();
    expect(screen.getByText('Banking')).toBeInTheDocument();
    expect(screen.getByText('Planning')).toBeInTheDocument();
  });
});
