import React from 'react';

import { colors } from 'src/core/styles/colors';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
};

export const MaximizeIcon = ({
  height = 19,
  fillColor = colors.grayMedium,
}: Props) => {
  const originalWidth = 19;
  const originalHeight = 19;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      title="Maximize Icon"
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M11.213 6.84L14 4.052c.3-.299.547-.201.548.225l.002 2.555c.001 1.367 2.053 1.369 2.052.002L16.575.956a.917.917 0 0 0-.908-.907L9.768 0C8.4-.001 8.401 2.05 9.769 2.051l2.554.002c.429 0 .528.245.225.548L5.404 9.744l-.015.017-2.788 2.787c-.299.3-.547.202-.547-.224l-.002-2.555C2.05 8.402-.001 8.4 0 9.767l.026 5.877a.916.916 0 0 0 .908.908l5.9.049c1.367.001 1.365-2.05-.002-2.052l-2.555-.001c-.427-.001-.526-.246-.224-.548l7.143-7.144.017-.016"
        fill={fillColor}
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};
