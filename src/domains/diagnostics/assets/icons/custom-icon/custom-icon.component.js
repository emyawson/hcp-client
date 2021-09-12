import React from 'react';

import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const CustomIcon = ({ height, width }) => {
  const originalWidth = 15;
  const originalHeight = 14;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.custom')}
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g id="Icons/Graph/Meal/" transform="translate(0.000000, 1.000000)">
          <g id="Group-7">
            <path
              d="M0.760978156,6.19033151 L12.7609782,6.19033151"
              id="Line-4-Copy-3"
              stroke="#4A4A4A"
              strokeWidth="1.15"
              strokeLinecap="round"
            />
            <path
              d="M0.760978156,10.572517 L12.7609782,10.572517"
              id="Line-4-Copy-4"
              stroke="#4A4A4A"
              strokeWidth="1.15"
              strokeLinecap="round"
            />
            <circle
              id="Oval-3-Copy-3"
              stroke="#5D8FDF"
              fill="#F7F7F7"
              transform="translate(12.800978, 6.022332) rotate(-90.000000) translate(-12.800978, -6.022332) "
              cx="12.8009782"
              cy="6.02233151"
              r="1.54"
            />
            <path
              d="M0.760978156,1.71485094 L12.7609782,1.71485094"
              id="Line-4-Copy-7"
              stroke="#4A4A4A"
              strokeWidth="1.15"
              strokeLinecap="round"
            />
            <circle
              id="Oval-3-Copy-4"
              stroke="#5D8FDF"
              fill="#F7F7F7"
              transform="translate(3.196447, 1.714851) rotate(-90.000000) translate(-3.196447, -1.714851) "
              cx="3.19644691"
              cy="1.71485094"
              r="1.54"
            />
            <circle
              id="Oval-3-Copy-5"
              stroke="#5D8FDF"
              fill="#F7F7F7"
              transform="translate(6.520978, 10.572517) rotate(-90.000000) translate(-6.520978, -10.572517) "
              cx="6.52097816"
              cy="10.572517"
              r="1.54"
            />
          </g>
        </g>
      </g>
    </SvgIcon>
  );
};
