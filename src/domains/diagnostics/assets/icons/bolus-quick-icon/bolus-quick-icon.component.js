import React from 'react';

import { translate } from 'src/i18n'; // TODO: move to diagnostics

import { SvgIcon } from '../icon';

export const BolusQuickIcon = ({ height = 13, width = 14 }) => {
  const originalWidth = 14;
  const originalHeight = 13;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.bolusQuick')}
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M6.658 10.578V9.527h2.634a.78.78 0 1 0 0-1.558H6.658V6.632h2.634a.78.78 0 0 0 0-1.56H6.658V3.737h2.634a.78.78 0 1 0 0-1.558H6.658v-1.01a.78.78 0 0 0-1.56 0v9.41H1.067a.78.78 0 1 0 0 1.559h11.55a.78.78 0 1 0 0-1.56h-5.96z"
        fill="#CF021B"
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};
