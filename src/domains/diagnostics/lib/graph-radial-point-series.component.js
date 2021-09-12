import React from 'react';

const findPointOnCircumference = (x, y, radius, rotation) => ({
  x: x + radius * Math.cos(rotation),
  y: y + radius * Math.sin(rotation),
});

export const RadialPointSeries = ({
  segments,
  diameter,
  Shape,
  padding = 0,
  rotation = 0,
}) => {
  const rawRadius = diameter / 2;
  const radius = rawRadius - padding;
  const unitCircumference = 2 * Math.PI;

  const center = {
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
        return Shape({ ...segment, start, center, end });
      })}
    </g>
  );
};
