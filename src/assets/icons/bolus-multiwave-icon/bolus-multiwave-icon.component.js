import React from 'react';

import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const BolusMultiwaveIcon = ({ height = 13, width = 14 }) => {
  const originalWidth = 14;
  const originalHeight = 13;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.bolusMultiwave')}
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g fill="none" fillRule="evenodd">
        <path fill="#FF9CA8" d="M4.386 10.838h6.804V3.523H4.386z" />
        <path
          d="M12.501 10.839H4.386V1.424a.779.779 0 1 0-1.56 0v9.415H.951a.78.78 0 1 0 0 1.559h11.55a.78.78 0 1 0 0-1.56"
          fill="#CF021B"
        />
      </g>
    </SvgIcon>
  );
};
