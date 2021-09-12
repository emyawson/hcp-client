import React from 'react';

import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const PumpProfileChangeIcon = ({ height, width }) => {
  const originalWidth = 16;
  const originalHeight = 17;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.pumpBasalRateProfileChange')}
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g fill="none" fillRule="evenodd">
        <rect fill="#188CE1" y=".775" width="16" height="16" rx="1" />
        <path
          d="M9.889 9.575H3.445a.8.8 0 1 1 0-1.6h6.452L7.42 5.725a.75.75 0 1 1 1.008-1.11L13 8.77l-4.57 4.166a.75.75 0 0 1-1.01-1.11l2.469-2.25z"
          fill="#FFF"
        />
      </g>
    </SvgIcon>
  );
};
