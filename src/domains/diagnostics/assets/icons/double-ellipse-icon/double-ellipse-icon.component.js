import React from 'react';

import { colors } from 'src/domains/diagnostics/styles';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  minX?: number,
  minY?: number,
  strokeColor?: string,
};

export const DoubleEllipseIcon = ({
  height = 12,
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
      <ellipse
        cx="5"
        cy="5"
        rx="4.5"
        ry="3.5"
        fill="none"
        stroke={strokeColor}
        strokeWidth="0.5"
        transform="translate(-5, -5)"
      />
      <ellipse
        cx="5"
        cy="5"
        rx="2.5"
        ry="1.5"
        fill="none"
        stroke={strokeColor}
        strokeWidth="0.5"
        transform="translate(-5, -5)"
      />
    </SvgIcon>
  );
};
