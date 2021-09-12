import React from 'react';

import { Plot } from 'src/domains/diagnostics/lib';
import { weight } from 'src/domains/diagnostics/components/fonts/weights';
import { strokeWidth, colors } from 'src/domains/diagnostics/styles';

import {
  METABOLIC_GRAPH_Y_MAX,
  METABOLIC_GRAPH_X_MAX,
} from '../metabolic.constant';

export const MetabolicStabilityLabels = ({
  x,
  y,
  width,
  height,
  labels,
  yDirection = -1,
  padding = 0,
}) => {
  const LABEL_Y_TOP = 0.93 * height * yDirection;
  const LABEL_Y_BOTTOM = 0.05 * height * yDirection;
  const LABEL_X_LEFT = 0.02 * width;
  const LABEL_X_RIGHT = 0.98 * width;
  const LABEL_FONT_SIZE = 0.01 * width;

  const HORIZONTAL_LINE = {
    X1: 0,
    Y1: (150 / METABOLIC_GRAPH_Y_MAX) * height * yDirection,
    X2: width,
    Y2: (150 / METABOLIC_GRAPH_Y_MAX) * height * yDirection,
  };

  const VERTICAL_LINE = {
    X1: (50 / METABOLIC_GRAPH_X_MAX) * width,
    Y1: 0,
    X2: (50 / METABOLIC_GRAPH_X_MAX) * width,
    Y2: height * yDirection,
  };

  return (
    <Plot
      id="standard-deviation-ellipses"
      x={x}
      y={y}
      width={width}
      height={height}
      padding={padding}
    >
      <line
        x1={HORIZONTAL_LINE.X1}
        y1={HORIZONTAL_LINE.Y1}
        x2={HORIZONTAL_LINE.X2}
        y2={HORIZONTAL_LINE.Y2}
        strokeWidth={strokeWidth.one}
        stroke={colors.grayLight}
      />
      <line
        x1={VERTICAL_LINE.X1}
        y1={VERTICAL_LINE.Y1}
        x2={VERTICAL_LINE.X2}
        y2={VERTICAL_LINE.Y2}
        strokeWidth={strokeWidth.one}
        stroke={colors.grayLight}
      />
      <text
        x={LABEL_X_LEFT}
        y={LABEL_Y_TOP}
        fontSize={LABEL_FONT_SIZE}
        fontWeight={weight.bold}
      >
        {labels.stableHigh}
      </text>
      <text
        x={LABEL_X_LEFT}
        y={LABEL_Y_BOTTOM}
        fontSize={LABEL_FONT_SIZE}
        fontWeight={weight.bold}
      >
        {labels.stableLow}
      </text>
      <text
        x={LABEL_X_RIGHT}
        y={LABEL_Y_TOP}
        fontSize={LABEL_FONT_SIZE}
        textAnchor="end"
        fontWeight={weight.bold}
      >
        {labels.unstableHigh}
      </text>
      <text
        x={LABEL_X_RIGHT}
        y={LABEL_Y_BOTTOM}
        fontSize={LABEL_FONT_SIZE}
        textAnchor="end"
        fontWeight={weight.bold}
      >
        {labels.unstableLow}
      </text>
    </Plot>
  );
};
