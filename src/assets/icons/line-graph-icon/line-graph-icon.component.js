import React from 'react';

import { colors } from 'src/core/styles/colors';
import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
};

export const LineGraphIcon = ({
  height = 30,
  fillColor = colors.grayDark,
}: Props) => {
  const originalWidth = 42;
  const originalHeight = 30;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.lineGraph')}
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M37.85 6c-1.186 0-2.15-.964-2.15-2.15 0-1.185.964-2.15 2.15-2.15S40 2.665 40 3.85C40 5.036 39.036 6 37.85 6m-9 16c-1.186 0-2.15-.964-2.15-2.15 0-1.185.964-2.15 2.15-2.15s2.15.965 2.15 2.15c0 1.186-.964 2.15-2.15 2.15m-16-9c-1.186 0-2.15-.964-2.15-2.15 0-1.185.964-2.15 2.15-2.15S15 9.665 15 10.85c0 1.186-.964 2.15-2.15 2.15m-9 15c-1.186 0-2.15-.964-2.15-2.15 0-1.185.964-2.15 2.15-2.15S6 24.665 6 25.85C6 27.036 5.036 28 3.85 28m34-28C35.727 0 34 1.727 34 3.85c0 1.06.43 2.022 1.127 2.72l-5.12 9.627c-.367-.117-.75-.197-1.157-.197-1.164 0-2.196.53-2.903 1.35l-9.294-6.037c.02-.153.047-.304.047-.463C16.7 8.727 14.973 7 12.85 7S9 8.727 9 10.85c0 .83.27 1.596.72 2.226l-5.192 8.992c-.22-.04-.446-.068-.678-.068C1.727 22 0 23.727 0 25.85s1.727 3.85 3.85 3.85 3.85-1.727 3.85-3.85c0-1.17-.536-2.208-1.363-2.915l4.95-8.574c.48.215 1.005.34 1.563.34 1.236 0 2.326-.596 3.03-1.503l9.19 5.967c-.04.223-.07.45-.07.686 0 2.123 1.727 3.85 3.85 3.85s3.85-1.727 3.85-3.85c0-.99-.387-1.887-1.004-2.57l5.17-9.723c.316.084.642.143.984.143 2.123 0 3.85-1.727 3.85-3.85S39.973 0 37.85 0"
        fill={fillColor}
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};
