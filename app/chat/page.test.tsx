import { render, screen } from '@testing-library/react';
import Home from './page';

jest.mock('@/components/chat/AssistantPage', () => {
  return function MockAssistantPage() {
    return <div data-testid="mock-assistant-page">Mocked Assistant Page</div>;
  };
});

describe('Chat Page', () => {
  it('renders AssistantPage component', () => {
    render(<Home />);
    expect(screen.getByTestId('mock-assistant-page')).toBeInTheDocument();
  });
});
