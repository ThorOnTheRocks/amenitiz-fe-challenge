import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './button';

describe('Button', () => {
  it('should render button with children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click Me');
  });

  it('should apply primary variant class by default', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--primary');
  });

  it('should apply secondary variant class when specified', () => {
    render(<Button variant="secondary">Click Me</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--secondary');
  });

  it('should apply ghost variant class when specified', () => {
    render(<Button variant="ghost">Click Me</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--ghost');
  });

  it('should apply small size class correctly', () => {
    const { container } = render(<Button size="sm">Small</Button>);
    expect(container.querySelector('button')).toHaveClass('button--sm');
  });

  it('should apply large size class correctly', () => {
    const { container } = render(<Button size="lg">Large</Button>);
    expect(container.querySelector('button')).toHaveClass('button--lg');
  });

  it('should apply full width class when isFullWidth is true', () => {
    render(<Button isFullWidth>Full Width</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--full-width');
  });

  it('should render loading spinner when isLoading is true', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--loading');
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('should render left icon when provided', () => {
    render(<Button leftIcon={<span data-testid="left-icon">---</span>}>With Icon</Button>);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('should render right icon when provided', () => {
    render(<Button rightIcon={<span data-testid="right-icon">---</span>}>With Icon</Button>);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should be disabled when isLoading is true', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Click Me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should not call onClick when loading', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} isLoading>Click Me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
}); 