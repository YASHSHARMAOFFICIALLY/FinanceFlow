import { render, screen } from '@testing-library/react';
import ChatMessage from './Chatmessage';

describe('ChatMessage', () => {
  it('renders user message', () => {
    const message = { role: 'user', text: 'Hello, how are you?' };
    render(<ChatMessage message={message} isStreaming={false} />);
    
    expect(screen.getByText('Hello, how are you?')).toBeInTheDocument();
  });

  it('renders assistant message with text content', () => {
    const message = {
      role: 'assistant',
      time: '12:00 PM',
      content: [{ type: 'text', value: 'I am doing well, thanks.' }]
    };
    render(<ChatMessage message={message} isStreaming={false} />);
    
    expect(screen.getByText('I am doing well, thanks.')).toBeInTheDocument();
    expect(screen.getByText('12:00 PM')).toBeInTheDocument();
    expect(screen.getByText('FinanceFlow AI')).toBeInTheDocument();
  });

  it('renders assistant message with bullets', () => {
    const message = {
      role: 'assistant',
      content: [
        { type: 'bullets', heading: 'List of items', items: ['Item 1', 'Item 2'] }
      ]
    };
    render(<ChatMessage message={message} isStreaming={false} />);
    
    expect(screen.getByText('List of items')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('renders assistant message with calculation table', () => {
    const message = {
      role: 'assistant',
      content: [
        { type: 'calculation', label: 'Math', rows: [{ key: '1+1', value: '2' }] }
      ]
    };
    render(<ChatMessage message={message} isStreaming={false} />);
    
    expect(screen.getByText('Math')).toBeInTheDocument();
    expect(screen.getByText('1+1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders feedback row when not streaming', () => {
    const message = {
      role: 'assistant',
      content: [{ type: 'text', value: 'Done.' }]
    };
    render(<ChatMessage message={message} isStreaming={false} />);
    
    expect(screen.getByText('Was this helpful?')).toBeInTheDocument();
  });

  it('does not render feedback row when streaming', () => {
    const message = {
      role: 'assistant',
      content: [{ type: 'text', value: 'Typing...' }]
    };
    render(<ChatMessage message={message} isStreaming={true} />);
    
    expect(screen.queryByText('Was this helpful?')).not.toBeInTheDocument();
  });
});
