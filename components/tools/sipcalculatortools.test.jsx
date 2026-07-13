import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SipCalculator from './sipcalculatortools';

describe('SipCalculator', () => {
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
    render(<SipCalculator />);
    expect(screen.getByText('SIP Calculator')).toBeInTheDocument();
    expect(screen.getByText('Configure Your SIP')).toBeInTheDocument();
    
    // Default 5000 monthly, 12% rate, 10 years
    // Invested: 5000 * 12 * 10 = 6,00,000
    // Total value will be ~11.6L
    expect(screen.getByText('₹6.00 L')).toBeInTheDocument(); // Invested
  });

  it('handles copy result', async () => {
    render(<SipCalculator />);
    
    const copyBtn = screen.getByRole('button', { name: 'Copy Result' });
    fireEvent.click(copyBtn);
    
    expect(writeTextMock).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
  });
});
