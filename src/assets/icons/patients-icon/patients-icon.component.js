import React from 'react';

import { colors } from 'src/core/styles/colors';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
};

export const PatientsIcon = ({
  height = 27,
  fillColor = colors.grayMedium,
}: Props) => {
  const originalWidth = 22;
  const originalHeight = 27;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M15.39 6.604c.003 2.268-1.873 4.117-4.18 4.123-2.312-.003-4.193-1.85-4.194-4.12v-.32c.17-2.118 1.98-3.79 4.178-3.792h.002c2.31 0 4.19 1.843 4.193 4.11M11.21.332h-.003c-1.702 0-3.302.654-4.505 1.838-1.206 1.187-1.87 2.765-1.87 4.442 0 3.46 2.862 6.277 6.377 6.277 3.51-.007 6.37-2.824 6.375-6.282-.002-3.46-2.862-6.275-6.375-6.275M11.284 14.333C5.527 14.34.84 18.858.833 24.403v.69c0 .59.49 1.067 1.09 1.067.603 0 1.093-.478 1.093-1.067v-.69c0-4.375 3.708-7.935 8.267-7.935 4.558 0 8.266 3.56 8.266 7.936v.69c0 .588.49 1.066 1.092 1.066.602 0 1.092-.478 1.092-1.067v-.69c-.008-5.545-4.696-10.063-10.45-10.07"
        fill={fillColor}
      />
    </SvgIcon>
  );
};
