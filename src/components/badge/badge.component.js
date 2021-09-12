import React from 'react';

import { RenderIf } from 'src/utils';
import { colors } from 'src/core/styles/colors';

import { BadgeWrapperSpan, BadgeIconSpan } from './badge.style';

export const Badge = ({
  bgColor = colors.brandBlue,
  disabled = false,
  emptyInnerCircle,
  icon,
  size = 42,
  ...badgeProps
}) => (
  <BadgeWrapperSpan
    bgColor={bgColor}
    disabled={disabled}
    emptyInnerCircle={emptyInnerCircle}
    size={size}
    {...badgeProps}
  >
    <BadgeIconSpan
      bgColor={bgColor}
      disabled={disabled}
      emptyInnerCircle={emptyInnerCircle}
      size={size}
    >
      <RenderIf validate={icon}>{icon}</RenderIf>
    </BadgeIconSpan>
  </BadgeWrapperSpan>
);
