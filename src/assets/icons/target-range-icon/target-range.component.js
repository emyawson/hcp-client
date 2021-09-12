import React from 'react';

import { colors } from 'src/core/styles/colors';
import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
};

export const TargetRangeIcon = ({
  height = 19,
  fillColor = colors.transparentGreen,
}: Props) => {
  const originalWidth = 19;
  const originalHeight = 19;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.targetRangeIcon')}
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path d="M0 15h15V0H0z" fill={fillColor} fillRule="evenodd" />
    </SvgIcon>
  );
};
