import React from 'react';

import { colors } from 'src/core/styles/colors';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
};

export const SpeechBubbleIcon = ({
  height = 22,
  fillColor = colors.grayMedium,
}: Props) => {
  const originalWidth = 22;
  const originalHeight = 22;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M18.016 3.46a10.252 10.252 0 0 0-3.696-1.982 10.958 10.958 0 0 0-2.554-.458C11.544 1 11.318 1 11.094 1c-.224 0-.4 0-.6.018-.556.029-1.11.089-1.658.18-1.163.21-2.283.617-3.31 1.202A9.06 9.06 0 0 0 2.15 5.58a7.356 7.356 0 0 0-.928 5.742A7.974 7.974 0 0 0 3.8 15.498a10.446 10.446 0 0 0 5.694 2.52.912.912 0 0 1 .856 1.02c0 .328-.074.654-.114.98a1.91 1.91 0 0 0-.04.742c.01.13.114.232.244.24h.044c.206-.027.407-.079.6-.156.853-.395 1.662-.88 2.414-1.444a39.966 39.966 0 0 0 4.718-3.91c.512-.47.975-.99 1.384-1.552a7.64 7.64 0 0 0 1.4-4.35c0-.692-.094-1.38-.282-2.046a8.262 8.262 0 0 0-2.702-4.082zm.586 9.8c-.362.496-.77.956-1.222 1.372a38.952 38.952 0 0 1-4.58 3.784c-.422.298-.84.588-1.266.842v-.182a2.112 2.112 0 0 0-1.898-2.246A9.2 9.2 0 0 1 4.6 14.6a6.746 6.746 0 0 1-2.212-3.56 6.134 6.134 0 0 1 .788-4.84 7.838 7.838 0 0 1 2.94-2.762A9.29 9.29 0 0 1 9.05 2.38a13.574 13.574 0 0 1 1.524-.164c.166-.016.34-.016.52-.016s.4 0 .6.018a9.8 9.8 0 0 1 2.274.4 9 9 0 0 1 3.27 1.75 7.046 7.046 0 0 1 2.326 3.506 6.3 6.3 0 0 1 .236 1.712 6.476 6.476 0 0 1-1.2 3.668l.002.006z"
        fill={fillColor}
        fillRule="nonzero"
        stroke={fillColor}
      />
    </SvgIcon>
  );
};
