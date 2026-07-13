import { render, screen, fireEvent } from '@testing-library/react';
import QuizCard from './QuizCard';

const mockQuestion = {
  category: 'Planning',
  question: 'What is 50/30/20?',
  options: ['A', 'B', 'C', 'D'],
  correct: 0,
  explanation: 'It is a budgeting rule',
};

describe('QuizCard', () => {
  it('renders question and options correctly', () => {
    render(
      <QuizCard
        question={mockQuestion}
        qIndex={0}
        total={10}
        answered={false}
        selectedIdx={null}
        isCorrect={null}
        onAnswer={jest.fn()}
      />
    );
    
    expect(screen.getByText('Question 1 of 10')).toBeInTheDocument();
    expect(screen.getByText('Planning')).toBeInTheDocument();
    expect(screen.getByText('What is 50/30/20?')).toBeInTheDocument();
    expect(screen.getAllByText('A')[0]).toBeInTheDocument(); // Both option label and text happen to be A
  });

  it('calls onAnswer when option clicked', () => {
    const onAnswerMock = jest.fn();
    render(
      <QuizCard
        question={mockQuestion}
        qIndex={0}
        total={10}
        answered={false}
        selectedIdx={null}
        isCorrect={null}
        onAnswer={onAnswerMock}
      />
    );
    
    const optionButton = screen.getAllByRole('button')[0];
    fireEvent.click(optionButton);
    expect(onAnswerMock).toHaveBeenCalledWith(0);
  });

  it('shows feedback and next button when answered', () => {
    const onAnswerMock = jest.fn();
    render(
      <QuizCard
        question={mockQuestion}
        qIndex={0}
        total={10}
        answered={true}
        selectedIdx={0}
        isCorrect={true}
        onAnswer={onAnswerMock}
      />
    );
    
    expect(screen.getByText('✓ Correct!')).toBeInTheDocument();
    expect(screen.getByText('It is a budgeting rule')).toBeInTheDocument();
    
    const nextButton = screen.getByRole('button', { name: /Next Question/i });
    expect(nextButton).toBeInTheDocument();
    
    fireEvent.click(nextButton);
    expect(onAnswerMock).toHaveBeenCalledWith('next');
  });

  it('shows results button on last question', () => {
    render(
      <QuizCard
        question={mockQuestion}
        qIndex={9}
        total={10}
        answered={true}
        selectedIdx={1}
        isCorrect={false}
        onAnswer={jest.fn()}
      />
    );
    
    expect(screen.getByRole('button', { name: /See My Results/i })).toBeInTheDocument();
  });
});
