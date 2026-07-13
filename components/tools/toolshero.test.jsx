import { render, screen } from '@testing-library/react';
import ToolsHero from './toolshero';

describe('ToolsHero', () => {
  it('renders correctly', () => {
    render(<ToolsHero />);
    
    // Check main titles
    expect(screen.getByText('Financial Tools Suite')).toBeInTheDocument();
    expect(screen.getByText(/Powerful Tools for/)).toBeInTheDocument();
    expect(screen.getByText('Smarter')).toBeInTheDocument();
    expect(screen.getByText(/Financial Decisions/)).toBeInTheDocument();
    
    // Check description
    expect(screen.getByText(/Calculate investments, track goals/)).toBeInTheDocument();
    
    // Check buttons
    expect(screen.getByRole('link', { name: /Start Using Tools/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View all calculators/i })).toBeInTheDocument();
  });
});
