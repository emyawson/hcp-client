import React from 'react';

import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const PremenstrualIcon = ({ height, width }) => {
  const originalWidth = 8;
  const originalHeight = 16;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.premenstrual')}
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g
        id="_icons"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g
          id="NEW-ICONS"
          transform="translate(-1330.000000, -526.000000)"
          fill="#FF7E76"
        >
          <path
            d="M1337.59858,541.238095 C1333.40187,541.237365 1330,537.997039 1330,534 C1330,530.00251 1333.40264,526.761905 1337.6,526.761905 C1337.60471,526.761905 1337.60942,526.761909 1337.61413,526.761917 C1337.66899,530.46374 1337.59346,536.514077 1337.59858,541.238095 Z"
            id="Combined-Shape"
          />
        </g>
      </g>
    </SvgIcon>
  );
};
