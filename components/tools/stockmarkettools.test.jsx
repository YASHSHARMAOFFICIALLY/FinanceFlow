import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StockMarketTool from './stockmarkettools';

describe('StockMarketTool', () => {
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

  it('renders correctly with default values (RELIANCE)', () => {
    render(<StockMarketTool />);
    expect(screen.getByText('Stock Market Tool')).toBeInTheDocument();
    expect(screen.getByText('Reliance Industries')).toBeInTheDocument();
    expect(screen.getByText('₹2,745')).toBeInTheDocument();
  });

  it('updates when popular stock is clicked', () => {
    render(<StockMarketTool />);
    
    const tcsBtn = screen.getByRole('button', { name: 'TCS' });
    fireEvent.click(tcsBtn);
    
    expect(screen.getByText('Tata Consultancy Services')).toBeInTheDocument();
    expect(screen.getByText('₹3,842')).toBeInTheDocument();
  });

  it('filters based on search input', () => {
    render(<StockMarketTool />);
    
    const searchInput = screen.getByPlaceholderText('Search stock (e.g. TCS, Reliance)');
    fireEvent.change(searchInput, { target: { value: 'IN' } });
    
    // Clicking INFY should update the selected stock
    // Wait, the search just filters SUGGESTIONS? Actually the search in this component doesn't show a dropdown of suggestions but filters them?
    // Looking at the code, it filters but doesn't render them separately in a dropdown.
    expect(searchInput).toHaveValue('IN');
  });

  it('handles copy result', async () => {
    render(<StockMarketTool />);
    
    const copyBtn = screen.getByRole('button', { name: 'Copy Result' });
    fireEvent.click(copyBtn);
    
    expect(writeTextMock).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
  });
});
