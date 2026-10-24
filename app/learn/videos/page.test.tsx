import { render, screen } from '@testing-library/react';
import VideosPage from './page';

describe('VideosPage', () => {
  it('renders the videos page heading', () => {
    render(<VideosPage />);
    expect(screen.getByText('Finance Learning Videos')).toBeInTheDocument();
  });

  it('renders a list of videos', () => {
    render(<VideosPage />);
    // Check if some of the mock data is rendered
    expect(screen.getByText("Basics of Investing — A Beginner's Complete Guide")).toBeInTheDocument();
    expect(screen.getByText('How Mutual Funds Work — Explained in 15 Minutes')).toBeInTheDocument();
    expect(screen.getAllByText('FinanceFlow Academy').length).toBeGreaterThan(0);
  });
});
