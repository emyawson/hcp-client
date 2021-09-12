/* eslint-disable */
import * as React from 'react';

interface Point {
  x: number;
  y: number;
}

type ShapeType<T extends Point> = (
  point: T,
  i: number,
  points: T[],
) => JSX.Element;

interface PointSeriesProps<T extends Point> {
  points: T[];
  padding?: number;
  width: number;
  height: number;
  Shape: ShapeType<T>;
}

const PointSeries = <T extends Point>({
  points,
  padding = 0,
  width,
  height,
  Shape,
}: PointSeriesProps<T>) => (
  <g>
    {points
      .map(point => {
        const x = padding + point.x * (width - padding * 2);
        const y = -padding - point.y * (height - padding * 2);

        return Object.assign({}, point, { x, y });
      })
      .map(Shape)}
  </g>
);

export { PointSeries };
