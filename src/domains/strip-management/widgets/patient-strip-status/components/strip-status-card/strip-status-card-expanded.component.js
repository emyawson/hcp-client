import React from 'react';

import { translate } from 'src/i18n';
import {
  Button,
  Caption,
  Card,
  Link,
  LocalizedText,
  withLoaderErrorOnTimeout,
  GridItem,
  GridItemWithoutPadding,
  GridContainerCard,
} from 'src/components';
import { hasValue, RenderIf } from 'src/utils';
import { WithPermissions } from 'src/utils/with-permissions/with-permissions.container';
import { PERMISSIONS } from 'src/core/permissions/permissions.constants';
import { TrafficLight } from 'src/domains/strip-management/components';

import {
  StripStatusLoadableContentDiv,
  StripStatusCardLineItemDiv,
  StripStatusSmallCardSeparatorDiv,
  CenteredFlexRowDiv,
  CenteredFlexRowWithMarginDiv,
  StripStatusContentWrapperDiv,
  StripStatusHeadlinesDiv,
  StripStatusHeadline,
  StripStatusButtonsDiv,
  StripStatusCardLineItemTitle,
  InnerWrapperDiv,
} from './strip-status-card-expanded.style';
import {
  createStripsToDeliverStr,
  createNextDeliveryStr,
} from './strip-status-card.utils';

// Display loading spinner while awaiting delivery info
const loaderOptions = {
  loaderProps: {
    flexibleHeight: true,
    infinite: true,
    minHeight: 300,
    size: 120,
    text: translate('stripDelivery.loading'),
  },
  validators: {
    nextDeliveryDate: hasValue,
  },
};
// If loading fails, fall back to empty content container
const errorOptions = {
  ErrorComponent: StripStatusLoadableContentDiv,
};

const StripStatusCardContentWithLoader = withLoaderErrorOnTimeout({
  errorOptions,
  loaderOptions,
})(StripStatusLoadableContentDiv);

export const StripStatusCardExpanded = ({
  numberOfTubesToDeliver,
  lastCollectedDate,
  nextDeliveryDate,
  trafficLightStatus,
  patientId,
  hasActivePrescription = false,
  stripsCanBeDelivered = false,
  onUpdateStripStatus,
  deliverStripsToPatient,
  createPrescriptionRoute = '',
  hasError = false,
  displayOnly = false,
  hideNextDeliveryDate = false,
  children,
}) => (
  <GridItem span="12">
    <InnerWrapperDiv>
      <GridContainerCard cardStyles={['secondary']}>
        <GridItemWithoutPadding span="6">
          <Card cardStyles={['secondary']}>
            <StripStatusContentWrapperDiv>
              <StripStatusHeadlinesDiv>
                <StripStatusHeadline>
                  <LocalizedText textKey="stripDelivery.titleExpanded" />
                </StripStatusHeadline>
                <Caption>
                  <LocalizedText textKey="stripDelivery.lastCollectedDate" />
                  <span> {lastCollectedDate} </span>
                </Caption>
              </StripStatusHeadlinesDiv>

              <StripStatusCardContentWithLoader
                numberOfStripsToDeliver={numberOfTubesToDeliver}
                nextDeliveryDate={nextDeliveryDate}
                hasError={hasError}
              >
                <CenteredFlexRowWithMarginDiv>
                  <TrafficLight status={trafficLightStatus} size={132} border />
                </CenteredFlexRowWithMarginDiv>
                <CenteredFlexRowDiv>
                  <StripStatusCardLineItemDiv>
                    <StripStatusCardLineItemTitle>
                      {createStripsToDeliverStr(numberOfTubesToDeliver)}
                    </StripStatusCardLineItemTitle>
                    <Caption>
                      <LocalizedText textKey="stripDelivery.patientStatusDeliverSmall" />
                    </Caption>
                  </StripStatusCardLineItemDiv>
                  <RenderIf validate={!hideNextDeliveryDate}>
                    <StripStatusSmallCardSeparatorDiv />
                    <StripStatusCardLineItemDiv>
                      <StripStatusCardLineItemTitle>
                        {createNextDeliveryStr(nextDeliveryDate)}
                      </StripStatusCardLineItemTitle>
                      <Caption>
                        <LocalizedText textKey="stripDelivery.nextDeliveryDateSmall" />
                      </Caption>
                    </StripStatusCardLineItemDiv>
                  </RenderIf>
                </CenteredFlexRowDiv>
                <RenderIf validate={!displayOnly}>
                  <StripStatusButtonsDiv>
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
                    <WithPermissions
                      hasPermissions={[PERMISSIONS.STRIP_PRESCRIPTIONS]}
                    >
                      <RenderIf validate={!hasActivePrescription}>
                        <Link to={createPrescriptionRoute}>
                          <Button
                            label={translate(
                              'stripDelivery.createPrescription',
                            )}
                          />
                        </Link>
                      </RenderIf>
                    </WithPermissions>
                  </StripStatusButtonsDiv>
                </RenderIf>
              </StripStatusCardContentWithLoader>
            </StripStatusContentWrapperDiv>
          </Card>
        </GridItemWithoutPadding>
        <GridItemWithoutPadding span="6">
          <Card>{children}</Card>
        </GridItemWithoutPadding>
      </GridContainerCard>
    </InnerWrapperDiv>
  </GridItem>
);
