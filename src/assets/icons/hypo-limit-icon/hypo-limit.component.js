import React from 'react';

import { colors } from 'src/core/styles/colors';
import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
};

export const HypoLimitIcon = ({
  height = 12,
  fillColor = colors.red,
  minX = 0,
  minY = -7,
}: Props) => {
  const originalWidth = 12;
  const originalHeight = 12;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.hypoLimit')}
      width={height * aspectRatio}
      height={height}
      minX={minX}
      minY={minY}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path d="M0 1.5h15.591V0H0z" fill={fillColor} fillRule="evenodd" />
    </SvgIcon>
  );
};
