import React from 'react';

import { colors } from 'src/core/styles/colors';
import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const CEIcon = ({
  height = 46,
  fillColor = colors.grayMedium,
}: Props) => {
  const originalWidth = 65;
  const originalHeight = 46;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      title={translate('iconTitles.ce')}
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M25.694 38.916v6.701a22.71 22.71 0 0 1-2.237.113C10.997 45.73.836 35.57.836 23.116.836 10.663 10.996.503 23.457.503c.756 0 1.505.04 2.237.113v6.701a15.76 15.76 0 0 0-2.237-.16c-8.792 0-15.968 7.175-15.968 15.96 0 8.792 7.176 15.96 15.968 15.96.756 0 1.505-.056 2.237-.161m21.044-19.251h13.065v6.91H46.738c1.585 7.136 7.972 12.502 15.583 12.502.756 0 1.512-.056 2.244-.161v6.701c-.74.073-1.488.113-2.244.113-12.461 0-22.614-10.16-22.614-22.614C39.707 10.663 49.86.503 62.321.503c.756 0 1.504.04 2.244.113v6.701c-.74-.105-1.488-.16-2.244-.16-7.61 0-13.998 5.365-15.583 12.508"
        fill={fillColor}
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};
