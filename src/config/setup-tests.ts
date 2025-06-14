import '@testing-library/jest-dom';
import { vi, beforeEach } from 'vitest';

window.HTMLElement.prototype.scrollIntoView = vi.fn();

beforeEach(() => {
  document.documentElement.removeAttribute('data-theme');
}); 