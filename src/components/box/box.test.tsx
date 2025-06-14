import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Box from './box';

describe('Box', () => {
  it('should render children', () => {
    render(
      <Box>
        <div data-testid="box-content">Box Content</div>
      </Box>
    );
    expect(screen.getByTestId('box-content')).toBeInTheDocument();
  });

  it('should render as div by default', () => {
    render(<Box data-testid="default-box">Default Box</Box>);
    const box = screen.getByTestId('default-box');
    expect(box.tagName).toBe('DIV');
  });

  it('should render as specified element type', () => {
    render(<Box as="section" data-testid="section-box">Section Box</Box>);
    const box = screen.getByTestId('section-box');
    expect(box.tagName).toBe('SECTION');
  });

  it('should apply display classes correctly', () => {
    render(<Box display="flex" data-testid="flex-box">Flex Box</Box>);
    expect(screen.getByTestId('flex-box')).toHaveClass('box--flex');
    
    render(<Box display="grid" data-testid="grid-box">Grid Box</Box>);
    expect(screen.getByTestId('grid-box')).toHaveClass('box--grid');
  });

  it('should apply flex direction classes correctly', () => {
    render(<Box display="flex" direction="row" data-testid="row-box">Row Box</Box>);
    expect(screen.getByTestId('row-box')).toHaveClass('box--row');
    
    render(<Box display="flex" direction="column" data-testid="column-box">Column Box</Box>);
    expect(screen.getByTestId('column-box')).toHaveClass('box--column');
  });

  it('should apply alignment classes correctly', () => {
    render(<Box display="flex" align="center" data-testid="center-align-box">Center Aligned</Box>);
    expect(screen.getByTestId('center-align-box')).toHaveClass('box--align-center');
    
    render(<Box display="flex" align="end" data-testid="end-align-box">End Aligned</Box>);
    expect(screen.getByTestId('end-align-box')).toHaveClass('box--align-end');
  });

  it('should apply justification classes correctly', () => {
    render(<Box display="flex" justify="between" data-testid="between-justify-box">Space Between</Box>);
    expect(screen.getByTestId('between-justify-box')).toHaveClass('box--justify-between');
    
    render(<Box display="flex" justify="center" data-testid="center-justify-box">Center Justified</Box>);
    expect(screen.getByTestId('center-justify-box')).toHaveClass('box--justify-center');
  });

  it('should apply wrap classes correctly', () => {
    render(<Box display="flex" wrap="wrap" data-testid="wrap-box">Wrapped Box</Box>);
    expect(screen.getByTestId('wrap-box')).toHaveClass('box--wrap');
    
    render(<Box display="flex" wrap="nowrap" data-testid="nowrap-box">No Wrap Box</Box>);
    expect(screen.getByTestId('nowrap-box')).toHaveClass('box--nowrap');
  });

  it('should apply gap classes correctly', () => {
    render(<Box display="flex" gap="md" data-testid="gap-box">Gap Box</Box>);
    expect(screen.getByTestId('gap-box')).toHaveClass('box--gap-md');
    
    render(<Box display="flex" gap="lg" data-testid="large-gap-box">Large Gap Box</Box>);
    expect(screen.getByTestId('large-gap-box')).toHaveClass('box--gap-lg');
  });

  it('should apply padding classes correctly', () => {
    render(<Box padding="md" data-testid="padding-box">Padded Box</Box>);
    expect(screen.getByTestId('padding-box')).toHaveClass('box--padding-md');
    
    render(<Box padding="xl" data-testid="xl-padding-box">Extra Large Padded Box</Box>);
    expect(screen.getByTestId('xl-padding-box')).toHaveClass('box--padding-xl');
  });

  it('should apply margin classes correctly', () => {
    render(<Box margin="sm" data-testid="margin-box">Margin Box</Box>);
    expect(screen.getByTestId('margin-box')).toHaveClass('box--margin-sm');
    
    render(<Box margin="lg" data-testid="large-margin-box">Large Margin Box</Box>);
    expect(screen.getByTestId('large-margin-box')).toHaveClass('box--margin-lg');
  });

  it('should apply border radius classes correctly', () => {
    render(<Box borderRadius="md" data-testid="rounded-box">Rounded Box</Box>);
    expect(screen.getByTestId('rounded-box')).toHaveClass('box--radius-md');
    
    render(<Box borderRadius="full" data-testid="circle-box">Circle Box</Box>);
    expect(screen.getByTestId('circle-box')).toHaveClass('box--radius-full');
  });

  it('should apply inline styles for width, height, maxWidth, maxHeight', () => {
    render(
      <Box 
        width="200px" 
        height="100px" 
        maxWidth="300px" 
        maxHeight="200px"
        data-testid="sized-box"
      >
        Sized Box
      </Box>
    );
    const box = screen.getByTestId('sized-box');
    expect(box).toHaveStyle('width: 200px');
    expect(box).toHaveStyle('height: 100px');
    expect(box).toHaveStyle('max-width: 300px');
    expect(box).toHaveStyle('max-height: 200px');
  });

  it('should apply background color as inline style', () => {
    render(<Box bgColor="#f0f0f0" data-testid="colored-box">Colored Box</Box>);
    expect(screen.getByTestId('colored-box')).toHaveStyle('background-color: #f0f0f0');
  });

  it('should apply additional className', () => {
    render(<Box className="custom-class" data-testid="custom-box">Custom Box</Box>);
    const box = screen.getByTestId('custom-box');
    expect(box).toHaveClass('box');
    expect(box).toHaveClass('custom-class');
  });

  it('should pass additional props to the element', () => {
    render(<Box aria-label="test-box" data-testid="props-box">Box with Props</Box>);
    expect(screen.getByTestId('props-box')).toHaveAttribute('aria-label', 'test-box');
  });
}); 