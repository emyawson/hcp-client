import React from 'react';

import { SvgIcon } from '../icon';

export const LightBulbIcon = ({ height = 15, width = 17 }) => {
  const originalWidth = 21;
  const originalHeight = 18;

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
      <g fill="#F5A623" fillRule="evenodd">
        <path d="M10.599 4.678a.72.72 0 0 0 .719-.719V1.084a.72.72 0 0 0-1.438 0v2.875a.72.72 0 0 0 .719.72m8.921 4.605h-2.876a.72.72 0 0 0 0 1.438h2.876a.72.72 0 0 0 0-1.438m-14.353.719a.72.72 0 0 0-.719-.719H1.573a.72.72 0 0 0 0 1.438h2.875a.72.72 0 0 0 .72-.719m10.09 3.738a.72.72 0 0 0-1.016 1.017l2.033 2.032a.717.717 0 0 0 1.016 0 .72.72 0 0 0 0-1.016l-2.033-2.033zM5.613 6.196a.716.716 0 0 0 1.016 0 .72.72 0 0 0 0-1.016L4.596 3.147A.72.72 0 0 0 3.58 4.163l2.033 2.033zm9.472.349a.72.72 0 0 0 .509-.21L17.627 4.3a.72.72 0 0 0-1.017-1.016l-2.034 2.033a.721.721 0 0 0 .509 1.228m-9.251 7.196L3.8 15.774a.72.72 0 0 0 1.016 1.016l2.035-2.032a.72.72 0 0 0-1.017-1.017" />
        <path d="M8.382 13.632a4.313 4.313 0 1 1 4.313 0v3.677a.66.66 0 0 1-.66.66H9.042a.66.66 0 0 1-.66-.66v-3.677z" />
      </g>
    </SvgIcon>
  );
};
