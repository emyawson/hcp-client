import React from 'react';

import { colors } from 'src/core/styles/colors';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
};

export const PatientDashboardIcon = ({ height = 27 }: Props) => {
  const originalWidth = 27;
  const originalHeight = 27;
  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g
        stroke={colors.grayMedium}
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      >
        <rect x="1" y="1" width="9" height="9" rx="2" />
        <rect x="1" y="13" width="9" height="9" rx="2" />
        <rect x="13" y="1" width="9" height="9" rx="2" />
        <rect x="13" y="13" width="9" height="9" rx="2" />
      </g>
    </SvgIcon>
  );
};
