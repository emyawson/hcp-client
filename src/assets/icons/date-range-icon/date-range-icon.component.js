import React from 'react';

import { colors } from 'src/core/styles/colors';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
};

export const DateRangeIcon = ({
  height = 24,
  fillColor = colors.grayDark,
}: Props) => {
  const originalWidth = 13;
  const originalHeight = 15;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M11.875 5.128v.966H1.125V4.393h.252l-.002-.005h10.22v.004h.28v.736zm0 3.216v5.29H1.125V7.377h10.75v.966zm-9.46-5.17v-1.78c0-.148.12-.27.27-.27h.945c.15 0 .27.122.27.27V3.27H2.415v-.096zm6.656 0v-1.78c0-.148.122-.27.27-.27h.947c.15 0 .27.122.27.27V3.27H9.07v-.096zm3.21.094h-.646.048V1.394C11.682.627 11.056 0 10.287 0H9.34c-.768 0-1.394.626-1.394 1.395v1.873h.047H4.98h.047V1.394C5.025.627 4.4 0 3.63 0h-.946C1.914 0 1.29.626 1.29 1.395v1.873h.046H.72c-.398 0-.72.322-.72.72v10.207h.032c.074.32.347.56.688.56h11.56c.342 0 .614-.24.688-.56H13V3.986c0-.398-.322-.72-.72-.72z"
        fill={fillColor}
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};
