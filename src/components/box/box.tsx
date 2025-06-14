import React from 'react';
import type { CSSProperties } from 'react';
import type { BoxProps } from './box.types';
import './box.css';



const Box: React.FC<BoxProps> = ({
  children,
  as = 'div',
  display,
  direction,
  align,
  justify,
  wrap,
  gap,
  padding = 'none',
  margin = 'none',
  width,
  height,
  maxWidth,
  maxHeight,
  bgColor,
  borderRadius,
  className = '',
  style = {},
  ...props
}) => {
  const Component = as;
  
  const classes = [
    'box',
    display ? `box--${display}` : '',
    direction ? `box--${direction}` : '',
    align ? `box--align-${align}` : '',
    justify ? `box--justify-${justify}` : '',
    wrap ? `box--${wrap}` : '',
    gap ? `box--gap-${gap}` : '',
    padding !== 'none' ? `box--padding-${padding}` : '',
    margin !== 'none' ? `box--margin-${margin}` : '',
    borderRadius ? `box--radius-${borderRadius}` : '',
    className
  ].filter(Boolean).join(' ');
  
  const inlineStyles: CSSProperties = {
    ...style,
    ...(width && { width }),
    ...(height && { height }),
    ...(maxWidth && { maxWidth }),
    ...(maxHeight && { maxHeight }),
    ...(bgColor && { backgroundColor: bgColor }),
  };

  return (
    <Component className={classes} style={inlineStyles} {...props}>
      {children}
    </Component>
  );
};

export default Box; 