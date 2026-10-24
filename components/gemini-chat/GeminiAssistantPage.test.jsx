import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import GeminiAssistantPage from './GeminiAssistantPage';

// Mock child components to isolate tests
jest.mock('@/components/chat/AssiantSideBar', () => {
  return function MockAssistantSidebar({ onNewChat }) {
    return <button onClick={onNewChat} data-testid="sidebar-new-chat">Sidebar New Chat</button>;
  };
});

jest.mock('@/components/chat/Chatmessage', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ message, onStreamDone }) => {
      React.useEffect(() => {
        if (onStreamDone) onStreamDone();
      }, [onStreamDone]);
      
      return (
        <div data-testid="chat-message">
          {message.role}: {message.content ? message.content[0].value : message.text}
        </div>
      );
    },
    TypingIndicator: () => <div data-testid="typing-indicator">Typing...</div>,
  };
});

jest.mock('@/components/theme-toggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">ThemeToggle</div>,
}));

describe('GeminiAssistantPage', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty state hero initially', () => {
    render(<GeminiAssistantPage />);
    expect(screen.getByText(/Your Finance AI/)).toBeInTheDocument();
    expect(screen.getAllByText('Market Trends')[0]).toBeInTheDocument();
  });

  it('handles sending a message and receiving AI response', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        content: [{ type: 'text', value: 'Hello! I am ArthSathi.' }],
      }),
    });

    render(<GeminiAssistantPage />);
    
    // Type in input
    const input = screen.getByPlaceholderText(/Ask about market trends/i);
    fireEvent.change(input, { target: { value: 'Hi' } });
    
    // Click send
    const sendButton = input.nextElementSibling;
    fireEvent.click(sendButton);
    
    // Check user message is added
    expect(screen.getByText('user: Hi')).toBeInTheDocument();
    
    // Wait for AI response
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/gemini-chat', expect.objectContaining({
        method: 'POST',
      }));
    });

    await waitFor(() => {
      expect(screen.getByText('assistant: Hello! I am ArthSathi.')).toBeInTheDocument();
    });
  });

  it('handles 401 unauthorized (sign in request)', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ error: 'Unauthorized' }),
    });

    render(<GeminiAssistantPage />);
    
    const input = screen.getByPlaceholderText(/Ask about market trends/i);
    fireEvent.change(input, { target: { value: 'Tell me a secret' } });
    
    const sendButton = input.nextElementSibling;
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Please sign in to use ArthSathi/i)).toBeInTheDocument();
    });
  });

  it('handles new chat action from top bar', () => {
    render(<GeminiAssistantPage />);
    
    const input = screen.getByPlaceholderText(/Ask about market trends/i);
    fireEvent.change(input, { target: { value: 'Hi' } });
    fireEvent.click(input.nextElementSibling);
    
    expect(screen.getByText('user: Hi')).toBeInTheDocument();
    
    // Click new chat
    fireEvent.click(screen.getByText('New chat'));
    
    // Messages should be cleared
    expect(screen.queryByText('user: Hi')).not.toBeInTheDocument();
    expect(screen.getByText(/Your Finance AI/)).toBeInTheDocument();
  });
});
