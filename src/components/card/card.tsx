import React from 'react';
import type { CardProps } from './card.types';
import './card.css';

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'medium',
  isHoverable = false,
  className = '',
  ...props
}) => {
  const classes = [
    'card',
    `card--${variant}`,
    `card--padding-${padding}`,
    isHoverable ? 'card--hoverable' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
