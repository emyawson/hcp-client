import React from 'react';
import { equals, or, not } from 'ramda';
import { GridItem, GridContainer } from 'src/components/grid-layout';

import {
  Card,
  CardCollapsable,
  Comment,
  IndicatorLabel,
  NotificationBanner,
} from 'src/components';
import { translate } from 'src/i18n';
import { RenderIf } from 'src/utils';
import { TRAFFIC_LIGHT_STATES } from 'src/core/strip-delivery/strip-delivery.constants';
import { colors } from 'src/core/styles';
import { WithPermissions } from 'src/utils/with-permissions/with-permissions.container';
import { PERMISSIONS } from 'src/core/permissions/permissions.constants';
import { ExpandedPatientStripStatusContainer } from 'src/domains/strip-management/widgets/patient-strip-status';

import {
  NotificationWrapperDiv,
  CenteredNotificationBanner,
} from './strip-delivery.style';

import { stripManagementInnerRoutes } from '../../routes';
import {
  ForceStatus,
  LostStrips,
  ManualDelivery,
  PrescriptionSummaryCardWithLoaderAndError,
  StripStatusDetails,
} from '../../components';

export const StripDelivery = ({
  nextDeliveryDate,
  trafficLightStatus,
  trafficLightStatusConditions,
  setDeliveryStatusRequest,
  patientId,
  forceTrafficStatus,
  frequency,
  stripModelId,
  stripModelName,
  patientStock,
  submitLostStripsRequest,
  submitManualDeliveryRequest,
  hasActivePrescription,
  hasStripDeliveryData,
  prescriptionType,
  quantity,
  period,
  getPrescriptionHasError,
  patientStripStock,
  hasLastDeliveryWithAlert,
  hasForcedStatusComment,
  trafficLightStatusComment,
  trafficLightStatusDateCalculated,
}) => (
  <GridContainer>
    <GridItem span="12">
      <RenderIf validate={hasActivePrescription}>
        <IndicatorLabel
          active
          marginDirection="bottom"
          text={translate('prescription.activeLabel')}
        />
      </RenderIf>
      <PrescriptionSummaryCardWithLoaderAndError
        patientStock={patientStripStock}
        active={hasActivePrescription}
        frequency={frequency}
        stripModel={stripModelName}
        nextDeliveryDate={nextDeliveryDate}
        prescriptionType={prescriptionType}
        quantity={quantity}
        period={period}
        hasError={getPrescriptionHasError}
        showLoader
      />
    </GridItem>

    <WithPermissions hasPermissions={[PERMISSIONS.STRIP_FORCE_STATUS]}>
      <RenderIf validate={hasForcedStatusComment}>
        <GridItem span="12">
          <Comment
            title={translate(
              'stripDelivery.comments.forceStatus.titleExpanded',
            )}
            message={trafficLightStatusComment}
            date={trafficLightStatusDateCalculated}
            isExpanded
          />
        </GridItem>
      </RenderIf>
    </WithPermissions>

    <ExpandedPatientStripStatusContainer
      createPrescriptionRoute={
        stripManagementInnerRoutes.prescriptionInfoByPatient
      }
    >
      <WithPermissions
        hasPermissions={[PERMISSIONS.STRIP_FORCE_STATUS]}
        onRender={() => null}
        onAccessDenied={() => (
          <React.Fragment>
            <RenderIf validate={hasForcedStatusComment}>
              <NotificationWrapperDiv>
                <Comment
                  message={trafficLightStatusComment}
                  title={translate('stripDelivery.comments.forceStatus.title')}
                  date={trafficLightStatusDateCalculated}
                />
              </NotificationWrapperDiv>
            </RenderIf>
            <RenderIf
              validate={equals(
                trafficLightStatus,
                TRAFFIC_LIGHT_STATES.DO_NOT_DELIVER,
              )}
            >
              <NotificationWrapperDiv>
                <CenteredNotificationBanner
                  color={colors.trafficRed}
                  text={translate('stripDelivery.notifications.doNotDeliver')}
                />
              </NotificationWrapperDiv>
            </RenderIf>
          </React.Fragment>
        )}
      />

      <StripStatusDetails
        conditions={trafficLightStatusConditions}
        trafficLightStatus={trafficLightStatus}
        hasLastDeliveryWithAlert={hasLastDeliveryWithAlert}
      />
      <WithPermissions hasPermissions={[PERMISSIONS.STRIP_FORCE_STATUS]}>
        <RenderIf
          validate={equals(
            trafficLightStatus,
            TRAFFIC_LIGHT_STATES.DO_NOT_DELIVER,
          )}
        >
          <NotificationWrapperDiv>
            <NotificationBanner
              color={colors.trafficRed}
              text={translate(
                'stripDelivery.notifications.forceStatusToDeliver',
              )}
            />
          </NotificationWrapperDiv>
        </RenderIf>
        <CardCollapsable
          cardStyles={['secondary']}
          textTransform="capitalize"
          title={translate('stripDelivery.forceStatus.title')}
          isDisabled={or(
            not(hasStripDeliveryData),
            equals(trafficLightStatus, TRAFFIC_LIGHT_STATES.DISABLED),
          )}
        >
          <ForceStatus
            currentStatus={trafficLightStatus}
            disabled={!hasStripDeliveryData}
            forceTrafficStatus={forceTrafficStatus}
            modelPath="stripDelivery.forceTrafficStatus"
            setDeliveryStatusRequest={setDeliveryStatusRequest}
            patientId={patientId}
          />
        </CardCollapsable>
      </WithPermissions>
    </ExpandedPatientStripStatusContainer>

    <GridItem span="6">
      <Card cardStyles={['secondary']}>
        <LostStrips
          submitLostStripsRequest={submitLostStripsRequest}
          patientId={patientId}
          stripModelId={stripModelId}
          patientStock={patientStripStock}
          disabled={!hasStripDeliveryData}
        />
      </Card>
    </GridItem>
    <GridItem span="6">
      <Card cardStyles={['secondary']}>
        <ManualDelivery
          submitManualDeliveryRequest={submitManualDeliveryRequest}
          stripModelId={stripModelId}
          patientId={patientId}
          disabled={!hasStripDeliveryData}
        />
      </Card>
    </GridItem>
  </GridContainer>
);
