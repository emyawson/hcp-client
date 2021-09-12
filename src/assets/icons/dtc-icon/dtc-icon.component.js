import React from 'react';

import { colors } from 'src/core/styles/colors';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
};

export const DtcIcon = ({
  height = 39,
  fillColor = colors.grayMedium,
}: Props) => {
  const originalWidth = 38;
  const originalHeight = 39;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M19 .333c10.493 0 19 8.507 19 19s-8.507 19-19 19c-10.494 0-19-8.507-19-19s8.506-19 19-19m-1.02 27.793l-6.924-7.013c-1.118-1.12.56-2.8 1.676-1.68l4.667 4.682c.228.23.415.15.415-.178V11.023c0-.658.53-1.19 1.185-1.19.66 0 1.185.533 1.185 1.19v12.914c0 .328.186.408.416.178l4.668-4.68c1.118-1.12 2.794.558 1.676 1.678l-6.88 7.004c-.577.59-1.51.59-2.084.01M19 2.706c-9.182 0-16.625 7.444-16.625 16.626 0 9.182 7.443 16.625 16.625 16.625s16.625-7.443 16.625-16.625S28.182 2.708 19 2.708"
        fill={fillColor}
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};
