import { render, screen, fireEvent, act } from '@testing-library/react';
import Hero from './hero';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Hero', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ push: mockPush });
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('renders hero content', () => {
    render(<Hero />);
    
    expect(screen.getByText(/Master Your Money/)).toBeInTheDocument();
    expect(screen.getByText(/One Smart/)).toBeInTheDocument();
    expect(screen.getByText(/Decision at a Time/)).toBeInTheDocument();
    
    expect(screen.getByText('Chat with Arthsathi')).toBeInTheDocument();
    expect(screen.getByText('Explore Tools')).toBeInTheDocument();
  });

  it('renders bento cards', () => {
    render(<Hero />);
    
    expect(screen.getByText('Finance Quiz')).toBeInTheDocument();
    expect(screen.getByText('SIP Tracker')).toBeInTheDocument();
    expect(screen.getByText('Financial Score')).toBeInTheDocument();
    expect(screen.getByText('Smart Blogs')).toBeInTheDocument();
    expect(screen.getByText('Portfolio Insights')).toBeInTheDocument();
  });

  it('navigates to specific route on card click', () => {
    render(<Hero />);
    
    const quizCard = screen.getByText('Finance Quiz').closest('.bento-card');
    fireEvent.click(quizCard);
    
    expect(mockPush).toHaveBeenCalledWith('/quiz');
  });

  it('handles animation delays gracefully', () => {
    render(<Hero />);
    
    act(() => {
      jest.runAllTimers();
    });
    
    // Components should still be visible without errors
    expect(screen.getByText('Finance Quiz')).toBeInTheDocument();
  });
});
