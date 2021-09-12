import React, { Fragment } from 'react';

import { colors } from 'src/domains/diagnostics/styles';
import { translate } from 'src/i18n'; // TODO: move to diagnostics
import { RenderIf } from 'src/domains/diagnostics/utils/render-if';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
  iconColor?: string,
  borderFillColor?: string,
  borderColor?: string,
  withBorder?: boolean,
};

export const NightIcon = ({
  height,
  width,
  iconColor = colors.grayDark,
  borderFillColor = colors.white,
  borderColor = colors.grayDark,
  withBorder = false,
}: Props) => {
  const originalWidth = withBorder ? 28 : 15;
  const originalHeight = withBorder ? 28 : 21;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.night')}
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
              cx="14.159"
              cy="13.756"
              r="13.5"
              transform="translate(.184 -.079)"
              stroke={borderColor}
              fill={borderFillColor}
            />
            <path
              d="M17.208 7.945a7.124 7.124 0 0 0-3.238-2.056c2.426 2.904 2.039 7.327-.93 10a7.535 7.535 0 0 1-5.466 1.948c2.646 2.288 6.598 2.342 9.215-.014 2.84-2.558 3.028-6.98.42-9.878z"
              stroke={iconColor}
              strokeWidth="1.215"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </RenderIf>
        <RenderIf validate={!withBorder}>
          <path
            d="M6.1 15.5c-1.8 0-3.6-.6-5-1.9-.2-.2-.3-.5-.2-.7.1-.2.4-.4.6-.4 1.7.2 3.6-.5 5-1.8 2.7-2.5 3-6.5.8-9.2 0 0-.1-.3.1-.5s.4-.3.7-.2c1.3.4 2.5 1.2 3.5 2.3 1.4 1.5 2.1 3.5 2 5.6-.1 2-1 3.8-2.4 5.1-1.5 1.1-3.3 1.7-5.1 1.7zm-2.7-1.8c2.2 1 5 .7 6.9-1 1.2-1.1 1.9-2.6 2-4.2.1-1.7-.5-3.4-1.7-4.7-.4-.4-.7-.7-1.2-1 1.2 3 .5 6.6-2.1 9-1.1 1-2.5 1.7-3.9 1.9z"
            fillRule="nonzero"
            fill={iconColor}
          />
        </RenderIf>
      </Fragment>
    </SvgIcon>
  );
};
