import { render, screen, fireEvent } from '@testing-library/react';
import Categories, { CATEGORIES } from './Categories';

describe('Categories', () => {
  it('renders all categories', () => {
    render(<Categories active="all" onChange={jest.fn()} />);
    CATEGORIES.forEach(cat => {
      expect(screen.getByText(cat.label)).toBeInTheDocument();
    });
  });

  it('calls onChange with category id when clicked', () => {
    const mockOnChange = jest.fn();
    render(<Categories active="all" onChange={mockOnChange} />);
    
    const investButton = screen.getByText('Investing').closest('button');
    fireEvent.click(investButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('investing');
  });

  it('highlights active category', () => {
    render(<Categories active="investing" onChange={jest.fn()} />);
    const investButton = screen.getByText('Investing').closest('button');
    expect(investButton).toHaveClass('bg-[#0F0F0F]', 'text-white');
  });
});
