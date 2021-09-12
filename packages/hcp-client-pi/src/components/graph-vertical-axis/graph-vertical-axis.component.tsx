import * as React from 'react';

type GraphTick = {
  label: string;
  value: number;
  color?: string;
};

type VerticalAxisType = {
  x: number;
  y: number;
  height: number;
  ticks: any[];
  padding?: number;
  Tick: (graphTick: GraphTick) => React.ReactNode;
  yDirection?: number;
};

export const VerticalAxis: React.StatelessComponent<VerticalAxisType> = ({
  x = 0,
  y = 0,
  height,
  ticks,
  padding = 0,
  Tick,
  yDirection = -1,
}) => (
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
);
