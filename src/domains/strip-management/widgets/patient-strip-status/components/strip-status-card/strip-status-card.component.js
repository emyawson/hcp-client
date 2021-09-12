import React from 'react';

import {
  Button,
  LocalizedText,
  withLoaderErrorOnTimeout,
} from 'src/components';
import { translate } from 'src/i18n';
import { hasValue, RenderIf } from 'src/utils';
import { TrafficLight } from 'src/domains/strip-management/components';

import {
  StripStatusTrafficLight,
  StripStatusCardContentContainer,
  StripStatusCardLineItem,
  StripStatusCardLineItemWrapper,
  StripStatusCardButtonsDiv,
} from './strip-status-card.style';
import {
  createStripsToDeliverStr,
  createNextDeliveryStr,
} from './strip-status-card.utils';

// Display a loader while awaiting the delivery data
const loaderOptions = {
  loaderProps: {
    flexibleHeight: true,
    infinite: true,
    minHeight: 150,
  },
  validators: {
    nextDeliveryDate: hasValue,
  },
};
// Fall back to empty card content if loading fails
const errorOptions = {
  ErrorComponent: StripStatusCardContentContainer,
};

const StripStatusContentWithLoaderAndError = withLoaderErrorOnTimeout({
  errorOptions,
  loaderOptions,
})(StripStatusCardContentContainer);

const createLastCollectedStr = lastCollectedDate =>
  lastCollectedDate || translate('stripDelivery.empty.lastCollectedDate');

export const StripStatusCard = ({
  numberOfTubesToDeliver,
  lastCollectedDate,
  nextDeliveryDate,
  trafficLightStatus,
  patientId,
  hasError = false,
  hasActivePrescription = false,
  onUpdateStripStatus,
  deliverStripsToPatient,
  stripsCanBeDelivered,
}) => (
  <StripStatusContentWithLoaderAndError
    nextDeliveryDate={nextDeliveryDate}
    numberOfTubesToDeliver={numberOfTubesToDeliver}
    hasError={hasError}
  >
    <StripStatusTrafficLight>
      <TrafficLight status={trafficLightStatus} />
    </StripStatusTrafficLight>
    <StripStatusCardLineItemWrapper cardHasButtons={hasActivePrescription}>
      <StripStatusCardLineItem>
        <LocalizedText textKey="stripDelivery.patientStatusDeliver" />
        <span> {createStripsToDeliverStr(numberOfTubesToDeliver)} </span>
      </StripStatusCardLineItem>
      <StripStatusCardLineItem>
        <LocalizedText textKey="stripDelivery.lastCollectedDate" />
        <span> {createLastCollectedStr(lastCollectedDate)} </span>
      </StripStatusCardLineItem>
      <StripStatusCardLineItem>
        <LocalizedText textKey="stripDelivery.nextDeliveryDate" />
        <span> {createNextDeliveryStr(nextDeliveryDate)} </span>
      </StripStatusCardLineItem>
    </StripStatusCardLineItemWrapper>
    <StripStatusCardButtonsDiv>
      <RenderIf validate={hasActivePrescription}>
        <Button
          label={translate('stripDelivery.update')}
          onClick={onUpdateStripStatus}
        />
        <Button
          disabled={!stripsCanBeDelivered}
          label={translate('stripDelivery.deliverCta')}
          onClick={deliverStripsToPatient}
        />
      </RenderIf>
    </StripStatusCardButtonsDiv>
  </StripStatusContentWithLoaderAndError>
);
