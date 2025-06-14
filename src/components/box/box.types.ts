import type { HTMLAttributes } from "react";

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  as?: React.ElementType;
  display?: 'block' | 'flex' | 'inline' | 'inline-block' | 'grid';
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  margin?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  bgColor?: string;
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}