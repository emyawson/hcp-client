import React from 'react';

const resolveAspectDifferences = (anchor = '', cropping = '') =>
  anchor && cropping ? `${anchor} ${cropping}` : anchor;

export const Graph = ({
  children,
  viewportRight,
  viewportBottom,
  viewportLeft = 0,
  viewportTop = 0,
  anchor = '',
  cropping = '',
  width,
  height,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`${viewportLeft} ${viewportTop} ${viewportRight} ${viewportBottom}`}
    preserveAspectRatio={resolveAspectDifferences(anchor, cropping)}
    width={width}
    height={height}
  >
    {children}
  </svg>
);
