import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LearningProgress from './Learningprogress';

const mockLearning = {
  streak: 5,
  latestQuiz: { topic: 'Investing 101', date: 'Oct 25', score: 8, total: 10 },
  modules: [
    {
      id: 'm1',
      title: 'Basics of Stock Market',
      lessons: 5,
      completed: 2,
      current: true,
      icon: '📈',
      color: '#C9A84C',
      bgColor: '#F5F1E8',
      borderColor: '#E8DFC0',
      badge: 'Beginner',
      locked: false,
    },
    {
      id: 'm2',
      title: 'Advanced Options',
      lessons: 10,
      completed: 0,
      current: false,
      locked: true,
      icon: '🔒',
    },
  ],
};

describe('LearningProgress', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders progress and streak', () => {
    render(<LearningProgress learning={mockLearning} />);
    expect(screen.getByText('🔥 5')).toBeInTheDocument();
    expect(screen.getByText('2 of 15 lessons complete')).toBeInTheDocument();
  });

  it('renders modules', () => {
    render(<LearningProgress learning={mockLearning} />);
    expect(screen.getByText('Basics of Stock Market')).toBeInTheDocument();
    expect(screen.getByText('Advanced Options')).toBeInTheDocument();
  });

  it('renders latest quiz', () => {
    render(<LearningProgress learning={mockLearning} />);
    expect(screen.getByText('Latest Quiz — Investing 101')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('/10')).toBeInTheDocument();
  });

  it('handles completing a lesson', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        modules: [
          { ...mockLearning.modules[0], completedLessons: 3 },
          mockLearning.modules[1],
        ],
      }),
    });

    render(<LearningProgress learning={mockLearning} />);
    
    const completeBtn = screen.getByText('Complete lesson');
    fireEvent.click(completeBtn);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/dashboard/learning/m1', expect.objectContaining({
        method: 'PATCH',
      }));
    });
  });
});
