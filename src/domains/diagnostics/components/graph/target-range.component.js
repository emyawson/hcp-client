import React from 'react';

import { colors } from 'src/domains/diagnostics/styles';

export const TargetRange = ({ width, height, min = 0, max = 0 }) => {
  const rectHeight = max - min;
  return (
    <rect
      x={0}
      y={-max * height}
      width={width}
      height={rectHeight * height}
      fill={colors.transparentGreen}
    />
  );
};
