import React from 'react';

import { colors } from 'src/domains/diagnostics/styles';

import { SvgIcon } from '../icon';

export const MinimizeIcon = ({
  height = 19,
  fillColor = colors.grayMedium,
}) => {
  const originalWidth = 19;
  const originalHeight = 19;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      title="Minimize Icon"
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M18.947 1.868A1.05 1.05 0 1 0 17.465.38l-5.151 5.136c-.2.084-.342-.048-.343-.371l-.002-2.555c-.001-1.367-2.052-1.37-2.051-.001l.027 5.877a.915.915 0 0 0 .907.907l5.9.05c1.368 0 1.366-2.051-.001-2.052l-2.555-.002c-.415-.001-.512-.231-.244-.521l4.995-4.981zM.29 17.567a1.05 1.05 0 1 0 1.481 1.487l5.151-5.136c.2-.084.342.048.342.371l.003 2.555c.001 1.367 2.052 1.37 2.05.001l-.026-5.877a.915.915 0 0 0-.907-.907l-5.9-.05c-1.368 0-1.366 2.051.001 2.052l2.555.002c.415.001.512.231.244.521L.29 17.567z"
        fill={fillColor}
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};
