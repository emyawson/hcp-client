import * as React from 'react';

interface Point {
  x: number;
  y: number;
}

interface LineSeriesProps<T extends Point> {
  points: T[];
  width: number;
  height: number;
  padding?: number;
  Line(p1: T, p2: T): JSX.Element;
}

const projectPoint = <T extends Point>({
  width,
  height,
  padding = 0,
}: Pick<LineSeriesProps<T>, 'width' | 'height' | 'padding'>) => (point: T) => {
  const x = padding + point.x * (width - padding * 2);
  const y = -padding - point.y * (height - padding * 2);

  return Object.assign({}, point, { x, y });
};

const getPairFrom = <T extends Point>(array: T[]) => (i: number) => [
  array[i],
  array[i + 1],
];

const LineSeries = <T extends Point>({
  points,
  Line,
  width,
  height,
  padding = 0,
}: LineSeriesProps<T>) => {
  const project = projectPoint<T>({ width, height, padding });
  const projections = points.map(project);

  return (
    <g>
      {Array.from({ length: points.length - 1 }, (_, i) => i)
        .map(getPairFrom(projections))
        .map(([a, b]) => Line(a, b))}
    </g>
  );
};

export { LineSeries };
