import React from 'react';

import { translate } from 'src/i18n'; // TODO: move to diagnostics

import { SvgIcon } from '../icon';

export const BolusExtendedIcon = ({ height = 10, width = 14 }) => {
  const originalWidth = 14;
  const originalHeight = 10;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.bolusExtended')}
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g fill="none" fillRule="evenodd">
        <path fill="#FF9CA8" d="M3.038 7.536h8.401V.221h-8.4z" />
        <path
          d="M13.014 7.537H1.464a.78.78 0 1 0 0 1.559h11.55a.78.78 0 1 0 0-1.56"
          fill="#CF021B"
        />
      </g>
    </SvgIcon>
  );
};
