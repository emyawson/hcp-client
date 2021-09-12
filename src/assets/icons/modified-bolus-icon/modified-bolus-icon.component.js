import React from 'react';

import { SvgIcon } from '../icon';

export const ModifiedBolusIcon = ({ height = 11, width = 17 }) => {
  const originalWidth = 11;
  const originalHeight = 17;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title="Light Bulb"
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M5.235.013l5 7h-10zm0 17.003l-5-7h10z"
        fill="#F5A623"
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};
