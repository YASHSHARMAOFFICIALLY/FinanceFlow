import { render, screen } from '@testing-library/react';
import ConceptPage from './page';

describe('Concept Page', () => {
  it('renders correctly for a valid ID', async () => {
    const params = Promise.resolve({ id: '1' });
    const Page = await ConceptPage({ params });
    render(Page);
    
    expect(screen.getByText('Compound Interest')).toBeInTheDocument();
    expect(screen.getByText('The 8th wonder of the world')).toBeInTheDocument();
  });

  it('renders not found for an invalid ID', async () => {
    const params = Promise.resolve({ id: '999' });
    const Page = await ConceptPage({ params });
    render(Page);
    
    expect(screen.getByText('Concept not found')).toBeInTheDocument();
  });
});
