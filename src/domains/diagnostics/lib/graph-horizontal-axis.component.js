import React from 'react';

export const HorizontalAxis = ({
  x = 0,
  y = 0,
  width,
  ticks,
  padding = 0,
  Tick,
}) => (
  <g transform={`translate(${x},${-y})`}>
    {ticks
      .map(tick => ({
        ...tick,
        value: padding + tick.value * (width - padding * 2),
      }))
      .map(Tick)}
  </g>
);
