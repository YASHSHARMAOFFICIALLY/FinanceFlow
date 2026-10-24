import { render, screen } from '@testing-library/react';
import Footer from './footer';

describe('Footer', () => {
  it('renders brand name and description', () => {
    render(<Footer />);
    expect(screen.getByText('Finveda')).toBeInTheDocument();
    expect(screen.getByText('Personal finance learning and tracking, simplified.')).toBeInTheDocument();
  });

  it('renders link columns', () => {
    render(<Footer />);
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Tools')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
  });

  it('renders external social links', () => {
    render(<Footer />);
    expect(screen.getByText('Twitter')).toHaveAttribute('href', 'https://x.com/buildwithyash');
    expect(screen.getByText('LinkedIn')).toHaveAttribute('href', 'https://www.linkedin.com/in/buildwithyash/');
    expect(screen.getByText('GitHub')).toHaveAttribute('href', 'https://github.com/YASHSHARMAOFFICIALLY');
  });

  it('renders copyright', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear} FinanceFlow`))).toBeInTheDocument();
  });
});
