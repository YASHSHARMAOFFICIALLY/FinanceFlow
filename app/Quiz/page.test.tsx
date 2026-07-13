import { render, screen } from '@testing-library/react';
import Page from './page';

jest.mock('@/components/Quiz/QuizPage', () => {
  return function MockQuizPage() {
    return <div data-testid="mock-quiz-page">Mocked Quiz Page</div>;
  };
});

describe('Quiz Page', () => {
  it('renders QuizPage component', () => {
    render(<Page />);
    expect(screen.getByTestId('mock-quiz-page')).toBeInTheDocument();
  });
});
