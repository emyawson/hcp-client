import React from 'react';

import { colors } from 'src/core/styles/colors';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
};

export const HelpIcon = ({
  height = 22,
  fillColor = colors.grayMedium,
}: Props) => {
  const originalWidth = 5;
  const originalHeight = 22;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M1.142 21.38c-.35-.31-.525-.754-.525-1.334V8.466c0-.58.175-1.02.525-1.32.35-.3.795-.45 1.335-.45.54 0 .99.15 1.35.45.36.3.54.74.54 1.32v11.58c0 .58-.18 1.025-.54 1.335-.36.31-.81.466-1.35.466s-.985-.155-1.335-.465M.857 3.47c-.4-.368-.6-.854-.6-1.454s.2-1.08.6-1.44c.4-.36.94-.54 1.62-.54.66 0 1.195.18 1.605.54.41.36.615.84.615 1.44s-.2 1.086-.6 1.455c-.4.372-.94.557-1.62.557-.68 0-1.22-.185-1.62-.556"
        fill={fillColor}
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};
