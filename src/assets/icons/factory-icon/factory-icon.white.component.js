import React from 'react';

import { colors } from 'src/core/styles/colors';
import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const FactoryWhiteIcon = ({
  height = 41,
  fillColor = colors.white,
  strokeColor = colors.black,
  strokeWidth = '2',
}: Props) => {
  const originalWidth = 31;
  const originalHeight = 29;

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
        d="M24.2 1V13.63l-3.988-5.886-3.745 5.886-3.988-5.886-3.746 5.886-3.987-5.886-3.716 6.062L1 27.364h29V1z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};
