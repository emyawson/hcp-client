import React from 'react';

import { PointSeries } from './graph-point-series.component';

export const TrendSeries = ({
  points,
  x,
  y,
  width,
  height,
  onMouseOver,
  onMouseOut,
  candlestickShape,
  pointsOnAxes = false,
  range,
}) => (
  <PointSeries
    width={width}
    height={height}
    points={points}
    Shape={candlestickShape(
      width / range,
      height,
      onMouseOver,
      onMouseOut,
      pointsOnAxes,
    )}
    padding={0}
  />
);
