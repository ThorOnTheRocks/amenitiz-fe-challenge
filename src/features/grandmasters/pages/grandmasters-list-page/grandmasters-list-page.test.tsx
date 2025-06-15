import { render, screen } from '@testing-library/react';
import { GrandmastersListPage } from './grandmasters-list-page';
import * as grandmastersStore from '../../store/use-grandmasters-store';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../components/grandmaster-list/grandmaster-list', () => ({
  GrandmasterList: () => <div data-testid="grandmaster-list" />
}));

describe('GrandmastersListPage', () => {
  const mockFetchGrandmasters = vi.fn();
  
  beforeEach(() => {
    vi.resetAllMocks();
    
    vi.spyOn(grandmastersStore, 'useGrandmastersStore').mockReturnValue({
      fetchGrandmasters: mockFetchGrandmasters,
      grandmasters: [],
      loading: false,
      error: null,
      searchTerm: '',
      setSearchTerm: vi.fn(),
      currentPage: 1,
      setCurrentPage: vi.fn(),
      itemsPerPage: 10,
      getFilteredGrandmasters: vi.fn(),
      getCurrentPageItems: vi.fn(),
      getTotalPages: vi.fn()
    });
  });

  it('should render the page title and description', () => {
    render(
      <BrowserRouter>
        <GrandmastersListPage />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Explore Chess Grandmasters')).toBeInTheDocument();
    expect(screen.getByText(/Browse the list of Chess Grandmasters/)).toBeInTheDocument();
  });

  it('should call fetchGrandmasters on component mount', async () => {
    render(
      <BrowserRouter>
        <GrandmastersListPage />
      </BrowserRouter>
    );
    
    expect(mockFetchGrandmasters).toHaveBeenCalledTimes(1);
  });

  it('should render the GrandmasterList component', () => {
    render(
      <BrowserRouter>
        <GrandmastersListPage />
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('grandmaster-list')).toBeInTheDocument();
  });
}); 