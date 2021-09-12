import React from 'react';

import { strokeWidth, colors } from 'src/domains/diagnostics/styles';

const X_LENGTH = 0.006;
const SQUARE_LENGTH = 0.007;
const RADIUS = 0.003;
const TRIANGLE_HYPOTENUSE = 0.006;

const MAX_TRIANGLE_WIDTH = 10;
const MIN_TRIANGLE_WIDTH = 5;

const calculateTrianglePoints = (x, y, width) => {
  width = width > MAX_TRIANGLE_WIDTH ? MAX_TRIANGLE_WIDTH : width;
  width = width < MIN_TRIANGLE_WIDTH ? MIN_TRIANGLE_WIDTH : width;
  const hypotenuse = width;
  const opposite = hypotenuse * Math.sin(Math.PI / 3);
  const adjacent = hypotenuse * Math.cos(Math.PI / 3);

  return {
    x1: x,
    y1: y,
    x2: x - opposite,
    y2: y + adjacent + hypotenuse,
    x3: x + opposite,
    y3: y + adjacent + hypotenuse,
  };
};

export const XShape = ({
  x,
  y,
  width,
  strokeColor = colors.black,
  opacity = 1,
  onClick = () => null,
  onMouseMove = () => null,
  onMouseOut = () => null,
}) => (
  <g>
    <line
      x1={x - width * X_LENGTH}
      x2={x + width * X_LENGTH}
      y1={y}
      y2={y}
      transform={`rotate(45 ${x}, ${y})`}
      strokeWidth={strokeWidth.two}
      stroke={strokeColor}
      opacity={opacity}
    />
    <line
      x1={x - width * X_LENGTH}
      x2={x + width * X_LENGTH}
      y1={y}
      y2={y}
      transform={`rotate(-45 ${x}, ${y})`}
      strokeWidth={strokeWidth.two}
      stroke={strokeColor}
      opacity={opacity}
    />
    <rect
      x={x - width * X_LENGTH * 0.8}
      y={y - width * X_LENGTH * 0.8}
      width={width * X_LENGTH * 1.6}
      height={width * X_LENGTH * 1.6}
      opacity={0}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseOut={onMouseOut}
    />
  </g>
);

export const SquareShape = ({
  x,
  y,
  width,
  strokeColor = colors.black,
  fillColor = colors.white,
  opacity = 1,
  onClick = () => null,
  onMouseMove = () => null,
  onMouseOut = () => null,
}) => (
  <rect
    x={x - (width * SQUARE_LENGTH) / 2}
    y={y - (width * SQUARE_LENGTH) / 2}
    width={width * SQUARE_LENGTH}
    height={width * SQUARE_LENGTH}
    strokeWidth={strokeWidth.two}
    stroke={strokeColor}
    fill={fillColor}
    opacity={opacity}
    onClick={onClick}
    onMouseMove={onMouseMove}
    onMouseOut={onMouseOut}
  />
);

export const CircleShape = ({
  x,
  y,
  width,
  fillColor = colors.black,
  opacity = 1,
  onClick = () => null,
  onMouseMove = () => null,
  onMouseOut = () => null,
}) => (
  <circle
    cx={x}
    cy={y}
    r={width * RADIUS}
    fill={fillColor}
    opacity={opacity}
    onClick={onClick}
    onMouseMove={onMouseMove}
    onMouseOut={onMouseOut}
  />
);

export const TriangleShape = ({
  x,
  y,
  width,
  widthAdjustment = TRIANGLE_HYPOTENUSE,
  fillColor,
  opacity = 1,
  onClick = () => null,
  onMouseMove = () => null,
  onMouseOut = () => null,
}) => {
  const triangle = calculateTrianglePoints(x, y, width * widthAdjustment);
  return (
    <polygon
      points={`
        ${triangle.x1},${triangle.y1}
        ${triangle.x2},${triangle.y2}
        ${triangle.x3},${triangle.y3}
      `}
      fill={fillColor}
      opacity={opacity}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseOut={onMouseOut}
    />
  );
};
