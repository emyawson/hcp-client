import React from 'react';

import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const AppleFullColorIcon = ({ height, width }) => {
  const originalWidth = 14;
  const originalHeight = 17;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.beforeMeal')}
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g fillRule="evenodd">
        <path
          d="M7.414 2.168C6.31.533 4.041.194 3.945.181L3.121.064l-.094.827c-.172 1.501.251 2.591.91 3.366.23.271.49.502.763.7a5.155 5.155 0 0 0 2.274.904l.715.09.173-.7c.005-.02.004-.038.01-.059.071-.305.11-.6.121-.887.032-.793-.156-1.51-.579-2.137"
          fill="#78BD2D"
        />
        <path
          d="M11.732 4.802c-1.037-.702-2.345-.87-3.738-.497a4.813 4.813 0 0 1-.122.888c-.005.02-.005.038-.01.058l-.172.7-.715-.089A5.154 5.154 0 0 1 4.7 4.956a4.252 4.252 0 0 1-.764-.699c-.503.12-.981.325-1.413.622C1.32 5.702.63 7.094.63 8.697c0 2.23 1.2 5.328 3.21 6.656 1.032.68 2.159.838 3.283.46.428.144.854.216 1.273.216.736 0 1.45-.222 2.112-.664 2.016-1.34 3.103-4.437 3.103-6.676-.017-1.672-.702-3.089-1.88-3.887"
          fill="#EE5151"
        />
      </g>
    </SvgIcon>
  );
};
