import React from 'react';

import { colors } from 'src/domains/diagnostics/styles';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
};

export const BoxGraphIcon = ({
  height = 31,
  fillColor = colors.grayDark,
}: Props) => {
  const originalWidth = 32;
  const originalHeight = 31;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      title="Box Graph"
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M7.875 22.053c0 .542-.458 1-1 1H3c-.542 0-1-.458-1-1v-6.1c0-.54.458-1 1-1h3.875c.542 0 1 .46 1 1v6.1zm-1-9.1h-.482V0h-2.91v12.954H3c-1.65 0-3 1.35-3 3v6.1c0 1.65 1.35 3 3 3h.482v5.31h2.91v-5.31h.483c1.65 0 3-1.35 3-3v-6.1c0-1.65-1.35-3-3-3zM18.875 15.157c0 .542-.458 1-1 1H14c-.542 0-1-.458-1-1v-6.1c0-.54.458-1 1-1h3.875c.542 0 1 .46 1 1v6.1zm-1-9.1h-.482V0h-2.91v6.058H14c-1.65 0-3 1.35-3 3v6.1c0 1.65 1.35 3 3 3h.482v12.206h2.91V18.157h.483c1.65 0 3-1.35 3-3v-6.1c0-1.65-1.35-3-3-3zM29.875 18.255c0 .542-.458 1-1 1H25c-.542 0-1-.458-1-1v-6.1c0-.54.458-1 1-1h3.875c.542 0 1 .46 1 1v6.1zm-1-9.1h-.482V0h-2.91v9.156H25c-1.65 0-3 1.35-3 3v6.1c0 1.65 1.35 3 3 3h.482v9.108h2.91v-9.11h.483c1.65 0 3-1.35 3-3v-6.098c0-1.65-1.35-3-3-3z"
        fill={fillColor}
      />
    </SvgIcon>
  );
};
