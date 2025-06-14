import { Link } from 'react-router-dom';
import Box from '../box';
import Text from '../text';
import ThemeToggle from '../theme-toggle';
import './header.css';

export function Header() {
  return (
    <Box className="header" padding="md">
      <Box className="header-content" display="flex" justify="between" align="center">
        <Link to="/" className="header-logo">
          <Box display="flex" align="center">
            <div className="logo-icon">♞</div>
            <Text variant="h2">Chess Grandmasters</Text>
          </Box>
        </Link>
        
        <Box className="header-nav">
          <a 
            href="https://www.chess.com/players" 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-link"
          >
            Chess.com
          </a>
          <ThemeToggle />
        </Box>
      </Box>
    </Box>
  );
} 