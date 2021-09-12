import React from 'react';

import { colors, strokeWidth } from 'src/domains/diagnostics/styles';

export const ThresholdLine = ({
  width,
  height,
  threshold = 0,
  yDirection = -1,
}) => (
  <line
    x1={0}
    y1={yDirection * threshold * height}
    x2={width}
    y2={yDirection * threshold * height}
    strokeWidth={strokeWidth.one}
    stroke={colors.red}
  />
);
