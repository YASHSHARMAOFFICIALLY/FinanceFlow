import { render, screen, fireEvent } from '@testing-library/react';
import DiscussionFeed, { POSTS } from './Discussionfeed';

describe('DiscussionFeed', () => {
  it('renders all posts initially when activeCategory is all', () => {
    render(<DiscussionFeed activeCategory="all" newPost={null} />);
    
    // Check if some titles from POSTS are rendered
    expect(screen.getByText(POSTS[0].title)).toBeInTheDocument();
    expect(screen.getByText(POSTS[1].title)).toBeInTheDocument();
  });

  it('filters posts by active category', () => {
    // "tax" category maps to ["Tax", "ELSS"]
    render(<DiscussionFeed activeCategory="tax" newPost={null} />);
    
    const taxPost = POSTS.find(p => p.tags.includes('Tax'));
    const nonTaxPost = POSTS.find(p => !p.tags.includes('Tax') && !p.tags.includes('ELSS'));
    
    expect(screen.getByText(taxPost.title)).toBeInTheDocument();
    expect(screen.queryByText(nonTaxPost.title)).not.toBeInTheDocument();
  });

  it('renders new post', () => {
    const newPost = { title: 'My custom post', tags: ['Investing'] };
    render(<DiscussionFeed activeCategory="all" newPost={newPost} />);
    
    expect(screen.getByText('My custom post')).toBeInTheDocument();
  });

  it('sorts posts', () => {
    render(<DiscussionFeed activeCategory="all" newPost={null} />);
    const sortNewestButton = screen.getByText('Newest');
    
    fireEvent.click(sortNewestButton);
    
    expect(sortNewestButton).toHaveClass('bg-white', 'text-[#0F0F0F]', 'shadow-sm');
  });

  it('renders empty state when no posts match', () => {
    // 'crypto' has no posts in POSTS
    render(<DiscussionFeed activeCategory="crypto" newPost={null} />);
    
    expect(screen.getByText(/No discussions in this category yet/i)).toBeInTheDocument();
  });
});
