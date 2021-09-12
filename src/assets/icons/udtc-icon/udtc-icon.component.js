import React from 'react';

import { colors } from 'src/core/styles/colors';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
};

export const UDtcIcon = ({
  height = 39,
  fillColor = colors.grayMedium,
}: Props) => {
  const originalWidth = 26;
  const originalHeight = 26;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g fill={colors.grayMedium} strokeWidth="0">
        <path d="M13.875 19.125V9.351l4.27 4.27a.882.882 0 0 0 1.242 0 .871.871 0 0 0 0-1.234l-5.766-5.766a.871.871 0 0 0-1.234 0L6.612 12.38a.871.871 0 1 0 1.234 1.234l4.279-4.262v9.774c0 .481.394.875.875.875a.878.878 0 0 0 .875-.875z" />
        <path d="M13 26C5.82 26 0 20.18 0 13S5.82 0 13 0s13 5.82 13 13-5.82 13-13 13zm0-1.472c6.367 0 11.528-5.161 11.528-11.528 0-6.367-5.161-11.528-11.528-11.528C6.633 1.472 1.472 6.633 1.472 13c0 6.367 5.161 11.528 11.528 11.528z" />
      </g>
    </SvgIcon>
  );
};
