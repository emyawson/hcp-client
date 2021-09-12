import React from 'react';

const preparePoint = (p, width, height, padding) => ({
  ...p,
  x: padding + p.x * (width - padding * 2),
  y: -padding - p.y * (height - padding * 2),
});

export const LineSeries = ({
  points,
  Line,
  x,
  y,
  width,
  height,
  padding = 0,
}) => (
  <g>
    {Array.from({ length: points.length - 1 }).map((_, i) => {
      const a = points[i];
      const b = points[i + 1];

      return Line(
        preparePoint(a, width, height, padding),
        preparePoint(b, width, height, padding),
      );
    })}
  </g>
);
