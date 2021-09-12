import { dissoc, not } from 'ramda';

import { ensureNever } from 'src/utils';

import {
  DeviceAssignmentActionType,
  DeviceAssignmentReducerActions,
  DeviceAssignmentState,
} from './device-assignment.types';

export const INITIAL_DEVICE_ASSIGNMENT_STATE: DeviceAssignmentState = {
  isComplete: false,
  associationId: void 0,
  hasConfirmedDevice: false,
  deviceInfo: void 0,
  associatedPatientId: void 0,
  associatedPatient: void 0,
  selectedPatientId: void 0,
  displayCreatePatientView: false,

  isFetchingAssociation: false,
  isUpdatingAssociation: false,
  associationError: void 0,
  updatingError: void 0,
};

export const deviceAssignmentReducer = (
  state = INITIAL_DEVICE_ASSIGNMENT_STATE,
  action: DeviceAssignmentReducerActions,
): DeviceAssignmentState => {
  switch (action.type) {
    case DeviceAssignmentActionType.SELECT_PATIENT:
      return {
        ...state,
        selectedPatientId: action.payload,
      };
    case DeviceAssignmentActionType.DESELECT_PATIENT:
      return dissoc('selectedPatientId', state);
    case DeviceAssignmentActionType.GET_DEVICE_ASSOCIATION_START:
      return {
        ...state,
        isFetchingAssociation: true,
        associationId: action.payload.associationId,
      };
    case DeviceAssignmentActionType.GET_DEVICE_ASSOCIATION_SUCCESS:
      return {
        ...state,
        associationId: action.payload.associationId,
        associatedPatientId: action.payload.patientId,
        deviceInfo: action.payload.deviceInfo,
        isFetchingAssociation: false,
      };
    case DeviceAssignmentActionType.GET_DEVICE_ASSOCIATION_ERROR:
      return {
        ...state,
        associationError: action.payload,
      };
    case DeviceAssignmentActionType.UPDATE_DEVICE_ASSOCIATION_START:
      return {
        ...state,
        isUpdatingAssociation: true,
      };
    case DeviceAssignmentActionType.UPDATE_DEVICE_ASSOCIATION_ERROR:
      return {
        ...state,
        updatingError: true,
        isUpdatingAssociation: false,
      };
    case DeviceAssignmentActionType.UPDATE_DEVICE_ASSOCIATION_SUCCESS:
      return {
        ...state,
        isUpdatingAssociation: false,
        isComplete: true,
      };
    case DeviceAssignmentActionType.GET_ALREADY_ASSIGNED_PATIENT_SUCCESS:
      return {
        ...state,
        associatedPatient: action.payload,
      };
    case DeviceAssignmentActionType.RESET_ASSIGNMENT:
      return INITIAL_DEVICE_ASSIGNMENT_STATE;
    case DeviceAssignmentActionType.CONFIRM_DEVICE:
      return {
        ...state,
        hasConfirmedDevice: true,
      };
    case DeviceAssignmentActionType.TOGGLE_CREATE_PATIENT_VIEW:
      return {
        ...state,
        displayCreatePatientView: not(state.displayCreatePatientView),
      };
    case DeviceAssignmentActionType.CANCEL_CONFIRMED_DEVICE:
      return {
        ...state,
        hasConfirmedDevice: false,
      };
    default:
      ensureNever(action);
      return state;
  }
};
