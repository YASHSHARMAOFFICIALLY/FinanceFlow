import { render } from '@testing-library/react';
import { useScrollReveal } from './useScrollRevel';
import { useEffect } from 'react';

// Wrapper component to test the hook
const TestComponent = ({ delay = 0, threshold = 0.12 }) => {
  const ref = useScrollReveal(delay, threshold);
  
  return (
    <div ref={ref} data-testid="reveal-element">
      Content
    </div>
  );
};

describe('useScrollReveal', () => {
  let observeMock;
  let disconnectMock;
  let intersectionCallback;
  
  beforeEach(() => {
    observeMock = jest.fn();
    disconnectMock = jest.fn();
    
    window.IntersectionObserver = jest.fn().mockImplementation((callback) => {
      intersectionCallback = callback;
      return {
        observe: observeMock,
        disconnect: disconnectMock,
        unobserve: jest.fn(),
      };
    });
    
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('initializes element styles and observes it', () => {
    const { getByTestId } = render(<TestComponent />);
    const el = getByTestId('reveal-element');
    
    expect(el.style.opacity).toBe('0');
    expect(el.style.transform).toBe('translateY(20px)');
    expect(observeMock).toHaveBeenCalledWith(el);
  });

  it('triggers reveal animation on intersect and disconnects observer', () => {
    const { getByTestId } = render(<TestComponent delay={100} />);
    const el = getByTestId('reveal-element');
    
    // Simulate intersection
    intersectionCallback([{ isIntersecting: true }]);
    
    // Animation shouldn't apply immediately due to delay
    expect(el.style.opacity).toBe('0');
    
    // Fast-forward delay
    jest.advanceTimersByTime(100);
    
    expect(el.style.transition).toBe('opacity 0.55s ease, transform 0.55s ease');
    expect(el.style.opacity).toBe('1');
    expect(el.style.transform).toBe('translateY(0)');
    
    expect(disconnectMock).toHaveBeenCalled();
  });
  
  it('does nothing if not intersecting', () => {
    const { getByTestId } = render(<TestComponent delay={100} />);
    const el = getByTestId('reveal-element');
    
    // Simulate intersection (but false)
    intersectionCallback([{ isIntersecting: false }]);
    
    jest.advanceTimersByTime(100);
    
    expect(el.style.opacity).toBe('0');
    expect(disconnectMock).not.toHaveBeenCalled();
  });
});

