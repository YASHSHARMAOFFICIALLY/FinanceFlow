import { render, screen } from '@testing-library/react';
import VideoDetailPage from './page';

describe('Video Detail Page', () => {
  it('renders correctly for a valid ID', async () => {
    const params = Promise.resolve({ id: 'v1' });
    const Page = await VideoDetailPage({ params });
    render(Page);
    
    expect(screen.getByText("Basics of Investing — A Beginner's Complete Guide")).toBeInTheDocument();
    expect(screen.getByTitle("Basics of Investing — A Beginner's Complete Guide")).toBeInTheDocument(); // iframe
  });

  it('renders not found for an invalid ID', async () => {
    const params = Promise.resolve({ id: '999' });
    const Page = await VideoDetailPage({ params });
    render(Page);
    
    expect(screen.getByText('Video not found')).toBeInTheDocument();
  });
});
