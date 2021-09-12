import React from 'react';

import { colors } from 'src/core/styles/colors';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
};

export const WhiteLineIcon = ({
  height = 12,
  fillColor = colors.grayMedium,
}: Props) => {
  const originalWidth = 54;
  const originalHeight = 4;

  const aspectRatio = originalWidth / originalHeight;

  height /= 8;

  return (
    <SvgIcon
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
      style={{ transform: 'translateY(-3px)' }}
    >
      <path
        d="M2 0h50a2 2 0 1 1 0 4H2a2 2 0 1 1 0-4z"
        fill={colors.white}
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};
