import { render, screen, fireEvent, act } from '@testing-library/react';
import QuizPage from './QuizPage';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

// Provide some mock questions so we don't depend on actual data implementation details if they change
jest.mock('@/data/question', () => ({
  QUESTIONS: [
    {
      category: 'Planning',
      question: 'Test question 1?',
      options: ['A', 'B', 'C', 'D'],
      correct: 0,
      explanation: 'Explanation 1',
    },
    {
      category: 'Planning',
      question: 'Test question 2?',
      options: ['A', 'B', 'C', 'D'],
      correct: 1,
      explanation: 'Explanation 2',
    }
  ],
  CATEGORY_COLORS: {
    Planning: { bg: '#F5F1E8', text: '#8B7340', border: '#E8DFC0' }
  }
}));

describe('QuizPage', () => {
  beforeAll(() => {
    // Mock audio context to avoid errors during playSound
    window.AudioContext = jest.fn().mockImplementation(() => ({
      createOscillator: jest.fn(() => ({
        connect: jest.fn(),
        frequency: { setValueAtTime: jest.fn() },
        start: jest.fn(),
        stop: jest.fn(),
      })),
      createGain: jest.fn(() => ({
        connect: jest.fn(),
        gain: { setValueAtTime: jest.fn(), exponentialRampToValueAtTime: jest.fn() },
      })),
      currentTime: 0,
    }));
    
    global.fetch = jest.fn(() => Promise.resolve({ ok: true }));
  });

  afterAll(() => {
    delete window.AudioContext;
    global.fetch.mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders intro phase initially', () => {
    render(<QuizPage />);
    expect(screen.getByText(/Test Your/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start Quiz/i })).toBeInTheDocument();
  });

  it('progresses through quiz flow', async () => {
    render(<QuizPage />);
    
    // Start Quiz
    const startButton = screen.getByRole('button', { name: /Start Quiz/i });
    fireEvent.click(startButton);
    
    // Check we are on question 1
    expect(screen.getByText('Test question 1?')).toBeInTheDocument();
    
    // Answer question 1 correctly (option A)
    const options1 = screen.getAllByRole('button').filter(b => b.textContent.match(/^[A-D].*/));
    fireEvent.click(options1[0]); // Option A
    
    // Check feedback
    expect(screen.getByText('✓ Correct!')).toBeInTheDocument();
    expect(screen.getByText('Explanation 1')).toBeInTheDocument();
    
    // Check streak
    expect(screen.queryByText(/🔥/)).not.toBeInTheDocument(); // Streak only shows > 1
    
    // Next question
    fireEvent.click(screen.getByRole('button', { name: /Next Question/i }));
    
    // Check we are on question 2
    expect(screen.getByText('Test question 2?')).toBeInTheDocument();
    
    // Answer question 2 incorrectly (option A)
    const options2 = screen.getAllByRole('button').filter(b => b.textContent.match(/^[A-D].*/));
    fireEvent.click(options2[0]); // Option A
    
    // Check feedback
    expect(screen.getByText('✗ Not quite right')).toBeInTheDocument();
    expect(screen.getByText('Explanation 2')).toBeInTheDocument();
    
    // Finish quiz
    fireEvent.click(screen.getByRole('button', { name: /See My Results/i }));
    
    // Should see result page
    expect(screen.getByText("Here's How You Did")).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument(); // Score of 1 out of 2
    
    // Verify API call
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/api/dashboard/quiz-attempts', expect.any(Object));
  });
});
