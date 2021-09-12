import React, { Fragment } from 'react';

import { colors } from 'src/domains/diagnostics/styles';
import { RenderIf } from 'src/domains/diagnostics/utils';

import { SvgIcon } from '../icon';

export const DisclaimerIcon = ({
  height = 18,
  width = 18,
  iconColor = colors.grayDark,
  borderFillColor = colors.white,
  borderColor = colors.grayDark,
  withBorder = false,
}) => {
  const originalWidth = 18;
  const originalHeight = 18;
  const minX = withBorder ? 0 : -1.5;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  const r = withBorder ? 8 : 8.344;

  return (
    <SvgIcon
      title="Disclaimer"
      width={calculatedWidth}
      minX={minX}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
      preserveAspectRatio="xMinYMin meet"
    >
      <Fragment>
        <g fillRule="evenodd">
          <RenderIf validate={withBorder}>
            <circle
              stroke={borderColor}
              fill={borderFillColor}
              cx="9.313"
              cy="8.857"
              r={r}
            />
          </RenderIf>
          <path
            d="M9.003 10.882a.503.503 0 0 1-.14-.336l-.42-5.935c-.028-.262.04-.474.203-.638.163-.163.38-.245.651-.245.261 0 .474.082.637.245.163.164.231.376.203.638l-.42 5.935a.53.53 0 0 1-.126.343.384.384 0 0 1-.294.119.403.403 0 0 1-.294-.126m-.343 2.604a.856.856 0 0 1-.259-.644c0-.261.086-.478.26-.65a.866.866 0 0 1 .636-.26c.252 0 .462.087.63.26a.893.893 0 0 1 .252.65.87.87 0 0 1-.252.644.855.855 0 0 1-.63.252.879.879 0 0 1-.637-.252"
            fill={iconColor}
          />
        </g>
      </Fragment>
    </SvgIcon>
  );
};
