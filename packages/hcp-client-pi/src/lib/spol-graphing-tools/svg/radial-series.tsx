import * as React from 'react';

interface Point {
  x: number;
  y: number;
}

interface Segment {
  value: number;
}

interface Arc {
  start: Point;
  center: Point;
  end: Point;
}

const findPointOnCircumference: (
  x: number,
  y: number,
  r: number,
  o: number,
) => Point = (x, y, radius, rotation) => ({
  x: x + radius * Math.cos(rotation),
  y: y + radius * Math.sin(rotation),
});

type ShapeType<T> = (arc: T & Arc) => JSX.Element;

interface RadialPointSeriesProps<T extends Segment> {
  segments: T[];
  diameter: number;
  Shape: ShapeType<T>;
  padding?: number;
  rotation?: number;
}

type RadialPointSeriesConstructor = <T extends Segment>(
  x: RadialPointSeriesProps<T>,
) => JSX.Element;
const RadialPointSeries: RadialPointSeriesConstructor = ({
  segments,
  diameter,
  Shape,
  padding = 0,
  rotation = 0,
}) => {
  const rawRadius = diameter / 2;
  const radius = rawRadius - padding / 2;
  const unitCircumference = 2 * Math.PI;

  const center: Point = {
    x: rawRadius,
    y: rawRadius,
  };

  return (
    <g>
      {segments.map((segment, i) => {
        const priorSegments = segments.slice(0, i);
        const priorValues = priorSegments
          .map(({ value }) => value)
          .reduce((x, y) => x + y, 0);
        const priorRotation = unitCircumference * priorValues;
        const start = findPointOnCircumference(
          center.x,
          center.y,
          radius,
          priorRotation + rotation,
        );
        const currentValue = segment.value;
        const currentRotation =
          priorRotation + currentValue * unitCircumference;

        const end = findPointOnCircumference(
          center.x,
          center.y,
          radius,
          currentRotation + rotation,
        );

        const result: typeof segment & Arc = Object.assign({}, segment, {
          start,
          center,
          end,
        });
        return Shape(result);
      })}
    </g>
  );
};

export { RadialPointSeries };
