import { useState, useEffect } from 'react';
import type { Grandmaster } from '../../../types/grandmaster';
import { fetchGrandmasters } from '../services/grandmasters-api';

export function useGrandmasters() {
  const [grandmasters, setGrandmasters] = useState<Grandmaster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadGrandmasters() {
      try {
        setLoading(true);
        const data = await fetchGrandmasters();
        setGrandmasters(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    }

    loadGrandmasters();
  }, []);

  return { grandmasters, loading, error };
} 