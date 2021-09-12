import React from 'react';

import { colors } from 'src/core/styles/colors';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
};

export const PlusIcon = ({
  height = 12,
  fillColor = colors.grayMedium,
}: Props) => {
  const originalWidth = 12;
  const originalHeight = 12;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M11.066 5.09c.262 0 .483.086.664.258.18.172.27.39.27.652s-.09.48-.27.652a.925.925 0 0 1-.664.258H6.91v4.156a.925.925 0 0 1-.258.664A.863.863 0 0 1 6 12a.863.863 0 0 1-.652-.27.925.925 0 0 1-.258-.664V6.91H.934a.903.903 0 0 1-.664-.27A.874.874 0 0 1 0 6c0-.262.09-.48.27-.652a.925.925 0 0 1 .664-.258H5.09V.934c0-.262.086-.483.258-.664C5.52.09 5.738 0 6 0s.48.09.652.27c.172.18.258.402.258.664V5.09h4.156z"
        fill={fillColor}
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};
