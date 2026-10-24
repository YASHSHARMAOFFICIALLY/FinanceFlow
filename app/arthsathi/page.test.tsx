import { render, screen } from '@testing-library/react';
import GeminiChatPage, { metadata } from './page';

jest.mock('@/components/gemini-chat/GeminiAssistantPage', () => {
  return function MockGeminiAssistantPage() {
    return <div data-testid="mock-gemini-assistant-page">Mocked Gemini Page</div>;
  };
});

describe('GeminiChatPage', () => {
  it('exports correct metadata', () => {
    expect(metadata.title).toBe('Gemini Finance AI – FinanceFlow');
    expect(metadata.description).toBeDefined();
  });

  it('renders GeminiAssistantPage component', () => {
    render(<GeminiChatPage />);
    expect(screen.getByTestId('mock-gemini-assistant-page')).toBeInTheDocument();
  });
});
