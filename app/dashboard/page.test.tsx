import { render, screen } from '@testing-library/react';
import DashboardPage from './page';
import { getDashboardData } from '@/lib/dashboard-data';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

// Mock dependencies
jest.mock('next/headers', () => ({
  headers: jest.fn().mockResolvedValue(new Headers()),
}));

jest.mock('@/lib/auth', () => ({
  auth: {
    api: {
      getSession: jest.fn(),
    },
  },
}));

jest.mock('@/lib/dashboard-data', () => ({
  getDashboardData: jest.fn(),
}));

// Mock Child Components
jest.mock('@/components/dashboard/DashboardHero', () => () => <div data-testid="dashboard-hero" />);
jest.mock('@/components/dashboard/FinancialHealthCard', () => () => <div data-testid="financial-health-card" />);
jest.mock('@/components/dashboard/PortfolioChart', () => () => <div data-testid="portfolio-chart" />);
jest.mock('@/components/dashboard/GoalProgress', () => () => <div data-testid="goal-progress" />);
jest.mock('@/components/dashboard/Learningprogress', () => () => <div data-testid="learning-progress" />);
jest.mock('@/components/dashboard/Quiztools', () => () => <div data-testid="quick-tools" />);
jest.mock('@/components/dashboard/QuizActivity', () => () => <div data-testid="recent-activity" />);
jest.mock('@/components/dashboard/SidebarAccountItems', () => () => <div data-testid="sidebar-account-items" />);
jest.mock('@/components/theme-toggle', () => ({ ThemeToggle: () => <div data-testid="theme-toggle" /> }));

describe('Dashboard Page', () => {
  const mockDashboardData = {
    user: {
      firstName: 'John',
      fullName: 'John Doe',
      initial: 'J',
      plan: 'Pro Plan',
    },
    hero: {
      quickStats: [],
      selectedPeriod: 'All',
      dataSource: 'demo',
      dataStatusLabel: 'Demo Data',
      insight: 'Looking good',
    },
    portfolio: {
      currentValue: 1000,
    },
    financialHealth: {},
    goals: {},
    learning: {},
    activities: {},
    tools: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getDashboardData as jest.Mock).mockResolvedValue(mockDashboardData);
  });

  it('renders correctly with authenticated user', async () => {
    const mockSession = { user: { id: 'user1', name: 'John Doe', email: 'john@test.com' } };
    (auth.api.getSession as unknown as jest.Mock).mockResolvedValue(mockSession);

    // Because it's an async component, we await its render
    const Page = await DashboardPage();
    render(Page);

    expect(auth.api.getSession).toHaveBeenCalled();
    expect(getDashboardData).toHaveBeenCalledWith(mockSession.user);

    expect(screen.getByTestId('dashboard-hero')).toBeInTheDocument();
    expect(screen.getByTestId('financial-health-card')).toBeInTheDocument();
    expect(screen.getByTestId('portfolio-chart')).toBeInTheDocument();
    expect(screen.getByTestId('goal-progress')).toBeInTheDocument();
    expect(screen.getByTestId('learning-progress')).toBeInTheDocument();
    expect(screen.getByTestId('quick-tools')).toBeInTheDocument();
    expect(screen.getByTestId('recent-activity')).toBeInTheDocument();
  });

  it('falls back to mock user when unauthenticated', async () => {
    (auth.api.getSession as unknown as jest.Mock).mockRejectedValue(new Error('No session'));

    const Page = await DashboardPage();
    render(Page);

    expect(getDashboardData).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Preview User', email: 'preview@test.com' })
    );
  });
});
