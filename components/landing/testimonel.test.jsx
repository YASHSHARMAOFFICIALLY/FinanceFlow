import { render, screen } from '@testing-library/react';
import Testimonials from './testimonel';

describe('Testimonials', () => {
  it('renders header', () => {
    render(<Testimonials />);
    expect(screen.getByText('Trusted by people building better finances')).toBeInTheDocument();
  });

  it('renders testimonials', () => {
    render(<Testimonials />);
    // Checking one of the testimonials (since it is duplicated for marquee, use getAllByText)
    const priyaCards = screen.getAllByText('Priya Menon');
    expect(priyaCards.length).toBeGreaterThan(0);
    
    const rohanCards = screen.getAllByText('Rohan Sharma');
    expect(rohanCards.length).toBeGreaterThan(0);
  });

  it('renders social proof footer', () => {
    render(<Testimonials />);
    expect(screen.getByText('10,000+ learners')).toBeInTheDocument();
    expect(screen.getByText('4.9 / 5 average rating')).toBeInTheDocument();
    expect(screen.getByText('Free forever plan available')).toBeInTheDocument();
  });
});
