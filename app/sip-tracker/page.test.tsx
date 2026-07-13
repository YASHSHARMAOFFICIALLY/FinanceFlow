import { render, screen } from '@testing-library/react';
import SIPTrackerPage from './page';

jest.mock('@/components/tools/sipcalculatortools', () => {
  return function MockSipCalculator() {
    return <div data-testid="mock-sip-calculator">Mocked SIP Calculator</div>;
  };
});

describe('SIP Tracker Page', () => {
  it('renders the SipCalculator component', () => {
    render(<SIPTrackerPage />);
    expect(screen.getByTestId('mock-sip-calculator')).toBeInTheDocument();
  });
});
