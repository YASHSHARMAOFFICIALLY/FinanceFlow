import { render, screen } from '@testing-library/react';
import ArticlesPage from './page';

describe('ArticlesPage', () => {
  it('renders the articles page heading', () => {
    render(<ArticlesPage />);
    expect(screen.getByText('All Articles')).toBeInTheDocument();
  });

  it('renders a list of articles', () => {
    render(<ArticlesPage />);
    // Check if some of the mock data is rendered
    expect(screen.getByText('What is SIP and Why It Builds Wealth Over Time')).toBeInTheDocument();
    expect(screen.getByText('The Power of Compound Interest Explained Simply')).toBeInTheDocument();
    expect(screen.getByText('50/30/20 Rule: The Budgeting Framework That Works')).toBeInTheDocument();
  });
});
