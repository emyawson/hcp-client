import React from 'react';

import { colors } from 'src/domains/diagnostics/styles';

import { SvgIcon } from '../icon';

export const CircleMarkIcon = ({
  height = 12,
  fillColor = colors.charcoal,
  minX = -7,
  minY = -7,
  strokeColor = colors.charcoal,
}) => {
  const originalWidth = 14;
  const originalHeight = 14;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      height={height}
      minX={minX}
      minY={minY}
      originalHeight={originalHeight}
      originalWidth={originalWidth}
      width={height * aspectRatio}
    >
      <circle
        cx="0"
        cy="0"
        r="5"
        stroke={strokeColor}
        fill={fillColor}
        strokeWidth="2"
      />
    </SvgIcon>
  );
};
