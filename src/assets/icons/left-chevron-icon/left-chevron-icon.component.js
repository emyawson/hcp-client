import React from 'react';

import { colors } from 'src/core/styles/colors';
import { RenderIf } from 'src/utils/render-if';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  strokeColor?: string,
  withBorder?: boolean,
};

export const LeftChevronIcon = ({
  height = 30,
  strokeColor = colors.darkBlueMarine,
  withBorder = false,
}: Props) => {
  const originalIconWidth = 30;
  const originalIconHeight = 30;
  const originalBorderWidth = 27.486;
  const originalBorderHeight = 27.703;

  const iconAspectRatio = originalIconWidth / originalIconHeight;
  const borderHeightAspectRatio = originalBorderWidth / originalIconWidth;
  const borderWidthAspectRatio = originalBorderHeight / originalIconHeight;

  const iconWidth = height * iconAspectRatio;
  const iconHeight = height;
  const borderHeight = height * borderHeightAspectRatio;
  const borderWidth = iconWidth * borderWidthAspectRatio;

  return (
    <SvgIcon
      width={iconWidth}
      height={iconHeight}
      originalWidth={originalIconWidth}
      originalHeight={originalIconHeight}
    >
      <g
        transform="translate(-200 -529)"
        stroke={strokeColor}
        fill="none"
        fillRule="evenodd"
      >
        <RenderIf validate={withBorder}>
          <rect
            transform="matrix(-1 0 0 1 430.03 0)"
            x="201.272"
            y="530.148"
            width={borderWidth}
            height={borderHeight}
            rx="3"
          />
        </RenderIf>
        <path
          strokeWidth="1.5"
          strokeLinecap="round"
          d="M217.441 548.971l-5.98-4.992 5.98-4.95"
        />
      </g>
    </SvgIcon>
  );
};
