import { render, screen, fireEvent } from '@testing-library/react';
import FinancialHealthCard from './FinancialHealthCard';

const mockHealth = {
  score: 85,
  indicators: [
    { label: 'Savings', key: 'savings', color: '#C9A84C', status: 'Good', value: 80 },
    { label: 'Investing', key: 'investing', color: '#4A6FA5', status: 'Excellent', value: 90 },
  ],
  tip: { title: 'Keep it up', description: 'You are doing great' },
};

describe('FinancialHealthCard', () => {
  beforeAll(() => {
    window.HTMLDialogElement.prototype.showModal = jest.fn();
    window.HTMLDialogElement.prototype.close = jest.fn();
  });

  it('renders score and indicators', () => {
    render(<FinancialHealthCard health={mockHealth} />);
    
    expect(screen.getAllByText('85')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Savings').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Investing').length).toBeGreaterThan(0);
  });

  it('opens dialog on details click', () => {
    render(<FinancialHealthCard health={mockHealth} />);
    
    fireEvent.click(screen.getByText('Details →'));
    expect(window.HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });

  it('renders tips', () => {
    render(<FinancialHealthCard health={mockHealth} />);
    // Note: tip is rendered in both the main view and the modal view
    expect(screen.getAllByText('Keep it up').length).toBeGreaterThan(0);
    expect(screen.getAllByText('You are doing great').length).toBeGreaterThan(0);
  });
});
