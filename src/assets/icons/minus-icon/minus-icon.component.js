import React from 'react';

import { colors } from 'src/core/styles/colors';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
};

export const MinusIcon = ({
  height = 2,
  fillColor = colors.grayMedium,
}: Props) => {
  const originalWidth = 10;
  const originalHeight = 2;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M1.801 2c-.6 0-1.05-.088-1.35-.263C.15 1.562 0 1.32 0 1.01S.15.455.45.273C.75.09 1.2 0 1.801 0H8.2c.6 0 1.05.09 1.35.273.3.182.451.427.451.737s-.15.552-.45.727C9.25 1.912 8.8 2 8.199 2H1.8z"
        fill={fillColor}
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};
