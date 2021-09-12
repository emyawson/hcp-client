import React from 'react';

import { translate } from 'src/i18n'; // TODO: move to diagnostics

import { SvgIcon } from '../icon';

export const PumpTbrdecIcon = ({ height, width }) => {
  const originalWidth = 17;
  const originalHeight = 17;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.pumpTbrDec')}
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g fill="none" fillRule="evenodd">
        <rect fill="#188CE1" x=".688" y=".775" width="16" height="16" rx="1" />
        <path
          d="M5.083 6.161a.75.75 0 0 1 .555.245l3.054 3.352 3.045-3.35a.75.75 0 1 1 1.11 1.007l-4.153 4.571-4.166-4.57a.75.75 0 0 1 .555-1.255"
          fill="#FFF"
        />
      </g>
    </SvgIcon>
  );
};
