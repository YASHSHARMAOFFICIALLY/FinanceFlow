import { render, screen, fireEvent } from '@testing-library/react';
import Newsletter from './Newsletter';

// Mock useScrollReveal
jest.mock('@/hooks/useScrollRevel', () => ({
  useScrollReveal: () => ({ current: null })
}));

describe('Newsletter', () => {
  it('renders correctly', () => {
    render(<Newsletter />);
    expect(screen.getByText('Weekly Newsletter')).toBeInTheDocument();
    expect(screen.getByText('Get Smarter About Money Every Week')).toBeInTheDocument();
  });

  it('handles form submission', () => {
    render(<Newsletter />);
    
    const input = screen.getByPlaceholderText('you@example.com');
    const button = screen.getByRole('button', { name: 'Subscribe' });
    
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(button);
    
    expect(screen.getByText("You're in! Check your inbox for a welcome note.")).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('you@example.com')).not.toBeInTheDocument();
  });
});
