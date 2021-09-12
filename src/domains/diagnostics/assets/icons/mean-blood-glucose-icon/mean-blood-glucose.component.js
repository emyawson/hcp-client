import React from 'react';

import { colors } from 'src/domains/diagnostics/styles';
import { translate } from 'src/i18n'; // TODO: move to diagnostics

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
};

export const MeanBloodGlucoseIcon = ({
  height = 12,
  fillColor = colors.black,
  minX = 1,
  minY = -3,
}: Props) => {
  const originalWidth = 14;
  const originalHeight = 14;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.meanBloodGlucose')}
      width={height * aspectRatio}
      height={height}
      minX={minX}
      minY={minY}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M15.572 3.51h-3.376C11.73 1.5 9.936 0 7.786 0c-2.152 0-3.944 1.5-4.41 3.51H0v2.05h3.376c.466 2.01 2.258 3.513 4.41 3.513 2.15 0 3.944-1.502 4.41-3.512h3.376V3.51z"
        fill={fillColor}
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};
