import { useEffect } from 'react';
import Box from '../../../../components/box';
import Text from '../../../../components/text';
import { GrandmasterList } from '../../components/grandmaster-list/grandmaster-list';
import { useGrandmastersStore } from '../../store/useGrandmastersStore';
import './grandmasters-list-page.css';

export function GrandmastersListPage() {
  const { fetchGrandmasters, grandmasters, loading } = useGrandmastersStore();

  useEffect(() => {
    const needsFetch = grandmasters.length === 0 && !loading;
    if (needsFetch) {
      fetchGrandmasters();
    }
  }, [fetchGrandmasters, grandmasters.length, loading]);

  return (
    <Box className="grandmasters-page">
      <Box className="page-intro" padding="md" margin="md">
        <Text variant="h2">Explore Chess Grandmasters</Text>
        <Text variant="body">
          Browse the list of Chess Grandmasters as defined by Chess.com. Click on any grandmaster to view their profile.
        </Text>
      </Box>

      <GrandmasterList />
    </Box>
  );
}

export default GrandmastersListPage; 