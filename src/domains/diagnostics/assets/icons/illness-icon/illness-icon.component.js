import React from 'react';

import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const IllnessIcon = ({ height, width }) => {
  const originalWidth = 9;
  const originalHeight = 19;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.illness')}
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
        <g id="Icons/Graph/Meal/">
          <g id="Page-1">
            <path
              d="M5.02266977,12.0179302 L5.02266977,5.43286047 L3.97615814,5.43286047 L3.97615814,12.0179302 C3.04727442,12.2521395 2.35678605,13.0926977 2.35678605,14.0929535 C2.35678605,15.2753023 3.31769302,16.2366279 4.49941395,16.2366279 C5.68092558,16.2366279 6.64246047,15.2753023 6.64246047,14.0929535 C6.64246047,13.0922791 5.95155349,12.2521395 5.02266977,12.0179302"
              id="Fill-1"
              fill="#FB3400"
            />
            <g id="Group-5" transform="translate(0.000000, 0.174767)">
              <mask id="mask-2" fill="white">
                <use xlinkHref="#path-1" />
              </mask>
              <g id="Clip-4" />
              <path
                d="M4.49941395,16.0619023 C3.31769302,16.0619023 2.35678605,15.1003674 2.35678605,13.9182279 C2.35678605,12.9179721 3.04727442,12.077414 3.97615814,11.8432047 L3.97615814,5.25813488 L5.02266977,5.25813488 L5.02266977,11.8432047 C5.95155349,12.077414 6.64246047,12.9175535 6.64246047,13.9182279 C6.64246047,15.1003674 5.68092558,16.0619023 4.49941395,16.0619023 M7.07425116,10.2319953 L7.07425116,2.60836744 C7.07425116,1.18908837 5.91911163,0.0345767442 4.49941395,0.0345767442 C3.07971628,0.0345767442 1.92457674,1.18908837 1.92457674,2.60836744 L1.92457674,10.2319953 C0.714181395,11.0742279 4.18604651e-05,12.4309256 4.18604651e-05,13.9182279 C4.18604651e-05,16.399507 2.01855349,18.4186465 4.49983256,18.4186465 C6.98048372,18.4186465 8.99878605,16.399507 8.99878605,13.9182279 C8.99878605,12.4313442 8.28464651,11.0742279 7.07425116,10.2319953"
                id="Fill-3"
                fill="#9BD6F1"
                mask="url(#mask-2)"
              />
            </g>
          </g>
        </g>
      </g>
    </SvgIcon>
  );
};
