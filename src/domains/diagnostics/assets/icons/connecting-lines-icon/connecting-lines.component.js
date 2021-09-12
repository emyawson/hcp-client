import React from 'react';

import { colors } from 'src/domains/diagnostics/styles';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
};

export const ConnectingLinesIcon = ({
  height = 12,
  fillColor = colors.black,
  minX = 0,
  minY = -7,
}: Props) => {
  const originalWidth = 12;
  const originalHeight = 12;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      title="Connecting Lines"
      width={height * aspectRatio}
      height={height}
      minX={minX}
      minY={minY}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path d="M.66 2h15.59V.5H.66z" fill={fillColor} fillRule="evenodd" />
    </SvgIcon>
  );
};
