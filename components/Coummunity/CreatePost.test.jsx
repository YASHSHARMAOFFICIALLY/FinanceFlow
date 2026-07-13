import { render, screen, fireEvent } from '@testing-library/react';
import CreatePost from './CreatePost';

describe('CreatePost', () => {
  it('renders collapsed state initially', () => {
    render(<CreatePost onPost={jest.fn()} />);
    expect(screen.getByText(/Ask a question about investing/i)).toBeInTheDocument();
    expect(screen.getByText('Post Question')).toBeInTheDocument();
  });

  it('expands when clicked', () => {
    render(<CreatePost onPost={jest.fn()} />);
    const button = screen.getByText(/Ask a question/i).closest('button');
    fireEvent.click(button);
    
    expect(screen.getByPlaceholderText("What's your question or insight?")).toBeInTheDocument();
  });

  it('allows typing and posting', () => {
    const mockOnPost = jest.fn();
    render(<CreatePost onPost={mockOnPost} />);
    
    // expand
    fireEvent.click(screen.getByText(/Ask a question/i).closest('button'));
    
    // type title
    const titleInput = screen.getByPlaceholderText("What's your question or insight?");
    fireEvent.change(titleInput, { target: { value: 'My new question' } });
    
    // type body
    const bodyInput = screen.getByPlaceholderText("Add more context, background or details");
    fireEvent.change(bodyInput, { target: { value: 'Some details here' } });
    
    // submit
    const postButton = screen.getByText('Post Discussion');
    fireEvent.click(postButton);
    
    expect(mockOnPost).toHaveBeenCalledWith({
      title: 'My new question',
      body: 'Some details here',
      tags: [],
    });
  });

  it('disables post button when title is empty', () => {
    render(<CreatePost onPost={jest.fn()} />);
    fireEvent.click(screen.getByText(/Ask a question/i).closest('button'));
    
    const postButton = screen.getByText('Post Discussion');
    expect(postButton).toBeDisabled();
  });
});
