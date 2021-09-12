import React from 'react';

import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const PumpTbrincIcon = ({ height, width }) => {
  const originalWidth = 17;
  const originalHeight = 17;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.pumpTbrInc')}
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g fill="none" fillRule="evenodd">
        <rect fill="#188CE1" x=".911" y=".775" width="16" height="16" rx="1" />
        <path
          d="M12.516 11.176a.75.75 0 0 1-.555-.245L8.907 7.579l-3.045 3.35a.75.75 0 1 1-1.11-1.007L8.905 5.35l4.166 4.57a.75.75 0 0 1-.555 1.255"
          fill="#FFF"
        />
      </g>
    </SvgIcon>
  );
};
