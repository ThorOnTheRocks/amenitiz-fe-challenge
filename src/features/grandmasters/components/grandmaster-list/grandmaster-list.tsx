import { useEffect, useCallback } from 'react';
import Box from '../../../../components/box';
import Text from '../../../../components/text';
import { Pagination } from '../../../../components/pagination';
import GrandmasterCard from '../grandmaster-card';
import { useGrandmastersStore } from '../../store/useGrandmastersStore';
import { useGrandmasterProfileStore } from '../../store/useGrandmasterProfileStore';
import './grandmaster-list.css';

export function GrandmasterList() {  
  const { 
    getCurrentPageItems,
    getTotalPages,
    loading, 
    error, 
    searchTerm, 
    setSearchTerm, 
    currentPage, 
    setCurrentPage
  } = useGrandmastersStore();
  
  const currentPageItems = getCurrentPageItems();
  const totalPages = getTotalPages();
  
  const { prefetchProfiles } = useGrandmasterProfileStore();

  useEffect(() => {
    if (currentPageItems.length === 0) return;
    
    const usernames = currentPageItems.map(gm => gm.username);
    prefetchProfiles(usernames);
  }, [currentPageItems, prefetchProfiles]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    
    if (page < totalPages) {
      const state = useGrandmastersStore.getState();
      const filteredGrandmasters = state.getFilteredGrandmasters();
      const nextPageItems = filteredGrandmasters.slice(
        page * state.itemsPerPage,
        (page + 1) * state.itemsPerPage
      );
      
      const nextPageUsernames = nextPageItems.map(gm => gm.username);
      prefetchProfiles(nextPageUsernames);
    }
  }, [setCurrentPage, totalPages, prefetchProfiles]);

  if (loading) {
    return (
      <Box display="flex" justify="center" padding="lg">
        <Text variant="h3">Loading grandmasters...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justify="center" padding="lg" className="error-message">
        <Text variant="h3">Error loading grandmasters: {error.message}</Text>
      </Box>
    );
  }

  const renderEmptyState = () => (
    <Box padding="md" margin="md">
      <Text variant="body">
        {searchTerm ? `No grandmasters found matching "${searchTerm}"` : 'No grandmasters available'}
      </Text>
    </Box>
  );

  return (
    <Box>
      <Box padding="md" margin="md">
        <input
          type="text"
          placeholder="Search grandmasters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </Box>

      <Box padding="md" margin="md" className="grandmaster-grid">
        {currentPageItems.length > 0 
          ? currentPageItems.map((gm) => (
              <GrandmasterCard key={gm.username} grandmaster={gm} />
            ))
          : renderEmptyState()
        }
      </Box>

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
} 