import { render, screen, act } from '@testing-library/react';
import LearnHero from './LearnHero';

describe('LearnHero', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('renders hero content', () => {
    render(<LearnHero />);
    expect(screen.getByText(/Learn Finance the/)).toBeInTheDocument();
    expect(screen.getByText(/Smart Way/)).toBeInTheDocument();
    expect(screen.getByText(/Short blogs, curated videos, and essential books/)).toBeInTheDocument();
  });

  it('renders stats', () => {
    render(<LearnHero />);
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('Articles')).toBeInTheDocument();
    
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Video Guides')).toBeInTheDocument();
  });

  it('renders topic pills', () => {
    render(<LearnHero />);
    expect(screen.getByText('Investing')).toBeInTheDocument();
    expect(screen.getByText('Banking')).toBeInTheDocument();
    expect(screen.getByText('Real Estate')).toBeInTheDocument();
  });

  it('handles animation timeout', () => {
    render(<LearnHero />);
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.getByText('Start Learning')).toBeInTheDocument();
  });
});
