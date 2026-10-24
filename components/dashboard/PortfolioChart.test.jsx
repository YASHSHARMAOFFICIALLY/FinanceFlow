import { render, screen, fireEvent } from '@testing-library/react';
import PortfolioChart from './PortfolioChart';

// Mock Recharts components because they rely on DOM features not present in jsdom
jest.mock('recharts', () => {
  const OriginalRecharts = jest.requireActual('recharts');
  return {
    ...OriginalRecharts,
    ResponsiveContainer: ({ children }) => <div>{children}</div>,
    AreaChart: ({ children }) => <svg data-testid="areachart">{children}</svg>,
    Area: () => <div data-testid="area" />,
    XAxis: () => <div data-testid="xaxis" />,
    YAxis: () => <div data-testid="yaxis" />,
    CartesianGrid: () => <div data-testid="grid" />,
    Tooltip: () => <div data-testid="tooltip" />,
  };
});

const mockPortfolio = {
  currentValue: 105000,
  investedValue: 100000,
  totalReturn: 5000,
  series: {
    '1M': [
      { date: '1', invested: 100000, value: 102000 },
      { date: '2', invested: 100000, value: 105000 },
    ],
  },
};

describe('PortfolioChart', () => {
  it('renders overall portfolio value', () => {
    render(<PortfolioChart portfolio={mockPortfolio} />);
    expect(screen.getByText('₹1,05,000')).toBeInTheDocument();
    expect(screen.getByText('+5.0%')).toBeInTheDocument();
  });

  it('renders range selectors and updates active range', () => {
    render(<PortfolioChart portfolio={mockPortfolio} />);
    const button = screen.getByText('1M');
    expect(button).toHaveClass('bg-white', 'text-[#0F0F0F]', 'shadow-sm'); // active class

    const btn3M = screen.getByText('3M');
    fireEvent.click(btn3M);
    // Since mockPortfolio has no series['3M'], it should render the empty state
    expect(screen.getByText('No portfolio data available for this range yet.')).toBeInTheDocument();
  });

  it('renders chart', () => {
    render(<PortfolioChart portfolio={mockPortfolio} />);
    expect(screen.getByTestId('areachart')).toBeInTheDocument();
  });
});
