import React from 'react';

import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const StressIcon = ({ height, width }) => {
  const originalWidth = 8;
  const originalHeight = 13;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.stress')}
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
        <g id="Icons/Graph/Meal/" fill="#F5A623" fill-rule="nonzero">
          <path
            d="M2.93420343,6.56894977e-08 C2.82430672,0.0100212942 2.72321411,0.0865369401 2.68400686,0.189370571 L0.311772734,6.54482948 C0.242792021,6.72346532 0.397756436,6.94746154 0.589768921,6.94666445 L2.0955816,6.94666445 L0.0152434685,12.6093044 C-0.0290686788,12.7359003 0.0263232845,12.8897538 0.141276561,12.9593671 C0.256229837,13.0289804 0.418725948,13.007075 0.511003335,12.909526 L7.92423498,4.92825199 C8.00062566,4.84426992 8.02179978,4.71456949 7.97606459,4.61077421 C7.93032939,4.50697907 7.82019146,4.43477751 7.7064713,4.43404116 L5.16743946,4.43404116 L6.65008579,0.397216247 C6.71529865,0.219545373 6.56187308,0.000322361357 6.3720896,6.56894977e-08 C5.22690974,-8.21118722e-08 4.07734361,6.56894977e-08 2.93420343,6.56894977e-08 Z"
            id="Shape"
          />
        </g>
      </g>
    </SvgIcon>
  );
};
