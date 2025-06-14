import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './card';

describe('Card', () => {
  it('should render children', () => {
    render(
      <Card>
        <div data-testid="card-content">Card Content</div>
      </Card>
    );
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
  });

  it('should apply default variant class', () => {
    const { container } = render(<Card>Default Card</Card>);
    expect(container.querySelector('.card')).toHaveClass('card--default');
  });

  it('should apply outlined variant class when specified', () => {
    const { container } = render(<Card variant="outlined">Outlined Card</Card>);
    expect(container.querySelector('.card')).toHaveClass('card--outlined');
  });

  it('should apply elevated variant class when specified', () => {
    const { container } = render(<Card variant="elevated">Elevated Card</Card>);
    expect(container.querySelector('.card')).toHaveClass('card--elevated');
  });

  it('should apply medium padding by default', () => {
    const { container } = render(<Card>Default Padding</Card>);
    expect(container.querySelector('.card')).toHaveClass('card--padding-medium');
  });

  it('should apply small padding when specified', () => {
    const { container } = render(<Card padding="small">Small Padding</Card>);
    expect(container.querySelector('.card')).toHaveClass('card--padding-small');
  });

  it('should apply large padding when specified', () => {
    const { container } = render(<Card padding="large">Large Padding</Card>);
    expect(container.querySelector('.card')).toHaveClass('card--padding-large');
  });

  it('should apply no padding when specified', () => {
    const { container } = render(<Card padding="none">No Padding</Card>);
    expect(container.querySelector('.card')).toHaveClass('card--padding-none');
  });

  it('should apply hoverable class when isHoverable is true', () => {
    const { container } = render(<Card isHoverable>Hoverable Card</Card>);
    expect(container.querySelector('.card')).toHaveClass('card--hoverable');
  });

  it('should apply additional classNames', () => {
    const { container } = render(<Card className="custom-class">Custom Card</Card>);
    const card = container.querySelector('.card');
    expect(card).toHaveClass('card');
    expect(card).toHaveClass('custom-class');
  });

  it('should pass additional props to the div', () => {
    render(<Card data-testid="custom-card">Card with Props</Card>);
    expect(screen.getByTestId('custom-card')).toBeInTheDocument();
    expect(screen.getByTestId('custom-card')).toHaveTextContent('Card with Props');
  });
}); 