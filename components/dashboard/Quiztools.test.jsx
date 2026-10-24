import { render, screen } from '@testing-library/react';
import Quiztools from './Quiztools';

const mockTools = [
  {
    id: '1',
    name: 'SIP Calculator',
    emoji: '📈',
    desc: 'Calculate returns',
    href: '/tools/sip',
  },
  {
    id: '2',
    name: 'Tax Planner',
    emoji: '🧾',
    desc: 'Plan your taxes',
    href: '/tools/tax',
  },
];

describe('Quiztools (QuickTools)', () => {
  it('renders shortcuts title', () => {
    render(<Quiztools tools={mockTools} />);
    expect(screen.getByText('Quick Tools')).toBeInTheDocument();
  });

  it('renders tools', () => {
    render(<Quiztools tools={mockTools} />);
    expect(screen.getByText('SIP Calculator')).toBeInTheDocument();
    expect(screen.getByText('Tax Planner')).toBeInTheDocument();
  });

  it('renders empty state if no tools', () => {
    render(<Quiztools tools={[]} />);
    expect(screen.getByText('No quick tools available yet.')).toBeInTheDocument();
  });
});
