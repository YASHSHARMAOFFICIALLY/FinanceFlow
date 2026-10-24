import { render, screen } from '@testing-library/react';
import AssistantHero from './Assisanthero';

describe('AssistantHero', () => {
  it('renders the heading', () => {
    render(<AssistantHero />);
    expect(screen.getByText(/Your Personal AI/i)).toBeInTheDocument();
  });

  it('renders capability pills', () => {
    render(<AssistantHero />);
    expect(screen.getByText(/Investment advice/i)).toBeInTheDocument();
    expect(screen.getByText(/Goal planning/i)).toBeInTheDocument();
  });

  it('renders footer text', () => {
    render(<AssistantHero />);
    expect(screen.getByText(/Free to use/i)).toBeInTheDocument();
  });
});
