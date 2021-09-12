import React from 'react';

import { translate } from 'src/i18n';
import { SvgIcon } from 'src/assets/icons';
import { colors } from 'src/core/styles/colors';

type Props = {
  height?: number,
  width?: number,
  fillColor?: string,
};

const originalWidth = 9;
const originalHeight = 9;
const aspectRatio = originalWidth / originalWidth;

export const FlagIcon = ({
  fillColor = colors.trafficOrange,
  height = originalHeight,
}: Props) => (
  <SvgIcon
    title={translate('graphs.iconTitles.flag')}
    width={height * aspectRatio}
    height={height}
    originalWidth={originalWidth}
    originalHeight={originalHeight}
  >
    <path
      d="M6.724 3.792L9 6.417H1.345v-5.25H9L6.724 3.792zM.621 0C.269 0 0 .253 0 .583c0 .214.124.409.31.506V10h.621V1.089a.575.575 0 0 0 .31-.506C1.241.253.951 0 .621 0z"
      fillRule="nonzero"
      fill={fillColor}
    />
  </SvgIcon>
);
