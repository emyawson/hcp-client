import React from 'react';

export const Plot = ({ children, x, y, width, height, id }) => (
  <React.Fragment>
    <defs>
      <clipPath id={`${id}`}>
        <rect {...{ x: 0, y: -height, width, height }} />
      </clipPath>
    </defs>
    <g transform={`translate(${x},${y + height})`} clipPath={`url(#${id})`}>
      {children}
    </g>
  </React.Fragment>
);
