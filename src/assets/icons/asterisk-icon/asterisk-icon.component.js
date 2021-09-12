import React, { Fragment } from 'react';

import { colors } from 'src/core/styles/colors';
import { RenderIf } from 'src/utils/render-if';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  iconColor?: string,
  borderFillColor?: string,
  borderColor?: string,
  withBorder?: boolean,
};

export const AsteriskIcon = ({
  height,
  width,
  iconColor = colors.grayDark,
  borderFillColor = colors.white,
  borderColor = colors.grayDark,
  withBorder = false,
}: Props) => {
  const originalWidth = withBorder ? 15 : 15;
  const originalHeight = withBorder ? 15 : 15;
  const minX = withBorder ? 0 : -1.5;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      width={calculatedWidth}
      minX={minX}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
      preserveAspectRatio="xMinYMin meet"
    >
      <Fragment>
        <RenderIf validate={withBorder}>
          <circle
            fill={borderFillColor}
            stroke={borderColor}
            cx="8.026"
            cy="8.048"
            r="6.7"
            fillRule="evenodd"
          />
          <path
            d="M8.873 7.552l.945-1.472a.676.676 0 0 0 .095-.32.533.533 0 0 0-.183-.408.615.615 0 0 0-.424-.168c-.214 0-.374.107-.48.32l-.8 1.57-.817-1.57c-.106-.213-.27-.32-.495-.32a.633.633 0 0 0-.425.16.51.51 0 0 0-.183.4c0 .118.037.23.112.336l.943 1.472-1.759-.08c-.193-.01-.339.043-.44.16a.621.621 0 0 0-.152.416c0 .16.051.3.151.416.102.117.248.171.441.16l1.76-.08-.944 1.49a.548.548 0 0 0-.112.318c0 .16.063.294.192.4.128.107.272.16.432.16a.494.494 0 0 0 .48-.303l.816-1.569.8 1.552c.106.214.266.32.48.32a.61.61 0 0 0 .424-.168.533.533 0 0 0 .183-.408.619.619 0 0 0-.095-.32l-.945-1.472 1.761.08c.191.011.341-.043.447-.16a.596.596 0 0 0 .16-.416.596.596 0 0 0-.16-.416c-.106-.117-.256-.17-.447-.16l-1.76.08z"
            fill={iconColor}
            fillRule="evenodd"
          />
        </RenderIf>
        <RenderIf validate={!withBorder}>
          <path
            d="M8.873 7.552l.945-1.472a.676.676 0 0 0 .095-.32.533.533 0 0 0-.183-.408.615.615 0 0 0-.424-.168c-.214 0-.374.107-.48.32l-.8 1.57-.817-1.57c-.106-.213-.27-.32-.495-.32a.633.633 0 0 0-.425.16.51.51 0 0 0-.183.4c0 .118.037.23.112.336l.943 1.472-1.759-.08c-.193-.01-.339.043-.44.16a.621.621 0 0 0-.152.416c0 .16.051.3.151.416.102.117.248.171.441.16l1.76-.08-.944 1.49a.548.548 0 0 0-.112.318c0 .16.063.294.192.4.128.107.272.16.432.16a.494.494 0 0 0 .48-.303l.816-1.569.8 1.552c.106.214.266.32.48.32a.61.61 0 0 0 .424-.168.533.533 0 0 0 .183-.408.619.619 0 0 0-.095-.32l-.945-1.472 1.761.08c.191.011.341-.043.447-.16a.596.596 0 0 0 .16-.416.596.596 0 0 0-.16-.416c-.106-.117-.256-.17-.447-.16l-1.76.08z"
            fill={iconColor}
            fillRule="evenodd"
          />
        </RenderIf>
      </Fragment>
    </SvgIcon>
  );
};
