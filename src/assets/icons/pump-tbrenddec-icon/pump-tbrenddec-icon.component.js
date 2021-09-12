import React from 'react';

import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const PumpTbrEndDecIcon = ({ height, width }) => {
  const originalWidth = 19;
  const originalHeight = 19;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.pumpTbrEndDec')}
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g fill="none" fillRule="evenodd">
        <rect fill="#188CE1" x="1.362" y="1.81" width="16" height="16" rx="1" />
        <path
          d="M12.505 7.12l-3.138 3.453L6.218 7.12a.858.858 0 0 0-1.208-.056.857.857 0 0 0-.056 1.21l4.415 4.842 4.4-4.844a.854.854 0 1 0-1.264-1.15z"
          fill="#FFF"
        />
        <path
          d="M18.348 17L11.04 9.694l7.075-7.074A1.165 1.165 0 0 0 16.47.972L9.395 8.047 2.518 1.171A1.165 1.165 0 0 0 .87 2.817l6.877 6.876-7.11 7.11a1.165 1.165 0 0 0 1.647 1.646l7.11-7.11 7.307 7.308a1.162 1.162 0 0 0 1.646 0 1.165 1.165 0 0 0 0-1.646"
          fill="#CF021B"
        />
      </g>
    </SvgIcon>
  );
};
