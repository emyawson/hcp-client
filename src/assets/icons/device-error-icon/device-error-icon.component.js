import React from 'react';

import { colors } from 'src/core/styles/colors';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
};

export const DeviceErrorIcon = ({
  height = 39,
  fillColor = colors.grayMedium,
}: Props) => {
  const originalWidth = 174;
  const originalHeight = 211;

  const aspectRatio = originalWidth / originalHeight;

  const filterId = 'shadowBlur';
  const cssFilter = {
    filter: `url(#${filterId})`,
  };

  return (
    <SvgIcon
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <defs>
        <filter id={filterId}>
          <feGaussianBlur stdDeviation="10 0" in="SourceGraphic" />
        </filter>
      </defs>

      <g fill="none" fillRule="evenodd">
        <rect
          stroke="#06C"
          strokeWidth={2}
          fill="#F7F9FD"
          x={1}
          y={1}
          width={160.829}
          height={172.054}
          rx={17.496}
        />
        <ellipse
          stroke="#06C"
          strokeWidth={2}
          fill="#FFF"
          cx={31.403}
          cy={141.93}
          rx={9.468}
          ry={8.929}
        />
        <ellipse
          stroke="#06C"
          strokeWidth={2}
          fill="#FFF"
          cx={132.008}
          cy={141.93}
          rx={8.886}
          ry={8.929}
        />
        <ellipse
          stroke="#06C"
          strokeWidth={2}
          fill="#FFF"
          cx={81.996}
          cy={141.346}
          rx={13.538}
          ry={13.018}
        />
        <rect
          stroke="#06C"
          strokeWidth={2}
          fill="#F7F9FD"
          x={21.935}
          y={20.859}
          width={120.122}
          height={87.947}
          rx={8.748}
        />
        <g transform="translate(61 44)">
          <circle fill="#06C" cx={21.556} cy={21.408} r={15.802} />
          <circle
            fillOpacity={0.2}
            fill="#06C"
            cx={21.556}
            cy={21.337}
            r={20.859}
          />
          <text
            fontFamily="Nunito-SemiBold, Nunito"
            fontSize={19.907}
            fontWeight={500}
            letterSpacing={-0.213}
            fill="#FFF"
          >
            <tspan x={17.576} y={28.166}>
              ?
            </tspan>
          </text>
        </g>
        <path
          d="M25 201h118.24v3.598c0 5.344-4.332 9.676-9.676 9.676H34.677c-5.345 0-9.677-4.332-9.677-9.676V201z"
          fill="#E0E8F8"
          style={cssFilter}
        />
      </g>
    </SvgIcon>
  );
};
