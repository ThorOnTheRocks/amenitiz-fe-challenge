import { Link } from 'react-router-dom';
import { Box, Text } from '../../../../components';
import type { Grandmaster } from '../../../../types/grandmaster';
import './grandmaster-card.css';

interface GrandmasterCardProps {
  grandmaster: Grandmaster;
}

export function GrandmasterCard({ grandmaster }: GrandmasterCardProps) {
  return (
    <Box 
        padding="md" 
        margin="sm" 
        className="grandmaster-card"
      >
        <Text variant="h3" truncate={true} title={grandmaster.username}>
          {grandmaster.username}
        </Text>
        <Link to={`/grandmaster/${grandmaster.username}`} className="grandmaster-card-link">
            <Text variant="body">Click to view profile</Text>
        </Link>
    </Box>
  );
} 