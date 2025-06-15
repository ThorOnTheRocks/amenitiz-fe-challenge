import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

const mockToggleTheme = vi.fn();
const mockIsDarkMode = vi.fn().mockReturnValue(false);

vi.mock('./store/use-theme-store', () => ({
  useThemeStore: () => ({
    isDarkMode: mockIsDarkMode(),
    toggleTheme: mockToggleTheme,
  }),
}));

vi.mock('./components/theme-provider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="theme-provider">{children}</div>,
}));

vi.mock('./components/layout', () => ({
  Layout: ({ 
    children, 
    headerTitle,
    headerExternalLinkText,
    headerExternalLinkUrl,
    footerCopyrightText,
    footerDisclaimerText,
    footerLinks,
  }: { 
    children: React.ReactNode,
    headerTitle: string,
    headerExternalLinkText: string,
    headerExternalLinkUrl: string,
    footerCopyrightText: string,
    footerDisclaimerText: string,
    footerLinks: Array<{text: string, url: string}>,
  }) => (
    <div 
      data-testid="layout" 
      data-header-title={headerTitle}
      data-header-link-text={headerExternalLinkText}
      data-header-link-url={headerExternalLinkUrl}
      data-footer-copyright={footerCopyrightText}
      data-footer-disclaimer={footerDisclaimerText}
      data-footer-links={footerLinks?.length}
    >
      {children}
    </div>
  ),
}));

vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div data-testid="browser-router">{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div data-testid="routes">{children}</div>,
  Route: ({ path, element }: { path: string, element: React.ReactNode }) => (
    <div data-testid={`route-${path.replace('/', '').replace(/\//g, '-').replace(/:/g, '')}`}>{element}</div>
  ),
}));

vi.mock('./features/grandmasters/pages', () => ({
  GrandmastersListPage: () => <div data-testid="grandmasters-list-page">Grandmasters List Page</div>,
  GrandmasterProfilePage: () => <div data-testid="grandmaster-profile-page">Grandmaster Profile Page</div>,
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the app with all required components', () => {
    render(<App />);
    
    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    expect(screen.getByTestId('browser-router')).toBeInTheDocument();
    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(screen.getByTestId('routes')).toBeInTheDocument();
    
    expect(screen.getByTestId('route-')).toBeInTheDocument();
    expect(screen.getByTestId('route-grandmaster-username')).toBeInTheDocument();
  });

  it('should pass the correct props to Layout', () => {
    render(<App />);
    
    const layout = screen.getByTestId('layout');
    expect(layout).toHaveAttribute('data-header-title', 'Chess Grandmasters');
    expect(layout).toHaveAttribute('data-header-link-text', 'Chess.com');
    expect(layout).toHaveAttribute('data-header-link-url', 'https://www.chess.com/players');
    expect(layout).toHaveAttribute('data-footer-copyright', 'Chess Grandmasters Explorer');
    expect(layout).toHaveAttribute('data-footer-disclaimer', 'This application uses data from the Chess.com API. Chess.com is a registered trademark.');
    expect(layout).toHaveAttribute('data-footer-links', '3');
  });

  it('should render the correct page components', () => {
    render(<App />);
    
    expect(screen.getByTestId('grandmasters-list-page')).toBeInTheDocument();
    expect(screen.getByTestId('grandmaster-profile-page')).toBeInTheDocument();
  });
}); 