import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from './use-mobile';

describe('useIsMobile', () => {
  const originalInnerWidth = window.innerWidth;
  const matchMediaMock = jest.fn();

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    });
  });

  beforeEach(() => {
    matchMediaMock.mockClear();
    matchMediaMock.mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  afterAll(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: originalInnerWidth,
    });
  });

  const setInnerWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: width,
    });
  };

  it('should return true when window.innerWidth is less than 768', () => {
    setInnerWidth(500);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('should return false when window.innerWidth is exactly 768', () => {
    setInnerWidth(768);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('should return false when window.innerWidth is greater than 768', () => {
    setInnerWidth(1024);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('should update value on matchMedia change event', () => {
    let changeCallback: any;
    
    matchMediaMock.mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn((event, callback) => {
        if (event === 'change') changeCallback = callback;
      }),
      removeEventListener: jest.fn(),
    }));

    setInnerWidth(1024);
    const { result } = renderHook(() => useIsMobile());
    
    expect(result.current).toBe(false);

    // Simulate resizing window to mobile and triggering change
    act(() => {
      setInnerWidth(500);
      if (changeCallback) {
        changeCallback();
      }
    });

    expect(result.current).toBe(true);
  });

  it('should clean up event listeners on unmount', () => {
    const removeEventListenerMock = jest.fn();
    
    matchMediaMock.mockImplementation((query) => ({
      addEventListener: jest.fn(),
      removeEventListener: removeEventListenerMock,
    }));

    const { unmount } = renderHook(() => useIsMobile());
    
    unmount();
    
    expect(removeEventListenerMock).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
