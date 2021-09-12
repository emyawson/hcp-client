import React from 'react';

import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const PumpPowerUpIcon = ({ height, width }) => {
  const originalWidth = 19;
  const originalHeight = 19;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.pumpPowerUp')}
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g fill="#4FA952" fillRule="evenodd">
        <path d="M9.768 4.742c-.69 0-1.25.56-1.25 1.25v7.015a1.25 1.25 0 0 0 2.5 0V5.992c0-.69-.56-1.25-1.25-1.25" />
        <path d="M9.768 16.253a6.758 6.758 0 0 1-6.75-6.75 6.758 6.758 0 0 1 6.75-6.75 6.758 6.758 0 0 1 6.75 6.75 6.758 6.758 0 0 1-6.75 6.75m0-16c-5.101 0-9.25 4.149-9.25 9.25 0 5.1 4.149 9.25 9.25 9.25 5.1 0 9.25-4.15 9.25-9.25 0-5.101-4.15-9.25-9.25-9.25" />
      </g>
    </SvgIcon>
  );
};
