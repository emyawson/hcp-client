import * as React from 'react';

import { colors } from 'src/core/styles/colors';

import { SvgIcon } from '../icon';

export const EmailIcon = ({ height = 17, fillColor = colors.grayMedium }) => {
  const originalWidth = 22;
  const originalHeight = 17;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g fill={fillColor}>
        <path d="M18.789.576H3.012A2.555 2.555 0 0 0 .459 3.13v10.783a2.555 2.555 0 0 0 2.553 2.553h15.772a2.555 2.555 0 0 0 2.553-2.553V3.134A2.553 2.553 0 0 0 18.79.576zm1.386 13.336c0 .765-.622 1.387-1.386 1.387H3.012a1.388 1.388 0 0 1-1.387-1.387V3.134c0-.765.622-1.387 1.387-1.387h15.772c.765 0 1.387.622 1.387 1.387v10.778h.004z" />
        <path d="M13.626 8.387l5.106-4.58a.586.586 0 0 0 .044-.824.586.586 0 0 0-.826-.044L10.91 9.26 9.535 8.033c-.004-.005-.009-.01-.009-.013a.864.864 0 0 0-.095-.082l-5.59-5.003a.582.582 0 0 0-.825.048.582.582 0 0 0 .048.825L8.23 8.426l-5.145 4.817a.586.586 0 0 0 .8.855l5.222-4.886 1.417 1.266a.583.583 0 0 0 .778-.005l1.456-1.304 5.192 4.933a.583.583 0 0 0 .804-.847l-5.128-4.868z" />
      </g>
    </SvgIcon>
  );
};
