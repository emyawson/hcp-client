import React from 'react';

import { SvgIcon } from 'src/assets/icons';
import { colors } from 'src/core/styles/colors';
import { translate } from 'src/i18n';

const originalWidth = 42;
const originalHeight = 53;
const aspectRatio = originalWidth / originalWidth;

export const BellIcon = ({
  height = originalHeight,
  fillColor = colors.white,
}) => (
  <SvgIcon
    title={translate('graphs.iconTitles.bell')}
    width={height * aspectRatio}
    height={height}
    originalWidth={originalWidth}
    originalHeight={originalHeight}
  >
    <path
      d="M21 2.562c-2.112 0-4.135.353-5.983.971C16.161 1.413 18.448 0 21 0c2.552 0 4.84 1.413 5.983 3.533A18.879 18.879 0 0 0 21 2.562zm0 47.788c-1.584 0-2.991-.707-3.871-1.855h-3.08C15.281 51.145 17.921 53 21 53c3.08 0 5.719-1.855 6.95-4.505h-3.079c-.88 1.148-2.287 1.855-3.871 1.855zm20.5-4.947c0 .707-.616 1.325-1.32 1.325H1.82c-.704 0-1.32-.618-1.32-1.325 0-.706.616-1.325 1.32-1.325h1.583V21.995c0-9.717 7.919-17.667 17.597-17.667s17.597 7.95 17.597 17.667v22.083h1.583c.704 0 1.32.619 1.32 1.325zm-5.543-23.408c0-8.303-6.687-15.017-14.957-15.017S6.043 13.692 6.043 21.995v22.083h29.914V21.995z"
      fill={fillColor}
      fillRule="nonzero"
    />
  </SvgIcon>
);
