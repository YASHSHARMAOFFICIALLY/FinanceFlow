import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GoalProgress from './GoalProgress';

const mockGoals = {
  achieved: 0,
  items: [
    {
      id: '1',
      name: 'Emergency Fund',
      emoji: '💰',
      target: 100000,
      saved: 20000,
      color: '#000',
      targetDate: '2026-12-31',
      achieved: false,
      monthlyNeeded: 5000,
    },
  ],
};

describe('GoalProgress', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders goals list', () => {
    render(<GoalProgress goals={mockGoals} />);
    expect(screen.getByText('Emergency Fund')).toBeInTheDocument();
    expect(screen.getByText('💰')).toBeInTheDocument();
  });

  it('opens and closes create dialog', () => {
    render(<GoalProgress goals={mockGoals} />);
    
    fireEvent.click(screen.getByText('New Goal'));
    expect(screen.getAllByText('Create Goal')[0]).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByText('Create Goal')).not.toBeInTheDocument();
  });

  it('handles goal creation', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        goal: { id: '2', name: 'New Car', targetAmount: 500000, currentAmount: 0 },
      }),
    });

    render(<GoalProgress goals={mockGoals} />);
    
    fireEvent.click(screen.getByText('New Goal'));
    
    fireEvent.change(screen.getByLabelText(/Goal name/i), { target: { value: 'New Car' } });
    fireEvent.change(screen.getByLabelText(/Target amount/i), { target: { value: '500000' } });
    
    fireEvent.click(screen.getByRole('button', { name: 'Create Goal' }));
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/dashboard/goals', expect.objectContaining({
        method: 'POST',
      }));
    });
  });

  it('handles deleting a goal', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<GoalProgress goals={mockGoals} />);
    
    fireEvent.click(screen.getByText('Delete'));
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/dashboard/goals/1', expect.objectContaining({
        method: 'DELETE',
      }));
      expect(screen.queryByText('Emergency Fund')).not.toBeInTheDocument();
    });
  });

  it('handles boosting a goal', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        goal: { ...mockGoals.items[0], currentAmount: 25000 },
      }),
    });

    render(<GoalProgress goals={mockGoals} />);
    
    fireEvent.click(screen.getByText('Add ₹5,000'));
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/dashboard/goals/1', expect.objectContaining({
        method: 'PATCH',
      }));
    });
  });
});
