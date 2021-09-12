import React from 'react';

import { colors } from 'src/core/styles/colors';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
  strokeColor?: string,
};

export const DeviceIcon = ({
  height = 39,
  fillColor = colors.blueMarineAlpha,
  strokeColor = colors.brandBlue,
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
        <g transform="translate(5.966 .246)">
          <rect
            stroke={strokeColor}
            strokeWidth={2}
            fill={fillColor}
            x={1}
            y={1}
            width={160.829}
            height={172.054}
            rx={17.496}
          />
          <ellipse
            stroke={strokeColor}
            strokeWidth={2}
            fill="#FFF"
            cx={31.403}
            cy={141.93}
            rx={9.468}
            ry={8.929}
          />
          <ellipse
            stroke={strokeColor}
            strokeWidth={2}
            fill="#FFF"
            cx={132.008}
            cy={141.93}
            rx={8.886}
            ry={8.929}
          />
          <ellipse
            stroke={strokeColor}
            strokeWidth={2}
            fill="#FFF"
            cx={81.996}
            cy={141.346}
            rx={13.538}
            ry={13.018}
          />
          <rect
            stroke={strokeColor}
            strokeWidth={2}
            fill={fillColor}
            x={21.935}
            y={20.859}
            width={120.122}
            height={87.947}
            rx={8.748}
          />
          <path
            d="M82.665 40.317h-.004c-.4-.028-.812.133-1.083.418-10.472 11.387-16.146 20.97-16.146 29.878 0 10.184 7.674 18.511 17.146 18.511 9.471 0 17.146-8.327 17.146-18.51 0-8.909-5.675-18.492-16.144-29.875a1.387 1.387 0 0 0-.915-.422zm.035-.6a1.865 1.865 0 0 1 .002 0h-.004a1.896 1.896 0 0 1 .002 0zm-.346 4.295l.224-.251.224.251C91.778 54.086 97 63.219 97 70.613c0 8.763-6.47 15.817-14.423 15.817-7.954 0-14.423-7.054-14.423-15.817 0-7.393 5.222-16.527 14.199-26.601zm9.435 24.275c-.802-.081-1.593.726-1.489 1.518.418 3.447-2.37 8.279-5.892 10.181-.622.339-.883 1.228-.542 1.843.341.617 1.242.877 1.866.538 4.742-2.562 7.863-7.986 7.27-12.88-.064-.602-.603-1.136-1.213-1.2z"
            fill={strokeColor}
            fillRule="nonzero"
            stroke={fillColor}
            strokeWidth={0.6}
          />
        </g>
        <path
          d="M34 199h106a8.91 8.91 0 0 1-8.91 8.91H42.91A8.91 8.91 0 0 1 34 199z"
          fill="#E0E8F8"
          style={cssFilter}
        />
      </g>
    </SvgIcon>
  );
};
