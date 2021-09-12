import React from 'react';

import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const FastingIcon = ({ height, width }) => {
  const originalWidth = 12;
  const originalHeight = 15;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.fasting')}
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
        <g id="Icons/Graph/Meal/" transform="translate(-1.000000, 1.000000)">
          <g id="Group-8">
            <path
              d="M2.04043715,0.54 L2.04043715,12.42"
              id="Line-7"
              stroke="#6C6C6C"
              strokeWidth="1.62"
              strokeLinecap="round"
            />
            <rect
              id="Rectangle"
              fill="#7ED321"
              x="3.42043715"
              y="0"
              width="9.49023438"
              height="7"
            />
          </g>
        </g>
      </g>
    </SvgIcon>
  );
};
