import { render, screen } from '@testing-library/react';
import LearnPage from './page';

jest.mock('@/components/learn/LearnHero', () => () => <div data-testid="learn-hero" />);
jest.mock('@/components/learn/BlogSection', () => () => <div data-testid="blog-section" />);
jest.mock('@/components/learn/videosection', () => () => <div data-testid="video-section" />);
jest.mock('@/components/learn/booksection', () => () => <div data-testid="books-section" />);
jest.mock('@/components/learn/FinanceConcept', () => () => <div data-testid="finance-concepts" />);
jest.mock('@/components/learn/learningpath', () => () => <div data-testid="learning-path" />);
jest.mock('@/components/learn/Newsletter', () => () => <div data-testid="newsletter" />);
jest.mock('@/components/landing/navbar', () => () => <div data-testid="navbar" />);
jest.mock('@/components/landing/footer', () => () => <div data-testid="footer" />);

describe('Learn Page', () => {
  it('renders all sections and layout components', () => {
    render(<LearnPage />);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('learn-hero')).toBeInTheDocument();
    expect(screen.getByTestId('blog-section')).toBeInTheDocument();
    expect(screen.getByTestId('video-section')).toBeInTheDocument();
    expect(screen.getByTestId('books-section')).toBeInTheDocument();
    expect(screen.getByTestId('finance-concepts')).toBeInTheDocument();
    expect(screen.getByTestId('learning-path')).toBeInTheDocument();
    expect(screen.getByTestId('newsletter')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
