import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CommunityPage from './CommunityPage';

jest.mock('@/components/theme-toggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle" />
}));

describe('CommunityPage', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it('renders navbar elements', () => {
    render(<CommunityPage />);
    expect(screen.getByText('FinanceFlow')).toBeInTheDocument();
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('scrolls to create post on start discussion', () => {
    render(<CommunityPage />);
    const startDiscussionBtn = screen.getByRole('button', { name: /Start a Discussion/i });
    
    fireEvent.click(startDiscussionBtn);
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('updates category', () => {
    render(<CommunityPage />);
    const investingButton = screen.getAllByText('Investing')[0].closest('button');
    
    fireEvent.click(investingButton);
    expect(investingButton).toHaveClass('bg-[#0F0F0F]', 'text-white');
  });

  it('handles creating a new post', async () => {
    render(<CommunityPage />);
    
    // expand create post
    fireEvent.click(screen.getByText(/Ask a question/i).closest('button'));
    
    const titleInput = screen.getByPlaceholderText("What's your question or insight?");
    fireEvent.change(titleInput, { target: { value: 'New Test Post' } });
    
    const postButton = screen.getByText('Post Discussion');
    fireEvent.click(postButton);
    
    await waitFor(() => {
      expect(screen.getByText('New Test Post')).toBeInTheDocument();
    });
  });
});
