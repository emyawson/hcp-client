import React from 'react';

import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const MealIcon = ({ height, width }) => {
  const originalWidth = 30;
  const originalHeight = 20;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.meal')}
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
          transform="translate(-764.000000, -526.000000)"
          fill-rule="nonzero"
        >
          <g id="Group-10" transform="translate(764.000000, 527.000000)">
            <g id="Group-7" transform="translate(6.000000, 0.000000)">
              <circle
                id="Oval"
                stroke="#4E4E4E"
                strokeWidth="0.15"
                fill="#EFEFEF"
                cx="9.15322581"
                cy="9"
                r="9"
              />
              <circle id="Oval" fill="#E0E0E0" cx="9.0625" cy="9" r="4.5" />
            </g>
            <path
              d="M27.9266462,1.12590799 C27.2649096,1.15287441 26.75,1.79976215 26.75,2.55929601 L26.75,17 L28.2389475,17 L28.2389475,10.4877924 C28.7654515,10.4877924 29.1923077,9.99816797 29.1923077,9.39424264 L29.1923077,2.52571055 C29.1923077,1.73516531 28.6213495,1.09759324 27.9266462,1.12590799 Z"
              id="Shape"
              fill="#F9C734"
            />
            <path
              d="M3.53168666,17 L3.53168666,6.98572267 C4.00420602,6.94894437 4.375,6.5972204 4.375,6.16816124 L4.375,1.125 L3.88836394,1.125 L3.88836394,4.80245202 C3.88836394,5.03023816 3.68037313,5.21488537 3.42378966,5.21488537 L3.28964552,5.21488537 C3.03306204,5.21488537 2.82507124,5.03023816 2.82507124,4.80245202 L2.82507124,1.125 L2.26146723,1.125 L2.26146723,4.80245202 C2.26146723,5.03023816 2.05347642,5.21488537 1.79689294,5.21488537 L1.66274881,5.21488537 C1.40616533,5.21488537 1.19817452,5.03023816 1.19817452,4.80245202 L1.19817452,1.125 L0.711538462,1.125 L0.711538462,6.16816124 C0.711538462,6.5972204 1.08233244,6.94894437 1.5548518,6.98572267 L1.5548518,16.999937 L3.53168666,17 Z"
              id="Shape"
              fill="#F9C734"
            />
          </g>
        </g>
      </g>
    </SvgIcon>
  );
};
