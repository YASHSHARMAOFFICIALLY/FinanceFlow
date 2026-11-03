import { render, screen } from '@testing-library/react';
import Page from './page';
import nextConfig from '../../next.config';

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

  it('configures permanent redirect from /Quiz to /quiz', async () => {
    expect(nextConfig.redirects).toBeDefined();
    if (nextConfig.redirects) {
      const redirects = await nextConfig.redirects();
      expect(redirects).toContainEqual({
        source: '/Quiz',
        destination: '/quiz',
        permanent: true,
      });
    }
  });
});
