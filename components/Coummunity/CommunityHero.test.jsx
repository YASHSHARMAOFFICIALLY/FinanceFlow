import { render, screen, fireEvent } from '@testing-library/react';
import CommunityHero from './CommunityHero';

describe('CommunityHero', () => {
  it('renders the hero section title', () => {
    render(<CommunityHero onStartDiscussion={jest.fn()} />);
    expect(screen.getByText(/Learn Finance/i)).toBeInTheDocument();
    expect(screen.getByText(/Together/i)).toBeInTheDocument();
  });

  it('calls onStartDiscussion when start discussion button is clicked', () => {
    const mockOnStart = jest.fn();
    render(<CommunityHero onStartDiscussion={mockOnStart} />);
    
    const startButton = screen.getByRole('button', { name: /Start a Discussion/i });
    fireEvent.click(startButton);
    
    expect(mockOnStart).toHaveBeenCalled();
  });

  it('renders stats', () => {
    render(<CommunityHero onStartDiscussion={jest.fn()} />);
    expect(screen.getByText('4,200+')).toBeInTheDocument();
    expect(screen.getByText('Members')).toBeInTheDocument();
    expect(screen.getByText('1,840')).toBeInTheDocument();
    expect(screen.getByText('Discussions')).toBeInTheDocument();
  });
});
