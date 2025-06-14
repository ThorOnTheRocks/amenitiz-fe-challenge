import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { GrandmasterList } from './grandmaster-list';
import { useGrandmastersStore } from '../../store/useGrandmastersStore';
import { useGrandmasterProfileStore } from '../../store/useGrandmasterProfileStore';
import type { Grandmaster } from '../../../../types/grandmaster';

vi.mock('../../store/useGrandmastersStore', () => ({
  useGrandmastersStore: vi.fn(),
  getState: vi.fn()
}));

vi.mock('../../store/useGrandmasterProfileStore', () => ({
  useGrandmasterProfileStore: vi.fn()
}));

vi.mock('../grandmaster-card', () => ({
  __esModule: true,
  default: ({ grandmaster }: { grandmaster: Grandmaster }) => (
    <div data-testid="grandmaster-card">{grandmaster.username}</div>
  ),
}));

vi.mock('../../../../components/pagination', () => ({
  Pagination: ({ currentPage, totalPages, onPageChange }: { 
    currentPage: number, 
    totalPages: number, 
    onPageChange: (page: number) => void 
  }) => (
    <div data-testid="pagination">
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
    </div>
  ),
}));

describe('GrandmasterList', () => {
  const mockSetSearchTerm = vi.fn();
  const mockSetCurrentPage = vi.fn();
  const mockPrefetchProfiles = vi.fn();
  
  const generateMockGrandmasters = (count: number): Grandmaster[] => {
    return Array.from({ length: count }, (_, i) => ({
      username: `gm${i + 1}`
    }));
  };
  
  const mockCurrentPageItems = generateMockGrandmasters(10);
  const mockGetCurrentPageItems = vi.fn().mockReturnValue(mockCurrentPageItems);
  const mockGetTotalPages = vi.fn().mockReturnValue(3);
  const mockGetFilteredGrandmasters = vi.fn().mockReturnValue(generateMockGrandmasters(25));
  
  beforeEach(() => {
    vi.resetAllMocks();
    
    (useGrandmastersStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      getCurrentPageItems: mockGetCurrentPageItems,
      getTotalPages: mockGetTotalPages,
      getFilteredGrandmasters: mockGetFilteredGrandmasters,
      loading: false,
      error: null,
      searchTerm: '',
      setSearchTerm: mockSetSearchTerm,
      currentPage: 1,
      setCurrentPage: mockSetCurrentPage,
      grandmasters: generateMockGrandmasters(25),
      itemsPerPage: 10
    });
    
    (useGrandmasterProfileStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      prefetchProfiles: mockPrefetchProfiles
    });
    
    useGrandmastersStore.getState = vi.fn().mockReturnValue({
      getFilteredGrandmasters: mockGetFilteredGrandmasters,
      itemsPerPage: 10
    });
  });

  it('renders the list of grandmasters with pagination', () => {
    render(
      <BrowserRouter>
        <GrandmasterList />
      </BrowserRouter>
    );

    const cards = screen.getAllByTestId('grandmaster-card');
    expect(cards).toHaveLength(10);
    
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    
    expect(mockPrefetchProfiles).toHaveBeenCalledWith(
      mockCurrentPageItems.map(gm => gm.username)
    );
  });

  it('handles search input changes', () => {
    render(
      <BrowserRouter>
        <GrandmasterList />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search grandmasters...');
    fireEvent.change(searchInput, { target: { value: 'mag' } });

    expect(mockSetSearchTerm).toHaveBeenCalledWith('mag');
  });

  it('handles page navigation', () => {
    render(
      <BrowserRouter>
        <GrandmasterList />
      </BrowserRouter>
    );

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
    
    expect(mockPrefetchProfiles).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    (useGrandmastersStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      getCurrentPageItems: mockGetCurrentPageItems,
      getTotalPages: mockGetTotalPages,
      loading: true,
      error: null,
      searchTerm: '',
      setSearchTerm: mockSetSearchTerm,
      currentPage: 1,
      setCurrentPage: mockSetCurrentPage,
      grandmasters: []
    });
    
    render(<GrandmasterList />);
    
    expect(screen.getByText('Loading grandmasters...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    const error = new Error('Failed to fetch');
    
    (useGrandmastersStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      getCurrentPageItems: mockGetCurrentPageItems,
      getTotalPages: mockGetTotalPages,
      loading: false,
      error,
      searchTerm: '',
      setSearchTerm: mockSetSearchTerm,
      currentPage: 1,
      setCurrentPage: mockSetCurrentPage,
      grandmasters: []
    });
    
    render(<GrandmasterList />);
    
    expect(screen.getByText('Error loading grandmasters: Failed to fetch')).toBeInTheDocument();
  });

  it('shows empty state when no results match search', () => {
    (useGrandmastersStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      getCurrentPageItems: vi.fn().mockReturnValue([]),
      getTotalPages: vi.fn().mockReturnValue(0),
      loading: false,
      error: null,
      searchTerm: 'xyz',
      setSearchTerm: mockSetSearchTerm,
      currentPage: 1,
      setCurrentPage: mockSetCurrentPage,
      grandmasters: []
    });
    
    render(<GrandmasterList />);
    
    expect(screen.getByText('No grandmasters found matching "xyz"')).toBeInTheDocument();
  });
}); 