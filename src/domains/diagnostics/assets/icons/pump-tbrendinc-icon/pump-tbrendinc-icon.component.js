import React from 'react';

import { translate } from 'src/i18n'; // TODO: move to diagnostics

import { SvgIcon } from '../icon';

export const PumpTbrEndIncIcon = ({ height, width }) => {
  const originalWidth = 19;
  const originalHeight = 19;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.pumpTbrEndInc')}
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g fill="none" fillRule="evenodd">
        <rect
          fill="#188CE1"
          x="1.868"
          y="1.81"
          width="15.501"
          height="15.501"
          rx="1"
        />
        <path
          d="M5.96 11.944c.226 0 .45-.09.612-.27l3.04-3.346 3.051 3.347a.831.831 0 0 0 1.17.054.83.83 0 0 0 .055-1.171L9.611 5.866l-4.263 4.693a.828.828 0 0 0 .612 1.385"
          fill="#FFF"
        />
        <path
          d="M18.617 17l-7.308-7.307 7.075-7.074A1.165 1.165 0 0 0 16.738.972L9.663 8.047 2.786 1.171A1.165 1.165 0 0 0 1.14 2.817l6.877 6.876-7.11 7.11a1.165 1.165 0 0 0 1.647 1.646l7.11-7.11 7.306 7.308a1.162 1.162 0 0 0 1.647 0 1.165 1.165 0 0 0 0-1.646"
          fill="#CF021B"
        />
      </g>
    </SvgIcon>
  );
};
