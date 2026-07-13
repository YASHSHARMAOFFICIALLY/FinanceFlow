import { render, screen } from '@testing-library/react';
import BooksPage from './page';

describe('BooksPage', () => {
  it('renders the books page heading', () => {
    render(<BooksPage />);
    expect(screen.getByText('Recommended Books')).toBeInTheDocument();
  });

  it('renders a list of books', () => {
    render(<BooksPage />);
    // Check if some of the mock data is rendered
    expect(screen.getByText('The Psychology of Money')).toBeInTheDocument();
    expect(screen.getByText('by Morgan Housel')).toBeInTheDocument();
    expect(screen.getByText('Rich Dad Poor Dad')).toBeInTheDocument();
    expect(screen.getByText('The Intelligent Investor')).toBeInTheDocument();
  });
});
