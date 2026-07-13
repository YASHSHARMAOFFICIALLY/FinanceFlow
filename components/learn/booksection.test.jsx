import { render, screen } from '@testing-library/react';
import BooksSection from './booksection';

// Mock useScrollReveal hook
jest.mock('@/hooks/useScrollRevel', () => ({
  useScrollReveal: () => ({ current: null })
}));

describe('BooksSection', () => {
  it('renders section header', () => {
    render(<BooksSection />);
    expect(screen.getByText('Books every investor should read')).toBeInTheDocument();
  });

  it('renders all book cards', () => {
    render(<BooksSection />);
    expect(screen.getByText('The Psychology of Money')).toBeInTheDocument();
    expect(screen.getByText('Morgan Housel')).toBeInTheDocument();
    
    expect(screen.getByText('Rich Dad Poor Dad')).toBeInTheDocument();
    expect(screen.getByText('Robert Kiyosaki')).toBeInTheDocument();
    
    expect(screen.getByText('The Intelligent Investor')).toBeInTheDocument();
    expect(screen.getByText('Benjamin Graham')).toBeInTheDocument();
  });
});
