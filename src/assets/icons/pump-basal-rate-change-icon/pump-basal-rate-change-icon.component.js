import React from 'react';

import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const PumpBasalRateChangeIcon = ({ height, width }) => {
  const originalWidth = 17;
  const originalHeight = 17;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.pumpBasalRateChange')}
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g fill="none" fillRule="evenodd">
        <rect fill="#188CE1" x=".221" y=".775" width="17" height="17" rx="1" />
        <path
          d="M5.599 7.857a.59.59 0 0 0 .439-.194l2.179-2.398 2.187 2.399a.595.595 0 0 0 .878-.801L8.216 3.5 5.16 6.864a.593.593 0 0 0 .439.993M8.225 13.774l3.057-3.364a.595.595 0 0 0-.879-.799l-2.179 2.397L6.037 9.61a.595.595 0 0 0-.877.801l3.065 3.363z"
          fill="#FFF"
        />
      </g>
    </SvgIcon>
  );
};
