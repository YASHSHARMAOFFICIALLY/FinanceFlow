import { render, screen } from '@testing-library/react';
import Tools from './page';

jest.mock('@/components/tools/toolshero', () => () => <div data-testid="tools-hero" />);
jest.mock('@/components/tools/toolsgrid', () => () => <div data-testid="tools-grid" />);
jest.mock('@/components/tools/stockmarkettools', () => () => <div data-testid="stock-market-tool" />);
jest.mock('@/components/tools/sipcalculatortools', () => () => <div data-testid="sip-calculator" />);
jest.mock('@/components/tools/emicalculatortools', () => () => <div data-testid="emi-calculator" />);
jest.mock('@/components/tools/goaltrackertools', () => () => <div data-testid="goal-tracker" />);
jest.mock('@/components/tools/Newsletter', () => () => <div data-testid="newsletter" />);
jest.mock('@/components/landing/navbar', () => () => <div data-testid="navbar" />);
jest.mock('@/components/landing/footer', () => () => <div data-testid="footer" />);

describe('Tools Page', () => {
  it('renders all sections and components correctly', () => {
    render(<Tools />);
    
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('tools-hero')).toBeInTheDocument();
    expect(screen.getByTestId('tools-grid')).toBeInTheDocument();
    expect(screen.getByTestId('stock-market-tool')).toBeInTheDocument();
    expect(screen.getByTestId('sip-calculator')).toBeInTheDocument();
    expect(screen.getByTestId('emi-calculator')).toBeInTheDocument();
    expect(screen.getByTestId('goal-tracker')).toBeInTheDocument();
    expect(screen.getByTestId('newsletter')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
