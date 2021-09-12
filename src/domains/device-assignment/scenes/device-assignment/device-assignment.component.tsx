import { equals } from 'ramda';
import * as React from 'react';
import { Block, LoadingMessage, StepNavigation } from 'src/components';
import { transformStepItems } from 'src/components/step-navigation';
import { translate } from 'src/i18n';
import { RenderIf } from 'src/utils/render-if';

import { AssociationErrorType } from '../../../../core/index';
import { ConfirmAssignmentContainer } from '../confirm-assignment';
import { ConfirmAssignmentErrorContainer } from '../confirm-assignment-error';
import { ConfirmAssignmentSuccessContainer } from '../confirm-assignment-success';
import { ConfirmDeviceContainer } from '../confirm-device';
import { ConfirmDeviceErrorContainer } from '../confirm-device-error';
import { DeviceNotFoundErrorContainer } from '../device-not-found-error';
import { SelectPatientContainer } from '../select-patient';

import { DEVICE_ASSIGNMENT_STEP_CONFIG } from './device-assignment.constants';
import { DeviceAssignmentCard } from './device-assignment.style';
import { DeviceAssignmentProps } from './device-assignment.types';

export const DeviceAssignmentContentComponent = ({
  associationError,
  onCancel,
  dataIsUnavailable,
  hasConfirmedDevice,
  isComplete,
  selectedPatient,
  updatingError,
}) => (
  <DeviceAssignmentCard>
    <RenderIf validate={dataIsUnavailable}>
      <LoadingMessage
        minHeight="400px"
        text={translate('requestsLoading.getDeviceAssociation')}
        infinite
      />
    </RenderIf>
    <RenderIf validate={!dataIsUnavailable}>
      <RenderIf validate={!hasConfirmedDevice}>
        <RenderIf validate={!associationError}>
          <ConfirmDeviceContainer onCancel={onCancel} />
        </RenderIf>
        <RenderIf
          validate={equals(
            associationError,
            AssociationErrorType.DEVICE_ALREADY_ASSIGNED_ERROR_KEY,
          )}
        >
          <ConfirmDeviceErrorContainer />
        </RenderIf>
        <RenderIf
          validate={equals(
            associationError,
            AssociationErrorType.INVALID_ASSOCIATION_ID_ERROR_KEY,
          )}
        >
          <DeviceNotFoundErrorContainer />
        </RenderIf>
      </RenderIf>
      <RenderIf validate={hasConfirmedDevice}>
        <RenderIf validate={updatingError}>
          <ConfirmAssignmentErrorContainer />
        </RenderIf>

        <RenderIf validate={!updatingError}>
          <RenderIf validate={!selectedPatient}>
            <SelectPatientContainer />
          </RenderIf>

          <RenderIf validate={selectedPatient && !isComplete}>
            <ConfirmAssignmentContainer onCancel={onCancel} />
          </RenderIf>

          <RenderIf validate={selectedPatient && isComplete}>
            <ConfirmAssignmentSuccessContainer />
          </RenderIf>
        </RenderIf>
      </RenderIf>
    </RenderIf>
  </DeviceAssignmentCard>
);

export const DeviceAssignmentComponent: React.StatelessComponent<
  DeviceAssignmentProps
> = ({
  associationError,
  onCancel,
  currentStep,
  dataIsUnavailable,
  hasConfirmedDevice,
  isComplete,
  selectedPatient,
  updatingError,
}) => (
  <React.Fragment>
    <StepNavigation
      currentStep={currentStep}
      steps={transformStepItems(currentStep, DEVICE_ASSIGNMENT_STEP_CONFIG)}
    />
    <Block mt={4}>
      {DeviceAssignmentContentComponent({
        associationError,
        onCancel,
        dataIsUnavailable,
        hasConfirmedDevice,
        isComplete,
        selectedPatient,
        updatingError,
      })}
    </Block>
  </React.Fragment>
);
