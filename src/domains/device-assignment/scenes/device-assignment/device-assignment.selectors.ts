import { propOr } from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';

import {
  DeviceAssignmentState,
  selectCurrentStep,
  selectDeviceAssignmentAssociatedPatientId,
  selectDeviceAssignmentAssociatedPatientName,
  selectDeviceAssignmentAssociationError,
  selectDeviceAssignmentDeviceInfo,
  selectDeviceAssignmentSelectedPatient,
  selectDeviceAssignmentUpdatingError,
  selectHasConfirmedDevice,
  selectIsComplete,
  selectIsFetchingAssociation,
  selectIsUpdatingAssociation,
  selectShouldDisplayCreatePatientView,
} from 'src/core';
import { selectHomeCountry } from 'src/core/user/user.selectors';

import { getSearchResults } from 'src/core/patient-search';

import {
  DEVICE_ASSIGNMENT_SUPPORT_CONFIG,
  DEVICE_ASSIGNMENT_SUPPORT_DEFAULT,
} from './device-assignment.constants';
import { DeviceAssignmentBaseProps } from './device-assignment.types';

const selectDataIsUnavailable = createSelector(
  selectIsFetchingAssociation,
  selectDeviceAssignmentDeviceInfo,
  selectDeviceAssignmentAssociationError,
  (isFetchingAssociationInfo, deviceInfo, associationError) =>
    (isFetchingAssociationInfo || !deviceInfo) && !associationError,
);

export const deviceAssignmentConnector = createStructuredSelector<
  DeviceAssignmentState,
  DeviceAssignmentBaseProps
>({
  isUpdatingAssociation: selectIsUpdatingAssociation,
  isComplete: selectIsComplete,
  hasConfirmedDevice: selectHasConfirmedDevice,
  deviceInfo: selectDeviceAssignmentDeviceInfo,
  associatedPatientId: selectDeviceAssignmentAssociatedPatientId,
  associatedPatientName: selectDeviceAssignmentAssociatedPatientName,
  selectedPatient: selectDeviceAssignmentSelectedPatient,
  currentStep: selectCurrentStep,
  dataIsUnavailable: selectDataIsUnavailable,
  associationError: selectDeviceAssignmentAssociationError,
  updatingError: selectDeviceAssignmentUpdatingError,
  shouldDisplayCreatePatientView: selectShouldDisplayCreatePatientView,
});

export const selectPatientConnector = createStructuredSelector({
  searchResults: getSearchResults,
});

export const selectPatientForDeviceAssignmentConnector = state => ({
  ...deviceAssignmentConnector(state),
  ...selectPatientConnector(state),
});

export const selectDeviceAsssignmentContactInfo = createSelector(
  selectHomeCountry,
  country =>
    propOr(DEVICE_ASSIGNMENT_SUPPORT_DEFAULT, country)(
      DEVICE_ASSIGNMENT_SUPPORT_CONFIG,
    ),
);

export const selectDeviceAsssignmentPhone = createSelector(
  selectDeviceAsssignmentContactInfo,
  contactInfo => propOr('', 'phone')(contactInfo),
);

export const selectDeviceAsssignmentEmail = createSelector(
  selectDeviceAsssignmentContactInfo,
  contactInfo => propOr('', 'email')(contactInfo),
);

export const deviceAssignmentContactInfoConnector = createStructuredSelector({
  email: selectDeviceAsssignmentEmail,
  phone: selectDeviceAsssignmentPhone,
});

export const deviceAssignmentErrorConnector = state => ({
  ...deviceAssignmentConnector(state),
  ...deviceAssignmentContactInfoConnector(state),
});
