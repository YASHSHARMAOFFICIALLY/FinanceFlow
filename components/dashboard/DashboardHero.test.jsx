import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import DashboardHero from './DashboardHero';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('DashboardHero', () => {
  const mockRouter = { refresh: jest.fn() };

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders greetings and stats', () => {
    render(
      <DashboardHero
        userName="Aarya"
        quickStats={[{ label: 'Net Worth', value: '₹10,000', delta: '5%', deltaDir: 'up' }]}
      />
    );
    
    expect(screen.getByText(/Aarya 👋/i)).toBeInTheDocument();
    expect(screen.getByText('Net Worth')).toBeInTheDocument();
    expect(screen.getByText('₹10,000')).toBeInTheDocument();
  });

  it('opens and closes add investment dialog', () => {
    render(<DashboardHero />);
    
    fireEvent.click(screen.getByText('Add Investment'));
    expect(screen.getByText('New amount invested')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByText('New amount invested')).not.toBeInTheDocument();
  });

  it('handles submitting a new investment', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<DashboardHero />);
    
    fireEvent.click(screen.getByText('Add Investment'));
    
    const input = screen.getByPlaceholderText('5000');
    fireEvent.change(input, { target: { value: '2000' } });
    
    fireEvent.click(screen.getByText('Save Snapshot'));
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/dashboard/portfolio', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ amountInvested: 2000 }),
      }));
      expect(mockRouter.refresh).toHaveBeenCalled();
    });
  });

  it('handles reset portfolio', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<DashboardHero />);
    
    fireEvent.click(screen.getByText('Add Investment'));
    fireEvent.click(screen.getByText('Reset to Zero'));
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/dashboard/portfolio', expect.objectContaining({
        method: 'DELETE',
      }));
      expect(mockRouter.refresh).toHaveBeenCalled();
    });
  });
});
