import { render, screen, fireEvent } from '@testing-library/react';
import DiscussionCard from './DiscussionCard';

describe('DiscussionCard', () => {
  const mockPost = {
    id: '1',
    author: 'Alice',
    timeAgo: '1h ago',
    title: 'How to save?',
    preview: 'I want to save money.',
    tags: ['Savings'],
    replies: 10,
    likes: 20,
    views: '1k',
  };

  it('renders post details correctly', () => {
    render(<DiscussionCard post={mockPost} onJoin={jest.fn()} />);
    
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('1h ago')).toBeInTheDocument();
    expect(screen.getByText('How to save?')).toBeInTheDocument();
    expect(screen.getByText('I want to save money.')).toBeInTheDocument();
    expect(screen.getByText('Savings')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('1k')).toBeInTheDocument();
  });

  it('renders pinned and solved status', () => {
    const statusPost = { ...mockPost, pinned: true, solved: true };
    render(<DiscussionCard post={statusPost} onJoin={jest.fn()} />);
    
    expect(screen.getByText('📌 Pinned')).toBeInTheDocument();
    expect(screen.getByText('✓ Solved')).toBeInTheDocument();
  });

  it('calls onJoin when join button is clicked', () => {
    const mockOnJoin = jest.fn();
    render(<DiscussionCard post={mockPost} onJoin={mockOnJoin} />);
    
    const joinButton = screen.getByText(/Join Discussion/i);
    fireEvent.click(joinButton);
    
    expect(mockOnJoin).toHaveBeenCalledWith(mockPost);
  });
});
