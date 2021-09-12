import * as React from 'react';

export interface SvgIconProps {
  children: JSX.Element | JSX.Element[];
  height: number;
  minX?: number;
  minY?: number;
  originalHeight: number;
  originalWidth: number;
  title?: string;
  width: number;
  style?: any;
  x?: any;
}

export const SvgIcon = ({
  children,
  height,
  minX = 0,
  minY = 0,
  originalHeight,
  originalWidth,
  title = '',
  width,
  style,
  x,
}: SvgIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox={`${minX} ${minY} ${originalWidth} ${originalHeight}`}
    x={x}
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    {title !== '' && <title>{title}</title>}
    {children}
  </svg>
);
