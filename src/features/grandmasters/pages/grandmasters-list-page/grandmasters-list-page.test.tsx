import { render, screen } from '@testing-library/react';
import { GrandmastersListPage } from './grandmasters-list-page';
import { useGrandmastersStore } from '../../store/useGrandmastersStore';
import { describe, expect, it, beforeEach, vi, type Mock } from 'vitest';

vi.mock('../../store/useGrandmastersStore', () => ({
  useGrandmastersStore: vi.fn()
}));

vi.mock('../../components/grandmaster-list', () => ({
  __esModule: true,
  default: () => <div data-testid="grandmaster-list" />
}));

describe('GrandmastersListPage', () => {
  const mockFetchGrandmasters = vi.fn();
  
  beforeEach(() => {
    vi.resetAllMocks();
    
    (useGrandmastersStore as unknown as Mock).mockReturnValue({
      fetchGrandmasters: mockFetchGrandmasters
    });
  });

  it('renders the page title and description', () => {
    render(<GrandmastersListPage />);
    
    expect(screen.getByText('Chess Grandmasters')).toBeInTheDocument();
    expect(screen.getByText(/Browse the list of Chess Grandmasters/)).toBeInTheDocument();
  });

  it('calls fetchGrandmasters on component mount', async () => {
    render(<GrandmastersListPage />);
    
    expect(mockFetchGrandmasters).toHaveBeenCalledTimes(1);
  });

  it('renders the GrandmasterList component', () => {
    render(<GrandmastersListPage />);
    
    expect(screen.getByTestId('grandmaster-list')).toBeInTheDocument();
  });
}); 