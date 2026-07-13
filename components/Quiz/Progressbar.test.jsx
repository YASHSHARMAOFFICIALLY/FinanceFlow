import { render, screen } from '@testing-library/react';
import ProgressBar from './Progressbar';

describe('ProgressBar', () => {
  it('renders correctly', () => {
    render(<ProgressBar current={3} total={10} />);
    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getByText('3 / 10')).toBeInTheDocument();
    expect(screen.getByText('30% complete')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('Finish')).toBeInTheDocument();
  });
});
