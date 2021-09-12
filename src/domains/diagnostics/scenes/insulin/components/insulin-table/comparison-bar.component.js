import React from 'react';

import { colors } from 'src/domains/diagnostics/styles';

export const ComparisonBar = ({
  line1Percentage = 0,
  line1FillColor,
  line2Percentage = 0,
  line2FillColor,
}) => (
  <svg viewBox="0 0 100 3" preserveAspectRatio="xMidYMid slice">
    <rect x="0" y="0" width="100" height="100" fill={colors.grayLighter} />
    <rect
      x="0"
      y="0"
      width={line1Percentage * 100}
      height="100"
      fill={line1FillColor}
    />
    <rect
      x={line1Percentage * 100}
      y="0"
      width={line2Percentage * 100}
      height="100"
      fill={line2FillColor}
    />
  </svg>
);
