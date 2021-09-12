import React from 'react';

import { colors } from 'src/core/styles/colors';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
  minX: number,
  minY: number,
};

export const CrossMarkIcon = ({
  height = 12,
  fillColor = colors.charcoal,
  minX = -5,
  minY = -5,
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
      <g stroke={fillColor} strokeWidth="2">
        <path d="M-5,-5 L5,5" />
        <path d="M5,-5 L-5,5" />
      </g>
    </SvgIcon>
  );
};
