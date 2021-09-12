import React, { Fragment } from 'react';

import { colors } from 'src/core/styles/colors';
import { translate } from 'src/i18n';
import { RenderIf } from 'src/utils/render-if';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  iconColor?: string,
  borderFillColor?: string,
  borderColor?: string,
  withBorder?: boolean,
};

export const OvernightIcon = ({
  height,
  width,
  iconColor = colors.grayDark,
  borderFillColor = colors.white,
  borderColor = colors.grayDark,
  withBorder = false,
}: Props) => {
  const originalWidth = withBorder ? 28 : 14;
  const originalHeight = withBorder ? 28 : 22;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.bedtime')}
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
      preserveAspectRatio="xMinYMin meet"
    >
      <Fragment>
        <RenderIf validate={withBorder}>
          <g fill="none" fillRule="evenodd">
            <circle
              stroke={borderColor}
              fill={borderFillColor}
              cx="13.957"
              cy="13.5"
              r="13.5"
            />
            <path
              d="M8.756 19.493H19.37v-7.288H8.756v7.288zm3.054-8.59h4.543V9.408H11.81v1.495zm7.56-3.7v3.727h-1.741V8.929a.801.801 0 0 0-.804-.796h-5.486a.8.8 0 0 0-.804.796v2h-1.78V7.204H19.37zm.65-1.301H8.106a.65.65 0 0 0-.65.65v13.592c0 .359.29.65.65.65H20.02a.65.65 0 0 0 .65-.65V6.553a.65.65 0 0 0-.65-.651z"
              fill={iconColor}
            />
          </g>
        </RenderIf>
        <RenderIf validate={!withBorder}>
          <path
            d="M13.3.8H.8c-.4 0-.6.2-.6.6v14.3c0 .4.3.6.6.6h12.5c.4 0 .6-.3.6-.6V1.4c0-.4-.2-.6-.6-.6zM12.7 2v4h-1.8V3.9c0-.5-.4-.8-.8-.8H4.2c-.5 0-.8.4-.8.8v2.2h-2V2h11.3zM9.6 6.1h-5V4.3h4.9v1.8h.1zm-8.2 9V7.3h11.3V15H1.4v.1z"
            fillRule="nonzero"
            fill={iconColor}
          />
        </RenderIf>
      </Fragment>
    </SvgIcon>
  );
};
