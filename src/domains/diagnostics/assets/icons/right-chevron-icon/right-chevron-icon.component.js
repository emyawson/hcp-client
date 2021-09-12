import React from 'react';

import { colors } from 'src/domains/diagnostics/styles';
import { RenderIf } from 'src/domains/diagnostics/utils/render-if';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
  withBorder?: boolean,
};

export const RightChevronIcon = ({
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
        transform="translate(-1318 -529)"
        stroke={strokeColor}
        fill="none"
        fillRule="evenodd"
      >
        <RenderIf validate={withBorder}>
          <rect
            x="1319.318"
            y="530.148"
            width={borderWidth}
            height={borderHeight}
            rx="3"
          />
        </RenderIf>
        <path
          strokeWidth="1.5"
          strokeLinecap="round"
          d="M1330.207 548.971l5.98-4.992-5.98-4.95"
        />
      </g>
    </SvgIcon>
  );
};
