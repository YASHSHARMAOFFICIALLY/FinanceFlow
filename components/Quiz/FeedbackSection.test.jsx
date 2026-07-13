import { render, screen } from '@testing-library/react';
import FeedbackSection from './FeedbackSection';

describe('FeedbackSection', () => {
  it('renders correct feedback', () => {
    render(<FeedbackSection isCorrect={true} explanation="This is the correct reason" />);
    expect(screen.getByText('✓ Correct!')).toBeInTheDocument();
    expect(screen.getByText('This is the correct reason')).toBeInTheDocument();
  });

  it('renders incorrect feedback', () => {
    render(<FeedbackSection isCorrect={false} explanation="This is why it is incorrect" />);
    expect(screen.getByText('✗ Not quite right')).toBeInTheDocument();
    expect(screen.getByText('This is why it is incorrect')).toBeInTheDocument();
  });
});
