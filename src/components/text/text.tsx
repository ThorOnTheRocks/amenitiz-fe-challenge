import React from 'react';
import type { TextProps } from './text.types';
import './text.css';

const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  as,
  align = 'left',
  weight,
  color,
  className = '',
  truncate = false,
  style = {},
  ...props
}) => {
  const Component = as || (
    variant === 'h1' ? 'h1' :
    variant === 'h2' ? 'h2' :
    variant === 'h3' ? 'h3' :
    variant === 'h4' ? 'h4' :
    variant === 'h5' ? 'h5' :
    variant === 'h6' ? 'h6' : 'p'
  );

  const classes = [
    'text',
    `text--${variant}`,
    align !== 'left' ? `text--${align}` : '',
    weight ? `text--${weight}` : '',
    truncate ? 'text--truncate' : '',
    className
  ].filter(Boolean).join(' ');

  const combinedStyle = color ? { color, ...style } : style;

  return (
    <Component className={classes} style={combinedStyle} {...props}>
      {children}
    </Component>
  );
};

export default Text; 