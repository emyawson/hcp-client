import React from 'react';

import { SvgIcon } from 'src/assets/icons';
import { colors } from 'src/core/styles/colors';

type Props = {
  height?: number,
  width?: number,
  fillColor?: string,
};

const originalWidth = 9;
const originalHeight = 9;
const aspectRatio = originalWidth / originalWidth;

export const NoInformationIcon = ({
  fillColor = colors.trafficRed,
  height = originalHeight,
}: Props) => (
  <SvgIcon
    title="No information"
    width={height * aspectRatio}
    height={height}
    originalWidth={originalWidth}
    originalHeight={originalHeight}
  >
    <circle fill={colors.grayLight} cx="4.5" cy="4.5" r="4.5" />
    <path d="M2.5 4h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1z" fill={colors.white} />
  </SvgIcon>
);
