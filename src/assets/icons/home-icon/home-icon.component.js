import React from 'react';

import { colors } from 'src/core/styles/colors';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
};

export const HomeIcon = ({
  height = 18,
  fillColor = colors.grayMedium,
}: Props) => {
  const originalWidth = 21;
  const originalHeight = 18;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M20.167 15.75c0-.41-.324-.75-.714-.75H.88c-.39 0-.713.34-.713.75v1.5c0 .41.324.75.714.75h18.573c.39 0 .714-.34.714-.75v-1.5zM16.167 10.75c0-.41-.33-.75-.727-.75H.894c-.397 0-.727.34-.727.75v1.5c0 .41.33.75.727.75H15.44c.397 0 .727-.34.727-.75v-1.5zM19.167 5.75c0-.41-.33-.75-.73-.75H.896c-.4 0-.73.34-.73.75v1.5c0 .41.33.75.73.75h17.54c.4 0 .73-.34.73-.75v-1.5zM14.167.75c0-.41-.317-.75-.7-.75H.867c-.383 0-.7.34-.7.75v1.5c0 .41.317.75.7.75h12.6c.383 0 .7-.34.7-.75V.75z"
        fill={fillColor}
      />
    </SvgIcon>
  );
};
