import { render, screen, fireEvent } from '@testing-library/react';
import QuizHero from './Quizhero';

describe('QuizHero', () => {
  it('renders hero correctly', () => {
    render(<QuizHero onStart={jest.fn()} />);
    expect(screen.getByText(/Test Your/)).toBeInTheDocument();
    expect(screen.getByText(/Financial/)).toBeInTheDocument();
    expect(screen.getByText(/Intelligence/)).toBeInTheDocument();
    expect(screen.getByText('10 questions')).toBeInTheDocument();
    expect(screen.getByText('~5 minutes')).toBeInTheDocument();
  });

  it('handles start click', () => {
    const onStartMock = jest.fn();
    render(<QuizHero onStart={onStartMock} />);
    
    const startButton = screen.getByRole('button', { name: /Start Quiz/i });
    fireEvent.click(startButton);
    
    expect(onStartMock).toHaveBeenCalledTimes(1);
  });
});
