import * as React from 'react';

import { SvgIcon } from '../icon';

type Props = {
  height?: number;
};

export const PatientSilhouetteIcon = ({ height = 117 }: Props) => {
  const originalWidth = 110;
  const originalHeight = 117;
  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g transform="translate(.094 .831)" fill="none" fillRule="evenodd">
        <circle
          stroke="#06C"
          strokeWidth={2}
          fill="#F7F9FD"
          cx={53.906}
          cy={48.169}
          r={18}
        />
        <ellipse
          stroke="#06C"
          strokeWidth={2}
          fill="#F7F9FD"
          cx={53.906}
          cy={112.169}
          rx={44}
          ry={40}
        />
        <path
          stroke="#06C"
          strokeWidth={1.62}
          d="M12.96.81C6.25.81.81 6.25.81 12.96v90.08c0 6.71 5.44 12.15 12.15 12.15h83.08c6.71 0 12.15-5.44 12.15-12.15V12.96c0-6.71-5.44-12.15-12.15-12.15H12.96z"
        />
      </g>
    </SvgIcon>
  );
};
