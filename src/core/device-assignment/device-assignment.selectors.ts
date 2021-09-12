import { find, path, propEq, propOr } from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';
import { getSearchResults } from 'src/core/patient-search/patient-search.selectors';

import {
  AlreadyAssignedPatient,
  DeviceAssignmentState,
} from './device-assignment.types';

export const selectDeviceAssignmentState = path(['deviceAssignment']);

export const selectHasConfirmedDevice = createSelector(
  [selectDeviceAssignmentState],
  state => propOr(false, 'hasConfirmedDevice', state),
);

export const selectCurrentStep = createSelector(
  [selectDeviceAssignmentState],
  (state: DeviceAssignmentState) => {
    if (
      state.isFetchingAssociation ||
      (!state.deviceInfo && !state.associationError)
    ) {
      return -1;
    } else if (!state.hasConfirmedDevice) {
      return 0;
    } else if (!state.selectedPatientId) {
      return 1;
    } else {
      return 2;
    }
  },
);

export const selectDeviceAssignmentUpdatingError = createSelector(
  [selectDeviceAssignmentState],
  state => propOr('', 'updatingError', state),
);

export const selectDeviceAssignmentAssociationError = createSelector(
  [selectDeviceAssignmentState],
  state => propOr('', 'associationError', state),
);

export const selectDeviceAssignmentAssociationId = createSelector(
  [selectDeviceAssignmentState],
  state => propOr('', 'associationId', state),
);

export const selectDeviceAssignmentAssociatedPatientId = createSelector(
  [selectDeviceAssignmentState],
  state => propOr('', 'associatedPatientId', state),
);

export const selectDeviceAssignmentAssociatedPatientName = createSelector(
  [selectDeviceAssignmentState],
  state => {
    const patient: AlreadyAssignedPatient = propOr(
      '',
      'associatedPatient',
      state,
    );
    return patient
      ? [patient.firstName, patient.surName, patient.surName2].join(' ').trim()
      : void 0;
  },
);

export const selectDeviceAssignmentSelectedPatientId = createSelector(
  [selectDeviceAssignmentState],
  state => propOr('', 'selectedPatientId', state),
);

export const selectDeviceAssignmentSelectedPatient = createSelector(
  selectDeviceAssignmentSelectedPatientId,
  getSearchResults,
  (id, patients) => find(propEq('id', id))(patients),
);

export const selectDeviceAssignmentDeviceInfo = createSelector(
  [selectDeviceAssignmentState],
  state => propOr({}, 'deviceInfo', state),
);

export const selectIsFetchingAssociation = createSelector(
  [selectDeviceAssignmentState],
  state => propOr({}, 'isFetchingAssociation', state),
);

export const selectIsComplete = createSelector(
  [selectDeviceAssignmentState],
  state => propOr({}, 'isComplete', state),
);

export const selectIsUpdatingAssociation = createSelector(
  [selectDeviceAssignmentState],
  state => propOr({}, 'isUpdatingAssociation', state),
);

export const selectShouldDisplayCreatePatientView = createSelector(
  [selectDeviceAssignmentState],
  state => propOr(false, 'displayCreatePatientView', state),
);

export const selectDeviceAssignmentUpdateRequestParams = createStructuredSelector(
  {
    associationId: selectDeviceAssignmentAssociationId,
    patientId: selectDeviceAssignmentSelectedPatientId,
  },
);
