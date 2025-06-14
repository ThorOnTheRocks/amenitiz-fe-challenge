import type { HTMLAttributes } from "react";

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'body-sm' | 'caption';
type TextAlign = 'left' | 'center' | 'right';
type TextWeight = 'normal' | 'medium' | 'bold';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: TextVariant;
  as?: React.ElementType;
  align?: TextAlign;
  weight?: TextWeight;
  color?: string;
  truncate?: boolean;
}