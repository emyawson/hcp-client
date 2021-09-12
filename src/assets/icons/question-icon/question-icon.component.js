import React from 'react';

import { colors } from 'src/core/styles/colors';
import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const QuestionIcon = ({
  height = 24,
  fillColor = colors.grayMedium,
}: Props) => {
  const originalWidth = 15;
  const originalHeight = 24;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      title={translate('iconTitles.help')}
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M5.128 16.756c0-1.386.171-2.49.515-3.313s1.024-1.726 2.04-2.71C8.697 9.747 9.34 9.046 9.611 8.63a3.69 3.69 0 0 0 .625-2.063c0-.979-.242-1.726-.727-2.242-.484-.515-1.195-.773-2.132-.773-.896 0-1.618.252-2.164.758-.547.505-.82 1.19-.82 2.054H.595c.021-1.844.649-3.302 1.883-4.375C3.714.917 5.346.38 7.378.38c2.093 0 3.726.532 4.898 1.595 1.172 1.062 1.758 2.546 1.758 4.453 0 1.698-.792 3.37-2.375 5.015l-1.922 1.89c-.688.782-1.042 1.923-1.063 3.423H5.128zm-.266 4.86c0-.615.193-1.113.578-1.493.386-.38.906-.57 1.563-.57.666 0 1.192.195 1.578.586.385.39.578.882.578 1.476 0 .573-.188 1.052-.563 1.438-.375.385-.906.578-1.593.578-.688 0-1.217-.193-1.586-.578-.37-.386-.555-.865-.555-1.438z"
        fill={fillColor}
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};
