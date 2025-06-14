import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ThemeProvider from './theme-provider';

const mockStore = {
  isDarkMode: false,
};

vi.mock('../../store/useThemeStore', () => ({
  useThemeStore: () => mockStore,
}));

describe('ThemeProvider', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('data-theme');
    vi.clearAllMocks();
  });

  it('should render children', () => {
    render(
      <ThemeProvider>
        <div data-testid="test-child">Test Child</div>
      </ThemeProvider>
    );
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('should not apply dark theme when in light mode', () => {
    mockStore.isDarkMode = false;
    
    render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    );
    
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
  });

  it('should apply dark theme when in dark mode', () => {
    mockStore.isDarkMode = true;
    
    render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    );
    
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
}); 