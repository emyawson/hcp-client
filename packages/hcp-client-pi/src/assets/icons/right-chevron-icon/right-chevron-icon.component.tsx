import * as React from 'react';
import { withTheme } from 'styled-components';

import { RenderIf } from '@roche/patterns-indicators/utils/markup/render-if.utils';

import { SvgIcon } from '@roche/patterns-indicators/assets/icons/icon';

interface RightChevronIconProps {
  height?: number;
  strokeColor?: string;
  theme: any;
  withBorder?: boolean;
}

const RightChevronIconComponent = ({
  height = 30,
  strokeColor,
  theme,
  withBorder = false,
}: RightChevronIconProps) => {
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
        stroke={strokeColor ? strokeColor : theme.colors.darkBlueMarine}
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

export const RightChevronIcon = withTheme(RightChevronIconComponent);
