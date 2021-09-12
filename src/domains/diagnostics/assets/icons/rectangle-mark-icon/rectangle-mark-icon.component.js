import React from 'react';

import { colors } from 'src/domains/diagnostics/styles';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
  minX?: number,
  minY?: number,
  strokeColor?: string,
};

export const RectangleMarkIcon = ({
  height = 12,
  fillColor = colors.charcoal,
  minX = -5,
  minY = -5,
  strokeColor = colors.charcoal,
}: Props) => {
  const originalWidth = 10;
  const originalHeight = 10;

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
      <rect
        stroke={strokeColor}
        fill={fillColor}
        strokeWidth="2"
        width="10"
        height="10"
        transform="translate(-5, -5)"
      />
    </SvgIcon>
  );
};
