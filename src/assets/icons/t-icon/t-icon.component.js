import React from 'react';

import { colors } from 'src/core/styles/colors';

import { SvgIcon } from '../icon';

type Props = {
  fillColor?: string,
  height?: number,
};

export const TIcon = ({ fillColor = colors.black, height = 8 }: Props) => {
  const originalWidth = 8;
  const originalHeight = 8;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      title="T Icon"
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        fill="#4A4A4A"
        d="M.18.502v1h3v6.5h1v-6.5h3v-1z"
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};
