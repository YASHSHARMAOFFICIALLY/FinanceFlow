import { render, screen } from '@testing-library/react';
import ChatLayout from './chatlayout';

// Mock child components
jest.mock('./Chatmessage', () => {
  const MockChatMessage = ({ message }) => <div data-testid={`chat-message-${message.id}`} />;
  MockChatMessage.TypingIndicator = () => <div data-testid="typing-indicator" />;
  return MockChatMessage;
});

jest.mock('./Assisanthero', () => () => <div data-testid="assistant-hero" />);
jest.mock('./Suggestedprompt', () => () => <div data-testid="suggested-prompts" />);

describe('ChatLayout Component', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it('renders AssistantHero and SuggestedPrompts when there are no messages', () => {
    render(<ChatLayout messages={[]} isTyping={false} />);
    
    expect(screen.getByTestId('assistant-hero')).toBeInTheDocument();
    expect(screen.getByTestId('suggested-prompts')).toBeInTheDocument();
    expect(screen.queryByTestId('typing-indicator')).not.toBeInTheDocument();
  });

  it('renders messages and does not render empty state components', () => {
    const mockMessages = [
      { id: '1', text: 'Hello', role: 'user' },
      { id: '2', text: 'Hi there', role: 'assistant' }
    ];

    render(<ChatLayout messages={mockMessages} isTyping={false} />);
    
    expect(screen.queryByTestId('assistant-hero')).not.toBeInTheDocument();
    expect(screen.queryByTestId('suggested-prompts')).not.toBeInTheDocument();
    
    expect(screen.getByTestId('chat-message-1')).toBeInTheDocument();
    expect(screen.getByTestId('chat-message-2')).toBeInTheDocument();
  });

  it('renders typing indicator when isTyping is true and there are messages', () => {
    const mockMessages = [
      { id: '1', text: 'Hello', role: 'user' }
    ];

    render(<ChatLayout messages={mockMessages} isTyping={true} />);
    
    expect(screen.getByTestId('typing-indicator')).toBeInTheDocument();
  });
});
