import React from 'react';

import { colors } from 'src/core/styles/colors';
import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const FactoryIcon = ({
  height = 41,
  fillColor = colors.grayMedium,
  strokeColor = colors.grayMedium,
  strokeWidth = '2',
}: Props) => {
  const originalWidth = 46;
  const originalHeight = 41;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      title={translate('iconTitles.factory')}
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M36.808.097v19.297l-6.183-8.992-5.808 8.993-6.182-8.993-5.808 8.993-6.183-8.993-5.761 9.262-.047 20.714H45.8V.098z"
        fill={fillColor}
        fillRule="evenodd"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </SvgIcon>
  );
};
