import { render, screen } from '@testing-library/react';
import ArticlePage from './page';

describe('Article Detail Page', () => {
  it('renders correctly for a valid ID', async () => {
    const params = Promise.resolve({ id: '1' });
    const Page = await ArticlePage({ params });
    render(Page);
    
    expect(screen.getByText('What is SIP and Why It Builds Wealth Over Time')).toBeInTheDocument();
    expect(screen.getByText('Jan 12, 2025')).toBeInTheDocument();
  });

  it('renders not found for an invalid ID', async () => {
    const params = Promise.resolve({ id: '999' });
    const Page = await ArticlePage({ params });
    render(Page);
    
    expect(screen.getByText('Article not found')).toBeInTheDocument();
  });
});
