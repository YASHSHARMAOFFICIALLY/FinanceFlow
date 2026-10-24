import { render } from '@testing-library/react';
import { ThemeProvider } from './theme-provider';
import { useTheme } from 'next-themes';

jest.mock('next-themes', () => {
  const original = jest.requireActual('next-themes');
  return {
    ...original,
    ThemeProvider: ({ children }: any) => <div data-testid="mock-theme-provider">{children}</div>,
  };
});

describe('ThemeProvider', () => {
  it('renders children wrapped in next-themes provider', () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    );

    expect(getByTestId('mock-theme-provider')).toBeInTheDocument();
    expect(getByText('Test Child')).toBeInTheDocument();
  });
});
