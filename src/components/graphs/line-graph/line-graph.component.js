import React from 'react';

import { AbstractLineGraph } from './abstract-line-graph.component';

type LineGraphProps = {
  color?: string,
  stroke?: string, // stroke color
  strokeStyle?: 'solid' | 'dashed',
  strokeWidth?: number,
  opacity?: number,
  onLineClick?: () => void,
};

type Line = {
  x: number,
  y: number,
};

type Lines = Array<Array<Line>>;

export const LineGraph = ({
  color,
  stroke,
  strokeStyle,
  strokeWidth = 2,
  opacity = 1,
  onLineClick = () => {},
}: LineGraphProps) => (lines: Lines) =>
  lines.map((line, index) => (
    <AbstractLineGraph
      color={color}
      data={line}
      key={index} // eslint-disable-line react/no-array-index-key
      stroke={stroke}
      strokeStyle={strokeStyle}
      strokeWidth={strokeWidth}
      opacity={opacity}
      onLineClick={onLineClick}
    />
  ));
