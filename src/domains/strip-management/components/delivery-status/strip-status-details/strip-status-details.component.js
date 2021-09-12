import React from 'react';
import { pathOr } from 'ramda';

import { convertStripConsumptionToTrafficLightColor } from 'src/core/strip-delivery';
import {
  Caption,
  LocalizedText,
  NotificationBanner,
  ProgressBar,
  SectionHeader,
} from 'src/components';
import { colors } from 'src/core/styles';
import { translate } from 'src/i18n';
import { hasValue, RenderIf } from 'src/utils';

import {
  StripStatusDetailsContainer,
  StripStatusDetailsInnerWrapper,
  StripStatusDetailsInnerItemSmall,
  StripStatusDetailsInnerItemLarge,
  StripStatusDetailsSubHeding,
  StripStatusDetailsInfo,
  StripStatusDetailsProgressBarWrapper,
  StripStatusNotificationWrapperDiv,
} from './strip-status-details.style';

import { StripDeliveryAlert } from '../../strip-delivery-alerts';

export const createStripsConsumedDisplay = stripsConsumedPercentage =>
  hasValue(stripsConsumedPercentage) ? `${stripsConsumedPercentage}%` : '-';

export const createProgressBarDisplay = stripsConsumedPercentage =>
  hasValue(stripsConsumedPercentage) ? (
    <ProgressBar
      fill={stripsConsumedPercentage}
      color={convertStripConsumptionToTrafficLightColor(
        stripsConsumedPercentage,
      )}
    />
  ) : (
    <Caption>{translate('stripDelivery.empty.stripsConsumed')}</Caption>
  );

export const StripStatusDetails = ({
  conditions,
  trafficLightStatus,
  hasLastDeliveryWithAlert = false,
}) => {
  const stripsConsumedPercentage = pathOr(
    null,
    ['consumption', 'percentConsumed'],
    conditions,
  );
  return (
    <StripStatusDetailsContainer>
      <SectionHeader title={translate('stripDelivery.statusDetails')} />
      <RenderIf validate={hasLastDeliveryWithAlert}>
        <StripStatusNotificationWrapperDiv>
          <NotificationBanner
            color={colors.carb}
            text={translate('stripDelivery.notifications.deliveredWithAlert')}
          />
        </StripStatusNotificationWrapperDiv>
      </RenderIf>
      <StripStatusDetailsInnerWrapper>
        <StripStatusDetailsInnerItemSmall>
          <StripStatusDetailsSubHeding>
            <LocalizedText textKey="stripDelivery.stripsConsumed" />
          </StripStatusDetailsSubHeding>

          <StripStatusDetailsInfo>
            {createStripsConsumedDisplay(stripsConsumedPercentage)}
          </StripStatusDetailsInfo>

          <StripStatusDetailsProgressBarWrapper>
            {createProgressBarDisplay(stripsConsumedPercentage)}
          </StripStatusDetailsProgressBarWrapper>
        </StripStatusDetailsInnerItemSmall>
        <StripStatusDetailsInnerItemLarge>
          <StripDeliveryAlert
            conditions={conditions}
            trafficLightStatus={trafficLightStatus}
          />
        </StripStatusDetailsInnerItemLarge>
      </StripStatusDetailsInnerWrapper>
    </StripStatusDetailsContainer>
  );
};
