import { render, screen, fireEvent } from '@testing-library/react';
import ChatInput from './chatinput';

describe('ChatInput', () => {
  it('renders the input and quick actions', () => {
    render(<ChatInput onSend={jest.fn()} />);
    expect(screen.getByPlaceholderText(/Ask anything about finance/i)).toBeInTheDocument();
    expect(screen.getByText(/SIP Advice/i)).toBeInTheDocument();
  });

  it('updates textarea value on input', () => {
    render(<ChatInput onSend={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(/Ask anything about finance/i);
    
    fireEvent.change(textarea, { target: { value: 'Hello World' } });
    expect(textarea.value).toBe('Hello World');
  });

  it('calls onSend and clears input when send button is clicked', () => {
    const mockOnSend = jest.fn();
    render(<ChatInput onSend={mockOnSend} />);
    
    const textarea = screen.getByPlaceholderText(/Ask anything about finance/i);
    fireEvent.change(textarea, { target: { value: 'Hello World' } });
    
    const sendButton = textarea.nextElementSibling;
    fireEvent.click(sendButton);
    
    expect(mockOnSend).toHaveBeenCalledWith('Hello World');
    expect(textarea.value).toBe('');
  });

  it('calls onSend when quick action is clicked', () => {
    const mockOnSend = jest.fn();
    render(<ChatInput onSend={mockOnSend} />);
    
    const quickAction = screen.getByText(/SIP Advice/i);
    fireEvent.click(quickAction);
    
    expect(mockOnSend).toHaveBeenCalledWith('SIP Advice: give me advice');
  });

  it('disables input when disabled prop is true', () => {
    render(<ChatInput onSend={jest.fn()} disabled={true} />);
    const textarea = screen.getByPlaceholderText(/Ask anything about finance/i);
    expect(textarea).toBeDisabled();
  });
});
