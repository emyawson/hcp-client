import * as React from 'react';

type Props = {
  width: number,
  height: number,
  title?: string,
  children: React.Node,
  originalWidth: number,
  originalHeight: number,
};

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
}: Props) => (
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
