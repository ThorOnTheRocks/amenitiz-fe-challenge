import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GrandmasterList } from './grandmaster-list';
import * as grandmastersStoreModule from '../../store/use-grandmasters-store';
import * as profileStoreModule from '../../store/use-grandmaster-profile-store';

vi.mock('../grandmaster-card', () => ({
  default: () => <div data-testid="grandmaster-card">Mocked Card</div>
}));

vi.mock('../../../../components/pagination', () => ({
  Pagination: () => <div data-testid="pagination">Mocked Pagination</div>
}));

describe('GrandmasterList', () => {
  it('should show loading state', () => {
    vi.spyOn(grandmastersStoreModule, 'useGrandmastersStore').mockReturnValue({
      getCurrentPageItems: () => [],
      getTotalPages: () => 0,
      loading: true,
      error: null,
      searchTerm: '',
      setSearchTerm: vi.fn(),
      currentPage: 1,
      setCurrentPage: vi.fn(),
      grandmasters: [],
      itemsPerPage: 10,
      fetchGrandmasters: vi.fn(),
      getFilteredGrandmasters: vi.fn()
    });
    
    vi.spyOn(profileStoreModule, 'useGrandmasterProfileStore').mockReturnValue({
      prefetchProfiles: vi.fn(),
      loading: false,
      error: null,
      profiles: {},
      fetchProfile: vi.fn()
    });
        
    render(<GrandmasterList />);
    
    expect(screen.getByText('Loading grandmasters...')).toBeInTheDocument();
  });

  it('should show error state', () => {
    const error = new Error('Failed to fetch');
    
    vi.spyOn(grandmastersStoreModule, 'useGrandmastersStore').mockReturnValue({
      getCurrentPageItems: () => [],
      getTotalPages: () => 0,
      loading: false,
      error,
      searchTerm: '',
      setSearchTerm: vi.fn(),
      currentPage: 1,
      setCurrentPage: vi.fn(),
      grandmasters: [],
      itemsPerPage: 10,
      fetchGrandmasters: vi.fn(),
      getFilteredGrandmasters: vi.fn()
    });
    
    vi.spyOn(profileStoreModule, 'useGrandmasterProfileStore').mockReturnValue({
      prefetchProfiles: vi.fn(),
      loading: false,
      error: null,
      profiles: {},
      fetchProfile: vi.fn()
    });
    
    render(<GrandmasterList />);
    
    expect(screen.getByText('Error loading grandmasters: Failed to fetch')).toBeInTheDocument();
  });

  it('should show empty state when no results match search', () => {
    vi.spyOn(grandmastersStoreModule, 'useGrandmastersStore').mockReturnValue({
      getCurrentPageItems: () => [],
      getTotalPages: () => 0,
      loading: false,
      error: null,
      searchTerm: 'xyz',
      setSearchTerm: vi.fn(),
      currentPage: 1,
      setCurrentPage: vi.fn(),
      grandmasters: [],
      itemsPerPage: 10,
      fetchGrandmasters: vi.fn(),
      getFilteredGrandmasters: vi.fn()
    });
    
    vi.spyOn(profileStoreModule, 'useGrandmasterProfileStore').mockReturnValue({
      prefetchProfiles: vi.fn(),
      loading: false,
      error: null,
      profiles: {},
      fetchProfile: vi.fn()
    });
    
    render(<GrandmasterList />);
    
    expect(screen.getByText('No grandmasters found matching "xyz"')).toBeInTheDocument();
  });
}); 