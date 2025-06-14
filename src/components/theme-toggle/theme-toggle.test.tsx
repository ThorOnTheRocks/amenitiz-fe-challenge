import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from './theme-toggle';

const mockStore = {
  isDarkMode: false,
  toggleTheme: vi.fn(),
};

vi.mock('../../store/useThemeStore', () => ({
  useThemeStore: () => mockStore,
}));

describe('ThemeToggle', () => {
  it('should render the toggle button', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should display moon icon in light mode', () => {
    mockStore.isDarkMode = false;
    render(<ThemeToggle />);
    // Check for moon icon SVG path
    const button = screen.getByRole('button');
    const svgPath = button.querySelector('path');
    expect(svgPath).toBeInTheDocument();
    expect(svgPath).toHaveAttribute('d', 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z');
  });

  it('should display sun icon in dark mode', () => {
    mockStore.isDarkMode = true;
    render(<ThemeToggle />);
    // Check for sun icon SVG circle
    const button = screen.getByRole('button');
    const svgCircle = button.querySelector('circle');
    expect(svgCircle).toBeInTheDocument();
    expect(svgCircle).toHaveAttribute('cx', '12');
    expect(svgCircle).toHaveAttribute('cy', '12');
    expect(svgCircle).toHaveAttribute('r', '5');
  });

  it('should call toggleTheme when clicked', () => {
    mockStore.toggleTheme.mockClear();
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockStore.toggleTheme).toHaveBeenCalledTimes(1);
  });
}); 