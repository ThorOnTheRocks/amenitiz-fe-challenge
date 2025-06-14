import './styles/global.css';
import ThemeProvider from './components/theme-provider';
import ThemeToggle from './components/theme-toggle';
import Box from './components/box';
import Text from './components/text';

function App() {
  return (
    <ThemeProvider>
      <Box padding="md" className="container">
        <Box display="flex" justify="between" align="center" padding="md" margin="md">
          <Box>
            <Text variant="h1">Chess Grandmasters Wiki</Text>
            <Text variant="body">Explore the world of Chess Grandmasters</Text>
          </Box>
          <ThemeToggle />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
