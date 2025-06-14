import './styles/global.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import GrandmastersListPage from './features/grandmasters/pages/grandmasters-list-page';
import GrandmasterProfilePage from './features/grandmasters/pages/grandmaster-profile-page';
import ThemeProvider from './components/theme-provider';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
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
