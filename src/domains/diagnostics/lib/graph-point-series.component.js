import React from 'react';

export const PointSeries = ({ points, Shape, width, height, padding = 0 }) => (
  <g>
    {points
      .map(point => ({
        ...point,
        x: padding + point.x * (width - padding * 2),
        y: -padding - point.y * (height - padding * 2),
      }))
      .map(Shape)}
  </g>
);
