import React from 'react';
import type { ButtonProps } from './button.types';
import './button.css';


const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isFullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}) => {
  const classes = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    isFullWidth ? 'button--full-width' : '',
    isLoading ? 'button--loading' : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={classes} 
      disabled={disabled || isLoading} 
      {...props}
    >
      {isLoading && <span className="button__spinner"></span>}
      {leftIcon && <span className="button__icon button__icon--left">{leftIcon}</span>}
      <span className="button__text">{children}</span>
      {rightIcon && <span className="button__icon button__icon--right">{rightIcon}</span>}
    </button>
  );
};

export default Button; 