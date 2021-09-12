import React from 'react';

import { colors } from 'src/core/styles/colors';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
};

export const StripStockIcon = ({
  height = 24,
  fillColor = colors.grayMedium,
}: Props) => {
  const originalWidth = 34;
  const originalHeight = 46;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        fillRule="evenodd"
        fill={fillColor}
        d="M2,14 C3.1045695,14 4,14.8954305 4,16 L4,44 C4,45.1045695 3.1045695,46 2,46 C0.8954305,46 1.3527075e-16,45.1045695 0,44 L0,16 C-1.3527075e-16,14.8954305 0.8954305,14 2,14 Z M12,14 C13.1045695,14 14,14.8954305 14,16 L14,44 C14,45.1045695 13.1045695,46 12,46 C10.8954305,46 10,45.1045695 10,44 L10,16 C10,14.8954305 10.8954305,14 12,14 Z M32,14 C33.1045695,14 34,14.8954305 34,16 L34,44 C34,45.1045695 33.1045695,46 32,46 C30.8954305,46 30,45.1045695 30,44 L30,16 C30,14.8954305 30.8954305,14 32,14 Z M22,0 C23.1045695,-2.02906125e-16 24,0.8954305 24,2 L24,44 C24,45.1045695 23.1045695,46 22,46 C20.8954305,46 20,45.1045695 20,44 L20,2 C20,0.8954305 20.8954305,2.02906125e-16 22,0 Z"
      />
    </SvgIcon>
  );
};
