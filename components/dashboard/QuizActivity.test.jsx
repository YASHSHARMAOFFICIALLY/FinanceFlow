import { render, screen, fireEvent } from '@testing-library/react';
import QuizActivity from './QuizActivity';

const mockActivities = [
  {
    id: 1,
    icon: '💰',
    title: 'SIP Deposit',
    tag: 'Investing',
    desc: 'Auto-invest',
    time: '2 hrs ago',
    amount: '+₹5,000',
    category: 'Investing',
  },
  {
    id: 2,
    icon: '📚',
    title: 'Lesson Completed',
    tag: 'Learning',
    desc: 'Intro to Stocks',
    time: '1 day ago',
    amount: '+20 xp',
    category: 'Learning',
  },
];

describe('QuizActivity (RecentActivity)', () => {
  it('renders recent activity title', () => {
    render(<QuizActivity activities={mockActivities} />);
    expect(screen.getByText('Recent transactions')).toBeInTheDocument();
  });

  it('renders activities', () => {
    render(<QuizActivity activities={mockActivities} />);
    expect(screen.getByText('SIP Deposit')).toBeInTheDocument();
    expect(screen.getByText('Lesson Completed')).toBeInTheDocument();
  });

  it('filters activities by category', () => {
    render(<QuizActivity activities={mockActivities} />);
    
    // Click Investing filter
    fireEvent.click(screen.getAllByText('Investing')[0]);
    
    expect(screen.getByText('SIP Deposit')).toBeInTheDocument();
    expect(screen.queryByText('Lesson Completed')).not.toBeInTheDocument();
  });

  it('renders empty state if no matching activities', () => {
    render(<QuizActivity activities={mockActivities} />);
    
    fireEvent.click(screen.getByText('Goals'));
    expect(screen.getByText('No activity in this category yet.')).toBeInTheDocument();
  });
});
