import React from 'react';

import { colors } from 'src/core/styles/colors';
import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const ArrowIcon = ({ height = 12, fillColor = colors.grayMedium }) => {
  const originalWidth = 21;
  const originalHeight = 12;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.arrow')}
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M20.141.35c-.463-.464-1.271-.466-1.733 0l-8.159 8.174L2.093.349C1.63-.115.823-.117.36.349a1.223 1.223 0 0 0 0 1.736l9.023 9.044c.228.229.544.36.866.36.328 0 .636-.128.868-.36l9.024-9.043a1.228 1.228 0 0 0 0-1.736"
        fill={fillColor}
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};
