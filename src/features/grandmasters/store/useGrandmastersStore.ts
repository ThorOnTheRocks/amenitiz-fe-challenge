import { create } from 'zustand';
import type { Grandmaster } from '../../../types/grandmaster';
import { fetchGrandmasters } from '../services/grandmasters-api';

interface GrandmastersState {
  grandmasters: Grandmaster[];
  loading: boolean;
  error: Error | null;
  searchTerm: string;
  currentPage: number;
  itemsPerPage: number;
  
  fetchGrandmasters: () => Promise<void>;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  
  getFilteredGrandmasters: () => Grandmaster[];
  getCurrentPageItems: () => Grandmaster[];
  getTotalPages: () => number;
}

export const useGrandmastersStore = create<GrandmastersState>((set, get) => ({
  grandmasters: [],
  loading: false,
  error: null,
  searchTerm: '',
  currentPage: 1,
  itemsPerPage: 10,
  
  fetchGrandmasters: async () => {
    set({ loading: true, error: null });
    
    try {
      const data = await fetchGrandmasters();
      set({ grandmasters: data });
    } catch (err) {
      set({ error: err instanceof Error ? err : new Error('Unknown error occurred') });
    } finally {
      set({ loading: false });
    }
  },
  
  setSearchTerm: (term) => {
    set({ searchTerm: term, currentPage: 1 });
  },
  
  setCurrentPage: (page) => {
    set({ currentPage: page });
  },
  
  getFilteredGrandmasters: () => {
    const { grandmasters, searchTerm } = get();
    
    const filtered = searchTerm
      ? grandmasters.filter(gm => 
          gm.username.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : grandmasters;
    
    return filtered;
  },
  
  getTotalPages: () => {
    const { getFilteredGrandmasters, itemsPerPage } = get();
    const filteredGrandmasters = getFilteredGrandmasters();
    const pages = Math.ceil(filteredGrandmasters.length / itemsPerPage);
    return pages;
  },
  
  getCurrentPageItems: () => {
    const { getFilteredGrandmasters, currentPage, itemsPerPage } = get();
    const filteredGrandmasters = getFilteredGrandmasters();
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    const items = filteredGrandmasters.slice(startIndex, endIndex);
    return items;
  }
})); 