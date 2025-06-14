import '@testing-library/jest-dom';
import { vi, beforeEach } from 'vitest';

// Global test setup goes here
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Reset document data-theme attribute before tests
beforeEach(() => {
  document.documentElement.removeAttribute('data-theme');
}); 