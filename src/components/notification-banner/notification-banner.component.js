import React from 'react';

import { FlagIcon } from 'src/assets/icons';
import { RenderIf } from 'src/utils';
import { colors } from 'src/core/styles/colors';

import {
  NotificationBannerDiv,
  NotificationBannerIconSpan,
  NotificationBannerMessageSpan,
} from './notification-banner.style';

export const NotificationBanner = ({
  color = colors.brandBlue,
  showIcon = true,
  text,
  ...bannerProps
}) => (
  <NotificationBannerDiv color={color} {...bannerProps}>
    <RenderIf validate={showIcon}>
      <NotificationBannerIconSpan>
        <FlagIcon height={11} fillColor={color} />
      </NotificationBannerIconSpan>
    </RenderIf>
    <NotificationBannerMessageSpan>{text}</NotificationBannerMessageSpan>
  </NotificationBannerDiv>
);
