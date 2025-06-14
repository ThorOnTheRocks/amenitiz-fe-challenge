import { useState, useEffect } from 'react';
import type { GrandmasterProfile } from '../../../types/grandmaster';
import { fetchGrandmasterProfile } from '../services/grandmasters-api';

export function useGrandmasterProfile(username: string) {
  const [profile, setProfile] = useState<GrandmasterProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadProfile() {
      if (!username) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchGrandmasterProfile(username);
        setProfile(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [username]);

  return { profile, loading, error };
} 