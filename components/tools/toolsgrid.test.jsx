import { render, screen, act } from '@testing-library/react';
import ToolsGrid from './toolsgrid';

describe('ToolsGrid', () => {
  beforeAll(() => {
    global.IntersectionObserver = class {
      constructor(callback) {
        this.callback = callback;
      }
      observe(el) {
        this.callback([{ isIntersecting: true, target: el }]);
      }
      unobserve() {}
      disconnect() {}
    };
  });

  afterAll(() => {
    delete global.IntersectionObserver;
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('renders section header correctly', () => {
    render(<ToolsGrid />);
    expect(screen.getByText('All Tools')).toBeInTheDocument();
    expect(screen.getByText('Pick a tool to get started')).toBeInTheDocument();
    expect(screen.getByText('4 calculators. All free. No sign-up required.')).toBeInTheDocument();
  });

  it('renders all tool cards', () => {
    render(<ToolsGrid />);
    act(() => {
      jest.runAllTimers();
    });

    // Check titles
    expect(screen.getByText('Stock Market Tool')).toBeInTheDocument();
    expect(screen.getByText('SIP Calculator')).toBeInTheDocument();
    expect(screen.getByText('EMI Calculator')).toBeInTheDocument();
    expect(screen.getByText('Financial Goal Tracker')).toBeInTheDocument();

    // Check tags
    expect(screen.getByText('Markets')).toBeInTheDocument();
    expect(screen.getByText('Investing')).toBeInTheDocument();
    expect(screen.getByText('Debt')).toBeInTheDocument();
    expect(screen.getByText('Goals')).toBeInTheDocument();

    // Check links
    const links = screen.getAllByRole('link', { name: /Open Tool/i });
    expect(links).toHaveLength(4);
    expect(links[0]).toHaveAttribute('href', '#stock-tool');
    expect(links[1]).toHaveAttribute('href', '#sip-calc');
    expect(links[2]).toHaveAttribute('href', '#emi-calc');
    expect(links[3]).toHaveAttribute('href', '#goal-tracker');
  });
});
