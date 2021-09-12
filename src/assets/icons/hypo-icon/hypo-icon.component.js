import React from 'react';

import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const HypoIcon = ({ width = 8.5, height }) => {
  const originalWidth = 10;
  const originalHeight = 11;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.hypo')}
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M9.027.265c.17.177.257.41.257.703v8.876c0 .292-.09.528-.265.71a.914.914 0 0 1-.687.273c-.293 0-.525-.091-.696-.273-.171-.182-.257-.418-.257-.71V6.109H1.92v3.735c0 .292-.09.528-.265.71-.176.182-.411.273-.703.273a.915.915 0 0 1-.688-.273C.089 10.372 0 10.136 0 9.844V.968C0 .676.086.442.257.265.429.089.66 0 .953 0c.292 0 .527.089.703.265.176.177.265.41.265.703v3.568h5.458V.968c0-.292.086-.526.257-.703.17-.176.403-.265.696-.265.292 0 .524.089.695.265"
        fill="#DE1212"
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};
