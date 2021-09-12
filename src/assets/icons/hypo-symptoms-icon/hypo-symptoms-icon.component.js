import React from 'react';

import { colors } from 'src/core/styles/colors';
import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const HypoSymptomsIcon = ({ width = 15.5, height = 15.5 }) => {
  const originalWidth = 18;
  const originalHeight = 18;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.hypoSymptoms')}
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g fillRule="evenodd">
        <path
          d="M10.844 4.992a.603.603 0 0 1 .168.447v4.49a.62.62 0 0 1-.168.451.596.596 0 0 1-.448.172.59.59 0 0 1-.444-.168.628.628 0 0 1-.164-.456V8.136h-2.6v1.792a.62.62 0 0 1-.168.452.587.587 0 0 1-.44.172.605.605 0 0 1-.448-.168.618.618 0 0 1-.168-.456V5.44c0-.186.056-.336.168-.447a.605.605 0 0 1 .448-.168.59.59 0 0 1 .444.168c.11.111.164.261.164.447v1.704h2.6V5.44c0-.186.055-.336.164-.447a.59.59 0 0 1 .444-.168c.187 0 .336.056.448.168"
          fill="#DE1212"
        />
        <path
          d="M2.424 7.69a6.011 6.011 0 0 1 6.005-6.005 6.011 6.011 0 0 1 6.005 6.005 6.011 6.011 0 0 1-6.005 6.005A6.011 6.011 0 0 1 2.424 7.69m14.62 8.291l-3.156-3.157a7.47 7.47 0 0 0 2.046-5.134c0-4.139-3.367-7.505-7.505-7.505S.924 3.551.924 7.69c0 4.14 3.367 7.505 7.505 7.505a7.46 7.46 0 0 0 4.326-1.383l3.23 3.23a.747.747 0 0 0 1.06 0 .75.75 0 0 0 0-1.06"
          fill={colors.grayMedium}
        />
      </g>
    </SvgIcon>
  );
};
