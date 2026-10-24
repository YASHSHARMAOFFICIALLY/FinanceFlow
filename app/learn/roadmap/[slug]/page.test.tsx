import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RoadmapTopicPage from './page';
import { useParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  notFound: jest.fn(() => <div data-testid="not-found">Not Found</div>),
}));

// Mock the roadmap data
jest.mock('@/data/roadmapTopics', () => ({
  ROADMAP_TOPICS: {
    'test-topic': {
      title: 'Test Topic',
      slug: 'test-topic',
      overview: 'Test Overview',
      badge: 'Test Badge',
      duration: '1 week',
      articles: [],
      videos: [],
      books: [],
    },
    'invalid-topic': null,
  },
}));

describe('Roadmap Topic Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Storage.prototype.getItem = jest.fn(() => null);
    Storage.prototype.setItem = jest.fn();
  });

  it('renders not found when topic does not exist', () => {
    (useParams as jest.Mock).mockReturnValue({ slug: 'invalid-topic' });
    render(<RoadmapTopicPage />);
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });

  it('renders correctly for a valid topic', async () => {
    (useParams as jest.Mock).mockReturnValue({ slug: 'test-topic' });
    render(<RoadmapTopicPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Topic')).toBeInTheDocument();
      expect(screen.getByText('Test Overview')).toBeInTheDocument();
    });
  });

  it('toggles completion status in localStorage', async () => {
    (useParams as jest.Mock).mockReturnValue({ slug: 'test-topic' });
    render(<RoadmapTopicPage />);
    
    let btn;
    await waitFor(() => {
      btn = screen.getByRole('button');
      expect(btn).toBeInTheDocument();
    });
    
    fireEvent.click(btn!);
    
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'financeflow_completed_steps',
      JSON.stringify({ 'test-topic': true })
    );
    
    expect(screen.getByText('Step Completed!')).toBeInTheDocument();
  });
});
