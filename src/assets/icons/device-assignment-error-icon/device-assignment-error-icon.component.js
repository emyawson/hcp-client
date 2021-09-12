import React from 'react';

import { colors } from 'src/core/styles/colors';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  fillColor?: string,
};

export const DeviceAssignmentErrorIcon = ({ height = 137 }: Props) => {
  const originalWidth = 490;
  const originalHeight = 137;

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
        <g transform="translate(191.21 .408)">
          <circle fill={colors.brandBlue} cx={21.556} cy={21.408} r={15.802} />
          <circle
            fillOpacity={0.2}
            fill={colors.brandBlue}
            cx={21.556}
            cy={21.337}
            r={20.859}
          />
          <text
            fontSize={19.907}
            fontWeight={500}
            letterSpacing={-0.213}
            fill={colors.white}
          >
            <tspan x={19.576} y={28.166}>
              !
            </tspan>
          </text>
        </g>
        <g fill={colors.brandBlue} fillRule="nonzero">
          <path d="M250.863 77.415c0 4.57-3.994 8.29-8.904 8.29h-50.736v-3.159h50.736c3.11 0 5.544-2.254 5.544-5.131 0-2.878-2.434-5.132-5.544-5.132h-57.792c-4.91 0-8.904-3.718-8.904-8.29s3.995-8.289 8.904-8.289h50.736v3.158h-50.736c-3.109 0-5.544 2.254-5.544 5.132 0 2.877 2.435 5.131 5.544 5.131h57.792c4.91 0 8.904 3.719 8.904 8.29z" />
          <path d="M183.566 81.086h-.04v4.987h.04c.087.468.379.831.729.831h4.327c.35 0 .642-.363.729-.831.018-.087.04-.174.04-.268v-4.45c0-.094-.022-.18-.04-.268-.087-.468-.379-.831-.729-.831h-4.327c-.35-.001-.642.362-.729.83zm-.877 0h-5.026v4.987h5.026v-4.987zm-2.513 1.662v-.83h.838v.83h-.838zm0 2.494v-.831h.838v.83h-.838zM242.287 59.673h.04v-4.987h-.04c-.087-.468-.378-.831-.728-.831h-4.328c-.35 0-.641.363-.728.831-.018.087-.04.174-.04.268v4.45c0 .094.022.18.04.268.087.468.378.831.728.831h4.328c.35.001.641-.362.728-.83zm.878 0h5.025v-4.987h-5.025v4.987zm2.512-1.662v.83h-.837v-.83h.837zm0-2.494v.831h-.837v-.83h.837z" />
        </g>
        <g stroke={colors.brandBlue}>
          <path
            d="M344.123 10.104c-5.67 0-8.058.461-10.527 1.782a11.885 11.885 0 0 0-4.951 4.95c-1.32 2.47-1.782 4.857-1.782 10.528v61.11c0 2.745.213 3.845.82 4.98a5.343 5.343 0 0 0 2.23 2.23c1.135.608 2.235.82 4.98.82h125.54c2.745 0 3.845-.212 4.981-.82a5.343 5.343 0 0 0 2.23-2.23c.607-1.135.82-2.235.82-4.98v-61.11c0-5.671-.462-8.058-1.782-10.527a11.885 11.885 0 0 0-4.951-4.951c-2.47-1.32-4.857-1.782-10.528-1.782h-107.08z"
            strokeWidth={2.4}
            fill={colors.lavender}
          />
          <path
            d="M348.093 23.304c-2.745 0-3.845.213-4.98.82a5.343 5.343 0 0 0-2.23 2.23c-.607 1.135-.82 2.235-.82 4.98v43.94c0 2.745.213 3.845.82 4.98a5.343 5.343 0 0 0 2.23 2.23c1.135.608 2.235.82 4.98.82h99.14c2.745 0 3.845-.212 4.981-.82a5.343 5.343 0 0 0 2.23-2.23c.607-1.135.82-2.235.82-4.98v-43.94c0-2.745-.213-3.845-.82-4.98a5.343 5.343 0 0 0-2.23-2.23c-1.136-.607-2.236-.82-4.98-.82h-99.14zm-33.23 73.2a6 6 0 0 0-6 6v4.8a3.6 3.6 0 0 0 3.6 3.6h170.4a3.6 3.6 0 0 0 3.6-3.6v-4.8a6 6 0 0 0-6-6h-165.6z"
            strokeWidth={2.4}
            fill={colors.lavender}
          />
          <path
            d="M386.863 101.604h22.8a2.1 2.1 0 1 1 0 4.2h-22.8a2.1 2.1 0 1 1 0-4.2z"
            strokeWidth={1.8}
            fill={colors.white}
          />
        </g>
        <text
          fontSize={14.4}
          fill={colors.brandBlue}
          transform="translate(-550 -650)"
        >
          <tspan x={727.776} y={771.104}>
            CONNECT
          </tspan>
        </text>
        <path
          d="M400.27 42.51v.024c0 .804.54 1.476 1.296 1.716 3.42 1.068 5.904 4.248 5.904 8.016 0 .624-.072 1.212-.204 1.788-.168.768.144 1.56.828 1.968l.012.012c1.032.6 2.376.06 2.652-1.092a11.66 11.66 0 0 0 .312-2.676c0-5.4-3.576-9.984-8.496-11.484-1.14-.348-2.304.528-2.304 1.728zm-2.472 18.06c-3.588-.516-6.504-3.432-7.032-7.008a8.396 8.396 0 0 1 5.796-9.312c.768-.228 1.308-.912 1.308-1.716v-.024c0-1.2-1.164-2.076-2.316-1.728a12.024 12.024 0 0 0-8.376 13.152c.708 5.256 4.956 9.504 10.212 10.212 3.768.504 7.248-.732 9.756-3.036.888-.816.732-2.268-.312-2.868-.696-.408-1.56-.276-2.16.264-1.764 1.608-4.212 2.46-6.876 2.064z"
          fill={colors.brandBlue}
          fillRule="nonzero"
          stroke={colors.lavender}
          strokeWidth={1.2}
        />
        <g transform="translate(.863 4.104)" stroke={colors.brandBlue}>
          <path
            d="M14.4 1.2C7.11 1.2 1.2 7.11 1.2 14.4v79.2c0 7.29 5.91 13.2 13.2 13.2h72c7.29 0 13.2-5.91 13.2-13.2V14.4c0-7.29-5.91-13.2-13.2-13.2h-72z"
            strokeWidth={2.4}
            fill={colors.lavender}
          />
          <ellipse
            strokeWidth={1.8}
            fill={colors.white}
            cx={19.44}
            cy={88.032}
            rx={5.58}
            ry={5.259}
          />
          <ellipse
            strokeWidth={1.8}
            fill={colors.white}
            cx={81.72}
            cy={88.032}
            rx={5.22}
            ry={5.259}
          />
          <ellipse
            strokeWidth={1.8}
            fill={colors.white}
            cx={50.76}
            cy={87.67}
            rx={8.1}
            ry={7.795}
          />
          <path
            d="M20.4 14.4a6 6 0 0 0-6 6v40.8a6 6 0 0 0 6 6h60a6 6 0 0 0 6-6V20.4a6 6 0 0 0-6-6h-60z"
            strokeWidth={2.4}
            fill={colors.lavender}
          />
        </g>
        <path
          d="M15.972 130.247h74.844a6.736 6.736 0 0 1-6.736 6.736H22.707a6.736 6.736 0 0 1-6.735-6.736zm293.238 0h180a6.736 6.736 0 0 1-6.736 6.736H315.946a6.736 6.736 0 0 1-6.736-6.736z"
          fill="#E0E8F8"
          style={cssFilter}
        />
        <text
          fontSize={28.8}
          fontWeight={500}
          letterSpacing={-0.309}
          fill={colors.brandBlue}
          transform="translate(-550 -650)"
        >
          <tspan x={594.585} y={704.826}>
            ?
          </tspan>
        </text>
      </g>
    </SvgIcon>
  );
};
