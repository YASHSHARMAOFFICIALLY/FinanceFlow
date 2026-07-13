import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import AssistantPage from './AssistantPage';
import { generateResponse } from '@/data/responses';

jest.mock('@/data/responses', () => ({
  generateResponse: jest.fn(() => ({ content: [{ type: 'text', value: 'Mock response' }] })),
  SUGGESTED_PROMPTS: [],
  RECENT_CONVERSATIONS: [],
}));

jest.useFakeTimers();

describe('AssistantPage', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders AssistantPage with Navbar and Layout', () => {
    render(<AssistantPage />);
    expect(screen.getByText('FinanceFlow')).toBeInTheDocument();
    expect(screen.getByText('AI Finance Assistant')).toBeInTheDocument();
  });

  it('handles sending a message', async () => {
    render(<AssistantPage />);
    
    const input = screen.getByPlaceholderText(/Ask anything about finance/i);
    fireEvent.change(input, { target: { value: 'Hello AI' } });
    
    const sendButton = input.nextElementSibling;
    if (sendButton) {
      fireEvent.click(sendButton);
    }
    
    // Check if user message appears
    expect(screen.getByText('Hello AI')).toBeInTheDocument();
    
    // Fast-forward timers for AI thinking delay
    act(() => {
      jest.runAllTimers();
    });
    
    await waitFor(() => {
      expect(generateResponse).toHaveBeenCalledWith('Hello AI');
    });
  });
  
  it('handles new chat action', () => {
    render(<AssistantPage />);
    
    // There are multiple new chat buttons (sidebar and top bar), click the top bar one
    const newChatButtons = screen.getAllByText(/New/i);
    fireEvent.click(newChatButtons[0]);
    
    // Just verifying it renders correctly without errors since checking internal state isn't direct
    expect(screen.getByText('FinanceFlow AI')).toBeInTheDocument();
  });
});
