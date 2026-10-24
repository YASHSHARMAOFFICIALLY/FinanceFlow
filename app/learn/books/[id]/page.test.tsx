import { render, screen } from '@testing-library/react';
import BookSummaryPage from './page';

describe('Book Summary Page', () => {
  it('renders correctly for a valid ID', async () => {
    const params = Promise.resolve({ id: '1' });
    const Page = await BookSummaryPage({ params });
    render(Page);
    
    expect(screen.getByText('The Psychology of Money')).toBeInTheDocument();
    expect(screen.getByText('by Morgan Housel')).toBeInTheDocument();
  });

  it('renders not found for an invalid ID', async () => {
    const params = Promise.resolve({ id: '999' });
    const Page = await BookSummaryPage({ params });
    render(Page);
    
    expect(screen.getByText('Book not found')).toBeInTheDocument();
  });
});
