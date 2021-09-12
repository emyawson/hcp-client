import React from 'react';

import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const BolusStandardIcon = ({ height = 13, width = 14 }) => {
  const originalWidth = 15;
  const originalHeight = 13;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.bolusStandard')}
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M13.275 10.49H8.28v-9.4a.78.78 0 1 0-1.559 0v9.4H1.725a.78.78 0 1 0 0 1.56h11.55a.78.78 0 1 0 0-1.56"
        fill="#CF021B"
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};
