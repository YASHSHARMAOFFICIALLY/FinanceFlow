import { render, screen } from '@testing-library/react';
import Page from './page';

jest.mock('@/components/Quiz/QuizPage', () => {
  return function MockQuizPage() {
    return <div data-testid="mock-quiz-page">Mocked Quiz Page</div>;
  };
});

jest.mock('@/components/landing/navbar', () => {
  return function MockNavbar() {
    return <nav data-testid="mock-navbar">Mock Navbar</nav>;
  };
});

describe('Quiz Page', () => {
  it('renders QuizPage and Navbar components', () => {
    render(<Page />);
    expect(screen.getByTestId('mock-navbar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-quiz-page')).toBeInTheDocument();
  });
});
