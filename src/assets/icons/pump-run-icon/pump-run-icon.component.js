import React from 'react';

import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const PumpRunIcon = ({ height, width }) => {
  const originalWidth = 17;
  const originalHeight = 17;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.pumpRun')}
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g fill="none" fillRule="evenodd">
        <rect fill="#7ED321" x=".598" y=".326" width="16" height="16" rx="1" />
        <path fill="#FFF" d="M11.645 8.479l-5 3v-6z" />
      </g>
    </SvgIcon>
  );
};
