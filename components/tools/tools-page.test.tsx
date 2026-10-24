import { render } from '@testing-library/react';
import ToolsPage from './tools-page';

jest.mock('@/components/tools/emicalculatortools', () => () => <div data-testid="emi-calculator" />);
jest.mock('@/components/tools/stockmarkettools', () => () => <div data-testid="stock-market-tool" />);
jest.mock('@/components/tools/goaltrackertools', () => () => <div data-testid="goal-tracker" />);
jest.mock('@/components/tools/toolshero', () => () => <div data-testid="tools-hero" />);
jest.mock('@/components/tools/Newsletter', () => () => <div data-testid="newsletter" />);
jest.mock('@/components/tools/toolsgrid', () => () => <div data-testid="tools-grid" />);
jest.mock('@/components/tools/sipcalculatortools', () => () => <div data-testid="sip-calculator" />);

describe('ToolsPage', () => {
  it('renders all tool components', () => {
    const { getByTestId } = render(<ToolsPage />);
    
    expect(getByTestId('tools-hero')).toBeInTheDocument();
    expect(getByTestId('tools-grid')).toBeInTheDocument();
    expect(getByTestId('stock-market-tool')).toBeInTheDocument();
    expect(getByTestId('sip-calculator')).toBeInTheDocument();
    expect(getByTestId('emi-calculator')).toBeInTheDocument();
    expect(getByTestId('goal-tracker')).toBeInTheDocument();
    expect(getByTestId('newsletter')).toBeInTheDocument();
  });
});
