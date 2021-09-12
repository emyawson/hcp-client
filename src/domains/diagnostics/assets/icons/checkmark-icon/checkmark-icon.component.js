import React from 'react';

import { colors } from 'src/domains/diagnostics/styles';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  width?: number,
  fillColor?: string,
};

const originalWidth = 45;
const originalHeight = 35;
const aspectRatio = originalWidth / originalWidth;

export const CheckmarkIcon = ({
  fillColor = colors.white,
  height = originalHeight,
}: Props) => (
  <SvgIcon
    title="Checkmark"
    width={height * aspectRatio}
    height={height}
    originalWidth={originalWidth}
    originalHeight={originalHeight}
  >
    <path
      d="M43.054.014a1.72 1.72 0 0 0-1.027.53L13.18 29.855 2.855 20.938a1.711 1.711 0 0 0-1.709-.315 1.753 1.753 0 0 0-1.12 1.349c-.108.62.119 1.253.594 1.657l11.532 9.96a1.71 1.71 0 0 0 2.343-.11L44.478 3.015c.532-.527.673-1.34.35-2.021a1.724 1.724 0 0 0-1.774-.981z"
      fill={fillColor}
      fillRule="nonzero"
    />
  </SvgIcon>
);
