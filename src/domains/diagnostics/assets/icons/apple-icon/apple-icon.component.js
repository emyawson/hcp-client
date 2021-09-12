import React, { Fragment } from 'react';

import { colors } from 'src/domains/diagnostics/styles';
import { RenderIf } from 'src/domains/diagnostics/utils/render-if';
import { translate } from 'src/i18n'; // TODO: move to diagnostics

import { SvgIcon } from '../icon';

export const AppleIcon = ({
  height,
  width,
  iconColor = colors.grayDark,
  borderFillColor = colors.white,
  borderColor = colors.grayDark,
  withBorder = false,
}) => {
  const originalWidth = withBorder ? 28 : 17;
  const originalHeight = withBorder ? 28 : 23;
  const minX = withBorder ? 0 : -1.5;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  const r = withBorder ? 12.5 : 13.5;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.beforeMeal')}
      width={calculatedWidth}
      minX={minX}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
      preserveAspectRatio="xMinYMin meet"
    >
      <Fragment>
        <RenderIf validate={withBorder}>
          <g transform="translate(-501 -621)" fillRule="evenodd">
            <circle
              stroke={borderColor}
              fill={borderFillColor}
              cx="514.751"
              cy="634.805"
              r={r}
            />
            <path
              d="M514.112 628.75c.28.411.4.886.367 1.436-.838-.262-2.178-.958-2.303-2.728.616.201 1.462.59 1.936 1.291m3.77 12.1c-.793.526-1.624.596-2.54.213l-.264-.109-.262.111c-.845.362-1.638.286-2.424-.234-1.713-1.13-2.773-3.94-2.773-5.896 0-1.212.5-2.25 1.37-2.846.894-.612 2.082-.702 3.338-.222.71.176 1.293.085 1.503.014l.024-.009c1.286-.499 2.471-.449 3.338.14.857.58 1.337 1.621 1.35 2.923 0 1.991-1.017 4.82-2.66 5.914m2.067-9.955c-1.135-.769-2.59-.92-4.138-.437.095-.925-.099-1.75-.58-2.463-1.145-1.693-3.51-2.047-3.61-2.06l-.686-.098-.079.69c-.197 1.721.36 2.925 1.17 3.736a4.383 4.383 0 0 0-1.8.714c-1.244.851-1.957 2.294-1.957 3.96 0 2.354 1.264 5.625 3.38 7.022 1.078.713 2.26.865 3.433.452.463.163.923.244 1.374.244.758 0 1.491-.228 2.173-.682 2.12-1.41 3.263-4.679 3.263-7.044-.018-1.74-.726-3.209-1.943-4.034"
              fill={iconColor}
            />
          </g>
        </RenderIf>
        <RenderIf validate={!withBorder}>
          <path
            d="M12.2 5.4c-1.2-.8-2.6-1-4.2-.5.2-.9 0-1.8-.5-2.5C6.3.7 4 .4 3.9.4L3.2.2l-.1.7c-.1 1.4.1 2.5.9 3.4.1.1.2.3.3.4-.6.1-1.2.3-1.8.7-1.3.8-2 2.3-2 4 0 2.4 1.3 5.7 3.4 7.1 1.1.7 2.2.9 3.4.4.5.2.9.3 1.4.3.7 0 1.4-.2 2.1-.7 2.1-1.4 3.3-4.7 3.3-7.1 0-1.7-.7-3.2-1.9-4zM6.4 3.1c.2.4.4.9.3 1.5-.5-.2-1.2-.5-1.7-1.1-.4-.4-.5-1-.6-1.7.6.2 1.5.6 2 1.3zM10 15.4c-.8.5-1.6.6-2.5.2l-.3-.1-.2.1c-.8.4-1.6.3-2.4-.2-1.7-1.1-2.8-4-2.8-6 0-1.2.5-2.3 1.4-2.9.9-.6 2.1-.7 3.3-.2h.1c.5.1 1 0 1.3 0h.2c1.3-.5 2.4-.4 3.3.2.8.6 1.3 1.6 1.3 2.9 0 2-1 4.9-2.7 6z"
            fillRule="nonzero"
            fill={iconColor}
          />
        </RenderIf>
      </Fragment>
    </SvgIcon>
  );
};
