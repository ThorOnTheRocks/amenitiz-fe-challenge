import { create } from 'zustand';
import type { GrandmasterProfile } from '../../../types/grandmaster';
import { fetchGrandmasterProfile, isProfileCached, prefetchGrandmasterProfiles } from '../services/grandmasters-api';

interface GrandmasterProfileState {
  profile: GrandmasterProfile | null;
  loading: boolean;
  loadingFromCache: boolean;
  error: Error | null;
  currentUsername: string | null;
  
  fetchProfile: (username: string) => Promise<void>;
  prefetchProfiles: (usernames: string[]) => Promise<void>;
  clearProfile: () => void;
}

export const useGrandmasterProfileStore = create<GrandmasterProfileState>((set) => ({
  profile: null,
  loading: false,
  loadingFromCache: false,
  error: null,
  currentUsername: null,
  
  fetchProfile: async (username) => {
    if (!username) {
      set({ error: new Error('Username is required') });
      return;
    }
    
    set({ 
      loading: true, 
      error: null,
      currentUsername: username,
      loadingFromCache: isProfileCached(username)
    });
    
    try {
      const data = await fetchGrandmasterProfile(username);
      set({ profile: data });
    } catch (err) {
      set({ 
        error: err instanceof Error ? err : new Error('Unknown error occurred'),
        profile: null
      });
    } finally {
      set({ loading: false, loadingFromCache: false });
    }
  },
  
  prefetchProfiles: async (usernames) => {
    if (!usernames.length) return;
    
    try {
      await prefetchGrandmasterProfiles(usernames);
    } catch (err) {
      console.error('Error prefetching profiles:', err);
    }
  },
  
  clearProfile: () => {
    set({
      profile: null,
      loading: false,
      loadingFromCache: false,
      error: null,
      currentUsername: null
    });
  }
})); 