import { render, screen } from '@testing-library/react';
import Home from './page';

jest.mock('@/components/Coummunity/CommunityPage', () => {
  return function MockCommunityPage() {
    return <div data-testid="mock-community-page">Mocked Community Page</div>;
  };
});

describe('Community Page', () => {
  it('renders CommunityPage component', () => {
    render(<Home />);
    expect(screen.getByTestId('mock-community-page')).toBeInTheDocument();
  });
});
