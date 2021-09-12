import React from 'react';

import { SvgIcon } from '../icon';

export const BasalPlusBolusIcon = ({ height = 11, width = 37 }) => {
  const originalWidth = 44;
  const originalHeight = 16;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title="Basal Plus Bolus"
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g fill="none" fillRule="evenodd">
        <path
          d="M36.375 13.286V2.004a.935.935 0 1 0-1.87 0v11.282H28.51a.935.935 0 1 0 0 1.87h13.86a.936.936 0 1 0 0-1.87h-5.995z"
          fill="#CF021B"
        />
        <path
          d="M16.059 13.816V6.874h-2.612a1 1 0 0 1-1-1V2.128H5.9v6.357a1 1 0 0 1-1 1H2v4.302l14.059.03zm1-8.942a1 1 0 0 1 1 1v8.944a1 1 0 0 1-1.002 1l-16.06-.033a1 1 0 0 1-.997-1v-6.3a1 1 0 0 1 1-1h2.9V1.128a1 1 0 0 1 1-1h8.547a1 1 0 0 1 1 1v3.746h2.612z"
          fill="#188CE1"
          fillRule="nonzero"
        />
        <path
          d="M20.416 8.894a.75.75 0 1 1 0-1.5h7.2a.75.75 0 0 1 0 1.5h-7.2z"
          fill="#656565"
          fillRule="nonzero"
        />
        <path
          d="M23.266 4.544a.75.75 0 1 1 1.5 0v7.2a.75.75 0 0 1-1.5 0v-7.2z"
          fill="#656565"
          fillRule="nonzero"
        />
      </g>
    </SvgIcon>
  );
};
