import Box from '../box';
import Text from '../text';
import './footer.css';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box className="footer" padding="md">
      <Box className="footer-content" display="flex" justify="between" align="center">
        <Text variant="body" className="copyright">
          &copy; {currentYear} Chess Grandmasters Explorer
        </Text>
        
        <Box className="footer-links">
          <a 
            href="https://www.chess.com/terms" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            Terms
          </a>
          <a 
            href="https://www.chess.com/about" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            About Chess.com
          </a>
          <a 
            href="https://www.chess.com/legal/privacy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            Privacy
          </a>
        </Box>
      </Box>
      
      <Box className="footer-disclaimer" margin="sm">
        <Text variant="caption">
          This application uses data from the Chess.com API. Chess.com is a registered trademark.
        </Text>
      </Box>
    </Box>
  );
} 