import React from 'react';

import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const PumpPowerDownIcon = ({ height, width }) => {
  const originalWidth = 19;
  const originalHeight = 22;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.pumpPowerDown')}
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g fill="#9B9B9B" fillRule="evenodd">
        <path d="M12.771 3.742V6.48a6.753 6.753 0 0 1 3.5 5.912 6.758 6.758 0 0 1-6.75 6.75 6.758 6.758 0 0 1-6.75-6.75 6.753 6.753 0 0 1 3.5-5.912V3.742c-3.499 1.32-6 4.693-6 8.65 0 5.1 4.15 9.25 9.25 9.25 5.101 0 9.25-4.15 9.25-9.25 0-3.957-2.5-7.33-6-8.65" />
        <path d="M9.521 11.567c.69 0 1.25-.445 1.25-.995V1.811c0-.55-.56-.995-1.25-.995s-1.25.445-1.25.995v8.761c0 .55.56.995 1.25.995" />
      </g>
    </SvgIcon>
  );
};
