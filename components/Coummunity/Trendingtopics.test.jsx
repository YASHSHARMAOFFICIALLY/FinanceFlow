import { render, screen } from '@testing-library/react';
import TrendingTopics from './Trendingtopics';

describe('TrendingTopics', () => {
  it('renders the title', () => {
    render(<TrendingTopics />);
    expect(screen.getByText('Trending Topics')).toBeInTheDocument();
  });

  it('renders trending items', () => {
    render(<TrendingTopics />);
    expect(screen.getByText('SIP vs Lump Sum')).toBeInTheDocument();
    expect(screen.getByText('234')).toBeInTheDocument(); // count
    expect(screen.getByText('Emergency Fund Strategy')).toBeInTheDocument();
  });

  it('renders view all link', () => {
    render(<TrendingTopics />);
    expect(screen.getByText(/View all topics/i)).toBeInTheDocument();
  });
});
