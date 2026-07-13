import { render, screen, fireEvent } from '@testing-library/react';
import Newsletter from './Newsletter';

describe('Newsletter', () => {
  it('renders correctly', () => {
    render(<Newsletter />);
    expect(screen.getByText('Weekly Newsletter')).toBeInTheDocument();
    expect(screen.getByText('Stay Updated With Smart Financial Insights')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Subscribe/i })).toBeInTheDocument();
  });

  it('handles submission', () => {
    render(<Newsletter />);
    
    const input = screen.getByPlaceholderText('you@example.com');
    const button = screen.getByRole('button', { name: /Subscribe/i });
    
    // Type email
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    
    // Submit form
    fireEvent.click(button);
    
    // Check success state
    expect(screen.getByText("You're in! Check your inbox for a welcome note.")).toBeInTheDocument();
  });
});
