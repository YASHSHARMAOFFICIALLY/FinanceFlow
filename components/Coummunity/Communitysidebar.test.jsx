import { render, screen } from '@testing-library/react';
import CommunitySidebar from './Communitysidebar';

// Mock child components
jest.mock('./Trendingtopics', () => () => <div data-testid="trending-topics" />);
jest.mock('./Topcontributors', () => () => <div data-testid="top-contributors" />);

describe('CommunitySidebar', () => {
  it('renders join banner', () => {
    render(<CommunitySidebar />);
    expect(screen.getByText('New to FinanceFlow?')).toBeInTheDocument();
    expect(screen.getByText('Create Free Account')).toBeInTheDocument();
  });

  it('renders community guidelines', () => {
    render(<CommunitySidebar />);
    expect(screen.getByText('Community Guidelines')).toBeInTheDocument();
    expect(screen.getByText(/Be respectful and constructive/i)).toBeInTheDocument();
  });

  it('renders child components', () => {
    render(<CommunitySidebar />);
    expect(screen.getByTestId('trending-topics')).toBeInTheDocument();
    expect(screen.getByTestId('top-contributors')).toBeInTheDocument();
  });
});
