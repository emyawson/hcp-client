import React from 'react';

import { SvgIcon } from 'src/assets/icons';
import { colors } from 'src/core/styles/colors';

type Props = {
  height?: number,
  width?: number,
  fillColor?: string,
};

const originalWidth = 9;
const originalHeight = 9;
const aspectRatio = originalWidth / originalWidth;

export const XIcon = ({
  fillColor = colors.trafficRed,
  height = originalHeight,
}: Props) => (
  <SvgIcon
    title="Times"
    width={height * aspectRatio}
    height={height}
    originalWidth={originalWidth}
    originalHeight={originalHeight}
  >
    <path
      d="M8.763 7.812A.681.681 0 0 1 9 8.334c0 .18-.072.336-.217.468A.736.736 0 0 1 8.27 9a.8.8 0 0 1-.573-.252L4.5 5.418l-3.178 3.33A.8.8 0 0 1 .75 9a.772.772 0 0 1-.523-.198A.62.62 0 0 1 0 8.316c0-.18.079-.348.237-.504l3.276-3.366L.375 1.188C.217 1.02.138.852.138.684A.62.62 0 0 1 .365.198.748.748 0 0 1 .868 0a.8.8 0 0 1 .573.252L4.5 3.456 7.56.252A.8.8 0 0 1 8.131 0c.197 0 .368.066.513.198a.614.614 0 0 1 .217.468.681.681 0 0 1-.237.522L5.487 4.446l3.276 3.366z"
      fillRule="evenodd"
      fill={fillColor}
    />
  </SvgIcon>
);
