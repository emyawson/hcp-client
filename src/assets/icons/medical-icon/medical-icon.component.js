import React from 'react';

import { SvgIcon } from 'src/assets/icons';
import { colors } from 'src/core/styles/colors';

type Props = {
  height?: number,
  fillColor?: string,
};

const originalWidth = 54;
const originalHeight = 49;
const aspectRatio = originalWidth / originalWidth;

export const MedicalIcon = ({
  height = originalHeight,
  fillColor = colors.white,
}: Props) => (
  <SvgIcon
    title="Medical"
    width={height * aspectRatio}
    height={height}
    originalWidth={originalWidth}
    originalHeight={originalHeight}
  >
    <path
      d="M51.482 45.265c0 .681-.551 1.238-1.224 1.238H3.746a1.234 1.234 0 0 1-1.224-1.238V13.072c0-.682.55-1.239 1.224-1.239h46.512c.673 0 1.224.557 1.224 1.239v32.193zM49.304 9.333H4.695C2.114 9.333 0 11.433 0 14v30.333C0 46.9 2.113 49 4.696 49h44.608C51.887 49 54 46.9 54 44.333V14c0-2.567-2.113-4.667-4.696-4.667z"
      fill={fillColor}
    />
    <path
      d="M29.348 21h-4.695v5.833h-5.87V31.5h5.87v5.833h4.695V31.5h5.87v-4.667h-5.87zM19.956 3.5h14.088v4.667h3.522V3.5c0-1.925-1.586-3.5-3.523-3.5H19.957c-1.936 0-3.521 1.575-3.521 3.5v4.667h3.521V3.5z"
      fill={fillColor}
    />
  </SvgIcon>
);
