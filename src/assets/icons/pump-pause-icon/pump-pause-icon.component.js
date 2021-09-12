import React from 'react';

import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const PumpPauseIcon = ({ height, width }) => {
  const originalWidth = 17;
  const originalHeight = 17;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.pumpPause')}
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g fill="none" fillRule="evenodd">
        <rect fill="#188CE1" x=".057" y=".286" width="16" height="16" rx="1" />
        <path fill="#FFF" d="M5.025 4.786h2v7h-2zM9.433 4.786h2v7h-2z" />
      </g>
    </SvgIcon>
  );
};
