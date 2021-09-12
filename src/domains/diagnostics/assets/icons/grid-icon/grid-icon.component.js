import React from 'react';

import { colors } from 'src/domains/diagnostics/styles';

import { SvgIcon } from '../icon';

export const GridIcon = ({ fillColor = colors.black, height = 16 }) => {
  const originalWidth = 20;
  const originalHeight = 25;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M19 5V4h-4V0h-1v4h-4V0H9v4H5V0H4v4H0v1h4v4H0v1h4v4H0v1h4v4h1v-4h4v4h1v-4h4v4h1v-4h4v-1h-4v-4h4V9h-4V5h4zM5 5h4v4H5V5zm0 9v-4h4v4H5zm9 0h-4v-4h4v4zm0-5h-4V5h4v4z"
        fill={fillColor}
      />
    </SvgIcon>
  );
};
