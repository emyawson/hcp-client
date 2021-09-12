import * as React from 'react';

type GridLinesType = {
  width: number;
  height: number;
  verticalCount: number;
  horizontalCount: number;
  yDirection?: number;
};

export const GridLines: React.StatelessComponent<GridLinesType> = ({
  width,
  height,
  verticalCount = 0,
  horizontalCount = 0,
  yDirection = -1,
}) => (
  <React.Fragment>
    {Array.from({ length: verticalCount }).map((line, index) => (
      <line
        key={index}
        x1={width * (index / verticalCount)}
        y1={0}
        x2={width * (index / verticalCount)}
        y2={yDirection * height}
        strokeWidth="0.8"
        stroke="#D8D8D8"
        strokeDasharray="3, 3"
      />
    ))}
    {Array.from({ length: horizontalCount }).map((line, index) => (
      <line
        key={index}
        x1={0}
        y1={-height * (index / horizontalCount)}
        x2={width}
        y2={yDirection * height * (index / horizontalCount)}
        strokeWidth="0.8"
        stroke="#D8D8D8"
        strokeDasharray="3, 3"
      />
    ))}
  </React.Fragment>
);
