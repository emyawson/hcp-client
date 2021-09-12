import React from 'react';

import { translate } from 'src/i18n'; // TODO: move to diagnostics

import { SvgIcon } from '../icon';

export const PumpStopIcon = ({ height, width }) => {
  const originalWidth = 17;
  const originalHeight = 17;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.pumpStop')}
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <rect
        fill="#F56E23"
        x=".908"
        y=".826"
        width="16"
        height="16"
        rx="1"
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};
