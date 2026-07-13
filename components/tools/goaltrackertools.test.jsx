import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GoalTracker from './goaltrackertools';

describe('GoalTracker', () => {
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
    render(<GoalTracker />);
    expect(screen.getByText('Financial Goal Tracker')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Dream Home')).toBeInTheDocument();
    
    // Default 10L target, 1L saved -> 10%
    expect(screen.getByText('10%')).toBeInTheDocument();
    expect(screen.getByText('₹9.00 L')).toBeInTheDocument(); // Remaining
  });

  it('updates when preset is clicked', () => {
    render(<GoalTracker />);
    
    const presetBtn = screen.getByRole('button', { name: /Emergency Fund/ });
    fireEvent.click(presetBtn);
    
    // Emergency Fund: 3L target, 80k saved -> 27%
    expect(screen.getByDisplayValue('Emergency Fund')).toBeInTheDocument();
    expect(screen.getByText('27%')).toBeInTheDocument();
    expect(screen.getByText('₹2.20 L')).toBeInTheDocument(); // Remaining
  });

  it('handles input changes', () => {
    render(<GoalTracker />);
    
    const goalInput = screen.getByDisplayValue('Dream Home');
    fireEvent.change(goalInput, { target: { value: 'New Laptop' } });
    expect(screen.getByDisplayValue('New Laptop')).toBeInTheDocument();
  });

  it('handles copy result', async () => {
    render(<GoalTracker />);
    
    const copyBtn = screen.getByRole('button', { name: 'Copy Result' });
    fireEvent.click(copyBtn);
    
    expect(writeTextMock).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
  });
});
