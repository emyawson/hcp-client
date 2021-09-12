import * as React from 'react';

type GraphTick = {
  label: string;
  value: number;
  color?: string;
};

type HorizontalAxisType = {
  x: number;
  y: number;
  width: number;
  ticks: any[];
  padding?: number;
  Tick: (graphTick: GraphTick) => React.ReactNode;
};

export const HorizontalAxis: React.StatelessComponent<HorizontalAxisType> = ({
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
