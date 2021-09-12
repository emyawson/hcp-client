import React from 'react';

import { colors } from 'src/core/styles/colors';

import { SvgIcon } from '../icon';

type Props = {
  height: number,
  fillColor?: string,
};

export const MenuIcon = ({
  fillColor = colors.charcoal,
  height = 11,
}: Props) => {
  const originalWidth = 15;
  const originalHeight = 11;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      height={height}
      originalHeight={originalHeight}
      originalWidth={originalWidth}
      width={height * aspectRatio}
    >
      <path fill={fillColor} d="M.5 0h3v3h-3z" />
      <path
        className="horizontalLines"
        d="M6.19 1.494h8M6.19 5.43h8M6.19 9.368h8"
        stroke={fillColor}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <circle fill={fillColor} cx="2" cy="5.554" r="1.5" />
      <path fill={fillColor} d="M2 7.999l2 3H0z" />
    </SvgIcon>
  );
};
