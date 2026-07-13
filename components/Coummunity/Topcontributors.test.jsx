import { render, screen } from '@testing-library/react';
import TopContributors from './Topcontributors';

describe('TopContributors', () => {
  it('renders the title', () => {
    render(<TopContributors />);
    expect(screen.getByText('Top Contributors')).toBeInTheDocument();
  });

  it('renders contributors', () => {
    render(<TopContributors />);
    expect(screen.getByText('Rahul Mehta')).toBeInTheDocument();
    expect(screen.getByText('@rahulmehta')).toBeInTheDocument();
    expect(screen.getByText('245')).toBeInTheDocument();
    
    expect(screen.getByText('Karthik Raj')).toBeInTheDocument();
  });

  it('renders full leaderboard link', () => {
    render(<TopContributors />);
    expect(screen.getByText(/See full leaderboard/i)).toBeInTheDocument();
  });
});
