import { render, screen } from '@testing-library/react';
import CTA from './cta';

describe('CTA', () => {
  beforeAll(() => {
    // Mock IntersectionObserver
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

  it('renders CTA heading and text', () => {
    render(<CTA />);
    expect(screen.getByText('Start Building Financial Intelligence Today.')).toBeInTheDocument();
    expect(screen.getByText(/Join thousands of people/)).toBeInTheDocument();
  });

  it('renders links', () => {
    render(<CTA />);
    expect(screen.getByText('Create Free Account')).toBeInTheDocument();
    expect(screen.getByText('See how it works →')).toBeInTheDocument();
  });
});
