import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Text } from './text';

describe('Text', () => {
  it('should render children as content', () => {
    render(<Text>Hello World</Text>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('should render as paragraph by default', () => {
    render(<Text>Default Text</Text>);
    expect(screen.getByText('Default Text').tagName).toBe('P');
  });

  it('should apply text--body class by default', () => {
    render(<Text>Default Text</Text>);
    expect(screen.getByText('Default Text')).toHaveClass('text--body');
  });

  it('should render as h1 when variant is h1', () => {
    render(<Text variant="h1">Heading 1</Text>);
    expect(screen.getByText('Heading 1').tagName).toBe('H1');
    expect(screen.getByText('Heading 1')).toHaveClass('text--h1');
  });

  it('should render as h2 when variant is h2', () => {
    render(<Text variant="h2">Heading 2</Text>);
    expect(screen.getByText('Heading 2').tagName).toBe('H2');
    expect(screen.getByText('Heading 2')).toHaveClass('text--h2');
  });

  it('should render as h3 when variant is h3', () => {
    render(<Text variant="h3">Heading 3</Text>);
    expect(screen.getByText('Heading 3').tagName).toBe('H3');
    expect(screen.getByText('Heading 3')).toHaveClass('text--h3');
  });

  it('should use the as prop to override the element type', () => {
    render(<Text variant="h1" as="span">Heading as span</Text>);
    expect(screen.getByText('Heading as span').tagName).toBe('SPAN');
    expect(screen.getByText('Heading as span')).toHaveClass('text--h1');
  });

  it('should apply text alignment classes', () => {
    render(<Text align="center">Centered Text</Text>);
    expect(screen.getByText('Centered Text')).toHaveClass('text--center');
    
    render(<Text align="right">Right Text</Text>);
    expect(screen.getByText('Right Text')).toHaveClass('text--right');
  });

  it('should apply font weight classes', () => {
    render(<Text weight="bold">Bold Text</Text>);
    expect(screen.getByText('Bold Text')).toHaveClass('text--bold');
    
    render(<Text weight="medium">Medium Text</Text>);
    expect(screen.getByText('Medium Text')).toHaveClass('text--medium');
  });

  it('should apply truncate class when truncate is true', () => {
    render(<Text truncate>Truncated Text</Text>);
    expect(screen.getByText('Truncated Text')).toHaveClass('text--truncate');
  });

  it('should apply custom className', () => {
    render(<Text className="custom-class">Custom Class</Text>);
    expect(screen.getByText('Custom Class')).toHaveClass('custom-class');
  });

  it('should apply custom color as inline style', () => {
    render(<Text color="blue">Colored Text</Text>);
    const element = screen.getByText('Colored Text');
    
    expect(element.style.color).toBeTruthy();
  });
}); 