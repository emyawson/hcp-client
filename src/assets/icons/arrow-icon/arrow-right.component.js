import React from 'react';

import { colors } from 'src/core/styles/colors';
import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
};

export const ArrowRightIcon = ({
  height = 12,
  fillColor = colors.grayMedium,
}: Props) => {
  const originalWidth = 28;
  const originalHeight = 16;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.arrow')}
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M27.68 7.079L20.444.272a1 1 0 1 0-1.371 1.457l5.352 5.034H1a1 1 0 1 0 0 2h23.496l-5.42 5.029a1 1 0 1 0 1.362 1.466l7.238-6.718a1.001 1.001 0 0 0 .005-1.461"
        fill={fillColor}
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};
