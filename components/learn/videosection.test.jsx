import { render, screen, fireEvent } from '@testing-library/react';
import VideoSection from './videosection';

// Mock useScrollReveal hook
jest.mock('@/hooks/useScrollRevel', () => ({
  useScrollReveal: () => ({ current: null })
}));

describe('VideoSection', () => {
  it('renders section header', () => {
    render(<VideoSection />);
    expect(screen.getByText('Watch & learn at your pace')).toBeInTheDocument();
    expect(screen.getByText('View all videos →')).toBeInTheDocument();
  });

  it('renders video cards with correct information', () => {
    render(<VideoSection />);
    
    // Check titles
    expect(screen.getByText("Basics of Investing — A Beginner's Complete Guide")).toBeInTheDocument();
    expect(screen.getByText("How Mutual Funds Work — Explained in 15 Minutes")).toBeInTheDocument();
    
    // Check channel names (there are two of them in the mocked data)
    expect(screen.getAllByText('FinanceFlow Academy').length).toBe(2);
  });

  it('plays video when play button is clicked', () => {
    render(<VideoSection />);
    
    // Initially iframes shouldn't be rendered
    expect(screen.queryByTitle("Basics of Investing — A Beginner's Complete Guide")).not.toBeInTheDocument();
    
    // Find play button SVG using container since it doesn't have a specific role/label
    const playButtons = screen.getAllByRole('generic').filter(
      (element) => element.className.includes('bg-white/20') && element.className.includes('backdrop-blur-sm')
    );
    
    // Click the first play button
    fireEvent.click(playButtons[0]);
    
    // An iframe should now be rendered
    const iframe = screen.getByTitle("Basics of Investing — A Beginner's Complete Guide");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/AkMTxMN7res');
  });
});
