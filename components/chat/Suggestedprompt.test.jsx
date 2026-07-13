import { render, screen, fireEvent } from '@testing-library/react';
import SuggestedPrompts from './Suggestedprompt';
import { SUGGESTED_PROMPTS } from '@/data/responses';

jest.mock('@/data/responses', () => ({
  SUGGESTED_PROMPTS: [
    { id: '1', text: 'How do I start investing?', category: 'Investing', icon: '📈' },
    { id: '2', text: 'How much should I save?', category: 'Savings', icon: '💰' },
  ],
}));

describe('SuggestedPrompts', () => {
  it('renders suggested prompts', () => {
    render(<SuggestedPrompts onSelect={jest.fn()} />);
    expect(screen.getByText('How do I start investing?')).toBeInTheDocument();
    expect(screen.getByText('How much should I save?')).toBeInTheDocument();
  });

  it('calls onSelect when a prompt is clicked', () => {
    const mockOnSelect = jest.fn();
    render(<SuggestedPrompts onSelect={mockOnSelect} />);
    
    const button = screen.getByText('How do I start investing?').closest('button');
    fireEvent.click(button);
    
    expect(mockOnSelect).toHaveBeenCalledWith('How do I start investing?');
  });
});
