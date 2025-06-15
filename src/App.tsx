import './styles/global.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout, ThemeProvider } from './components';
import { GrandmastersListPage, GrandmasterProfilePage } from './features/grandmasters/pages';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout
          headerTitle="Chess Grandmasters"
          headerExternalLinkText="Chess.com"
          headerExternalLinkUrl="https://www.chess.com/players"
          footerCopyrightText="Chess Grandmasters Explorer"
          footerDisclaimerText="This application uses data from the Chess.com API. Chess.com is a registered trademark."
          footerLinks={[
            { text: "Terms", url: "https://www.chess.com/terms" },
            { text: "About Chess.com", url: "https://www.chess.com/about" },
            { text: "Privacy", url: "https://www.chess.com/legal/privacy" }
          ]}
        >
          <Routes>
            <Route path="/" element={<GrandmastersListPage />} />
            <Route path="/grandmaster/:username" element={<GrandmasterProfilePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
