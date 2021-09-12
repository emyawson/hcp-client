import React from 'react';

import { colors } from 'src/core/styles/colors';

import { SvgIcon } from '../icon';

export const CreatePatientIcon = ({
  height = 27,
  fillColor = colors.grayMedium,
}) => {
  const originalWidth = 38;
  const originalHeight = 28;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="Landing---Before-search"
          transform="translate(-636.000000, -933.000000)"
        >
          <g id="Add-patient" transform="translate(636.000000, 934.000000)">
            <g>
              <circle
                stroke="#0066CC"
                strokeWidth="1.35"
                cx="13.2401628"
                cy="6.11338178"
                r="5.51952765"
              />
              <path
                d="M2.34366278,22.1180429 C2.34366278,18.6280429 5.18366278,15.7880429 8.67366278,15.7880429 L17.8066628,15.7880429 C21.2966628,15.7880429 24.1356628,18.6280429 24.1356628,22.1180429 L24.1356628,26.7720429 L25.4866628,26.7720429 L25.4866628,22.1180429 C25.4866628,17.8770429 22.0486628,14.4380429 17.8066628,14.4380429 L8.67366278,14.4380429 C4.43166278,14.4380429 0.993662777,17.8770429 0.993662777,22.1180429 L0.993662777,26.7720429 L2.34366278,26.7720429 L2.34366278,22.1180429 Z"
                fill="#0066CC"
              />
              <path
                d="M27.2558856,8.19963329 L37.2558856,8.19963329"
                stroke="#0066CC"
                strokeWidth="1.35"
                strokeLinecap="round"
              />
              <path
                d="M32.2558856,3.19963329 L32.2558856,13.1996333"
                stroke="#0066CC"
                strokeWidth="1.35"
                strokeLinecap="round"
              />
            </g>
          </g>
        </g>
      </g>
    </SvgIcon>
  );
};
