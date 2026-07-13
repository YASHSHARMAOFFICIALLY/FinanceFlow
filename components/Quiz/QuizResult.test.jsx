import { render, screen, fireEvent } from '@testing-library/react';
import QuizResult from './QuizResult';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('QuizResult', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders perfect score correctly', () => {
    render(<QuizResult score={10} total={10} onRetry={jest.fn()} />);
    
    expect(screen.getByText('Your Score')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('of 10')).toBeInTheDocument();
    expect(screen.getByText("Perfect score!")).toBeInTheDocument();
    expect(screen.getByText("Finance Expert")).toBeInTheDocument();
  });

  it('renders beginner score correctly', () => {
    render(<QuizResult score={2} total={10} onRetry={jest.fn()} />);
    
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText("Start learning!")).toBeInTheDocument();
    expect(screen.getByText("Beginner")).toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', () => {
    const onRetryMock = jest.fn();
    render(<QuizResult score={5} total={10} onRetry={onRetryMock} />);
    
    const retryButton = screen.getByRole('button', { name: /Retry Quiz/i });
    fireEvent.click(retryButton);
    expect(onRetryMock).toHaveBeenCalledTimes(1);
  });

  it('navigates to tools when explore button is clicked', () => {
    render(<QuizResult score={5} total={10} onRetry={jest.fn()} />);
    
    const exploreButton = screen.getByRole('button', { name: /Explore/i });
    fireEvent.click(exploreButton);
    expect(mockPush).toHaveBeenCalledWith('/tools');
  });
});
