import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { GrandmasterCard } from './grandmaster-card';
import type { Grandmaster } from '../../../../types/grandmaster';
import { describe, expect, it } from 'vitest';

describe('GrandmasterCard', () => {
  const mockGrandmaster: Grandmaster = {
    username: 'testGM'
  };

  it('renders the grandmaster username', () => {
    render(
      <BrowserRouter>
        <GrandmasterCard grandmaster={mockGrandmaster} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('testGM')).toBeInTheDocument();
    expect(screen.getByText('Click to view profile')).toBeInTheDocument();
  });

  it('links to the correct profile page', () => {
    render(
      <BrowserRouter>
        <GrandmasterCard grandmaster={mockGrandmaster} />
      </BrowserRouter>
    );
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/grandmaster/testGM');
  });
}); 