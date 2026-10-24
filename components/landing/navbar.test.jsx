import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './navbar';

jest.mock('@/components/theme-toggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">ThemeToggle</div>,
}));

describe('Navbar', () => {
  it('renders logo and brand name', () => {
    render(<Navbar />);
    expect(screen.getByText('FinanceFLow')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('Tools')).toBeInTheDocument();
    expect(screen.getByText('Learn')).toBeInTheDocument();
    expect(screen.getByText('Quiz')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders auth links', () => {
    render(<Navbar />);
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByText('Create Account')).toBeInTheDocument();
  });

  it('handles scroll event to update background', () => {
    render(<Navbar />);
    
    // Default bg
    const nav = screen.getByRole('navigation');
    expect(nav.className).toContain('bg-white');
    expect(nav.className).not.toContain('bg-white/95');
    
    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
    fireEvent.scroll(window);
    
    // Scrolled bg
    expect(nav.className).toContain('bg-white/95');
  });
});
