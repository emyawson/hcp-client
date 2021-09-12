import React from 'react';

export const VerticalAxis = ({
  x = 0,
  y = 0,
  height,
  ticks,
  padding = 0,
  Tick,
  yDirection = -1,
}) => (
  <React.Fragment>
    <g transform={`translate(${x},${y * yDirection})`}>
      {ticks
        .map(tick => ({
          ...tick,
          value:
            yDirection * padding +
            yDirection * (tick.value * (height - padding * 2)),
        }))
        .map(Tick)}
    </g>
  </React.Fragment>
);
