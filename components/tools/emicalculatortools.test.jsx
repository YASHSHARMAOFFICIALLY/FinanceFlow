import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EmiCalculator from './emicalculatortools';

describe('EmiCalculator', () => {
  let writeTextMock;

  beforeEach(() => {
    writeTextMock = jest.fn().mockResolvedValue();
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default values', () => {
    render(<EmiCalculator />);
    expect(screen.getByText('EMI Calculator')).toBeInTheDocument();
    expect(screen.getByText('Configure Your Loan')).toBeInTheDocument();
    
    // Check initial EMI (20L, 8.5%, 20yrs) -> ~17,356
    expect(screen.getByText('₹17,356')).toBeInTheDocument();
  });

  it('updates when loan preset is clicked', () => {
    render(<EmiCalculator />);
    
    const carLoanBtn = screen.getByRole('button', { name: 'Car Loan' });
    fireEvent.click(carLoanBtn);
    
    // Car loan: 8L, 9.5%, 5yrs -> ~16,801
    expect(screen.getByText('₹16,801')).toBeInTheDocument();
  });

  it('handles copy result', async () => {
    render(<EmiCalculator />);
    
    const copyBtn = screen.getByRole('button', { name: 'Copy Result' });
    fireEvent.click(copyBtn);
    
    expect(writeTextMock).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
  });
});
