import { render, screen, fireEvent } from '@testing-library/react';
import AssistantSidebar from './AssiantSideBar';
import { RECENT_CONVERSATIONS } from '@/data/responses';

jest.mock('@/data/responses', () => ({
  RECENT_CONVERSATIONS: [
    { id: '1', title: 'How to save money', time: '2 hours ago' },
  ],
}));

describe('AssistantSidebar', () => {
  it('renders new chat button and calls onNewChat on click', () => {
    const mockOnNewChat = jest.fn();
    render(<AssistantSidebar onNewChat={mockOnNewChat} />);
    
    const newChatButton = screen.getByText(/New Conversation/i);
    expect(newChatButton).toBeInTheDocument();
    
    fireEvent.click(newChatButton);
    expect(mockOnNewChat).toHaveBeenCalled();
  });

  it('renders recent chats', () => {
    render(<AssistantSidebar onNewChat={jest.fn()} />);
    expect(screen.getByText('How to save money')).toBeInTheDocument();
    expect(screen.getByText('2 hours ago')).toBeInTheDocument();
  });

  it('renders quick tools', () => {
    render(<AssistantSidebar onNewChat={jest.fn()} />);
    expect(screen.getByText(/Quick Tools/i)).toBeInTheDocument();
    expect(screen.getByText('SIP Calculator')).toBeInTheDocument();
  });

  it('renders finance tip', () => {
    render(<AssistantSidebar onNewChat={jest.fn()} />);
    expect(screen.getByText(/Finance Tip/i)).toBeInTheDocument();
  });
});
