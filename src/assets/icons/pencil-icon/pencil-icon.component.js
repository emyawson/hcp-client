import React from 'react';

import { colors } from 'src/core/styles/colors';

import { SvgIcon } from '../icon';

type Props = {
  width?: number,
  height?: number,
  fillColor?: string,
};

export const PencilIcon = ({
  fillColor = colors.grayDark,
  height = 20,
}: Props) => {
  const originalWidth = 20;
  const originalHeight = 20;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M5.314 17.871l-.06.03-3.557.658-.12-.03-.03-.12.539-2.929 1.674 1.644c.09.09.209.15.328.15.12 0 .24-.06.33-.15a.47.47 0 0 0 0-.658l-1.794-1.793c-.03-.03-.09-.09-.15-.09L12.726 4.331l3.08 3.079L5.313 17.87zm-3.736-3.736c-.15.15-.27.359-.3.568L.622 18.23c-.06.358.06.687.3.956.208.21.477.299.746.299l.18-.03 3.527-.657c.209-.03.418-.15.568-.299L17.09 7.35l-4.364-4.364-11.148 11.15zM17.539 5.617l-3.049-3.05 1.016-1.015 3.079 3.078-1.046.987zM16.134.834a.867.867 0 0 0-1.255 0l-1.704 1.734 4.364 4.364 1.703-1.704a.867.867 0 0 0 0-1.255L16.134.834z"
        fill={fillColor}
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};
