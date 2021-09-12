import React from 'react';

import { colors, strokeWidth } from 'src/domains/diagnostics/styles';
import { Plot, PointSeries } from 'src/domains/diagnostics/lib';

import { Mean } from './metabolic-mean.component';

export const MetabolicDataPoints = ({
  x,
  y,
  width,
  height,
  yDirection = -1,
  padding = 0,
  graphData,
  onPointClick,
  onPointMouseEnter,
  onPointMouseLeave,
  selectedPoint,
  meanBGSD,
  isMaximized,
}) => (
  <Plot
    id="data-points"
    x={x}
    y={y}
    width={width}
    height={height}
    padding={padding}
  >
    <PointSeries
      points={graphData}
      width={width}
      height={height}
      Shape={point => {
        const RECT_SIZE = 8;
        return (
          <rect
            key={`${point.x}-${point.x}-${point.date}`}
            x={point.x - RECT_SIZE / 2}
            y={point.y - RECT_SIZE / 2}
            width={RECT_SIZE}
            height={RECT_SIZE}
            strokeWidth={strokeWidth.one}
            fill={selectedPoint === point.index ? colors.cyan : colors.white}
            stroke={colors.grayDark}
            onMouseMove={event => onPointMouseEnter(event, point, 160)}
            onMouseOut={onPointMouseLeave}
            onClick={isMaximized ? onPointClick(point) : null}
            transform={`rotate(45 ${point.x} ${point.y})`}
          />
        );
      }}
    />
    <Mean
      x={meanBGSD.x * width}
      y={meanBGSD.y * height * yDirection}
      onMouseMove={event => onPointMouseEnter(event, meanBGSD, 160)}
      onMouseOut={onPointMouseLeave}
      width={1200}
    />
  </Plot>
);
