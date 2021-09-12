import {
  DeviceInfo,
  GetDeviceAssociationParams,
  GetDeviceAssociationResponse,
} from 'src/services/device-assignment/get-device-association';
import {
  UpdateDeviceAssociationParams,
  UpdateDeviceAssociationResponse,
} from 'src/services/device-assignment/update-device-association';

import { Action, PayloadAction } from '../../app/store/app.types';
import { Diff } from '../../utils';

export enum DeviceAssignmentActionType {
  CONFIRM_DEVICE = 'CONFIRM_DEVICE',
  CANCEL_CONFIRMED_DEVICE = 'CANCEL_CONFIRMED_DEVICE',
  SELECT_PATIENT = 'SELECT_PATIENT',
  DESELECT_PATIENT = 'DESELECT_PATIENT',
  CONFIRM_ASSIGNMENT = 'CONFIRM_ASSIGNMENT',
  DONE_ASSIGNMENT = 'DONE_ASSIGNMENT',
  CANCEL_ASSIGNMENT = 'CANCEL_ASSIGNMENT',
  PERFORM_PATIENT_SEARCH = 'PERFORM_PATIENT_SEARCH',
  RESET_ASSIGNMENT = 'RESET_ASSIGNMENT',
  TOGGLE_CREATE_PATIENT_VIEW = 'TOGGLE_CREATE_PATIENT_VIEW',

  GET_DEVICE_ASSOCIATION_START = 'GET_DEVICE_ASSOCIATION_START',
  GET_DEVICE_ASSOCIATION_ERROR = 'GET_DEVICE_ASSOCIATION_ERROR',
  GET_DEVICE_ASSOCIATION_SUCCESS = 'GET_DEVICE_ASSOCIATION_SUCCESS',
  UPDATE_DEVICE_ASSOCIATION_START = 'UPDATE_DEVICE_ASSOCIATION_START',
  UPDATE_DEVICE_ASSOCIATION_ERROR = 'UPDATE_DEVICE_ASSOCIATION_ERROR',
  UPDATE_DEVICE_ASSOCIATION_SUCCESS = 'UPDATE_DEVICE_ASSOCIATION_SUCCESS',
  GET_ALREADY_ASSIGNED_PATIENT_START = 'GET_ALREADY_ASSIGNED_PATIENT_START',
  GET_ALREADY_ASSIGNED_PATIENT_ERROR = 'GET_ALREADY_ASSIGNED_PATIENT_ERROR',
  GET_ALREADY_ASSIGNED_PATIENT_SUCCESS = 'GET_ALREADY_ASSIGNED_PATIENT_SUCCESS',
}

export type PatientSearchParams = {
  patientId?: number;
  name?: string;
};

export enum AssociationErrorType {
  INVALID_ASSOCIATION_ID_ERROR_KEY = 'INVALID_ASSOCIATION_ID_ERROR_KEY',
  DEVICE_ALREADY_ASSIGNED_ERROR_KEY = 'DEVICE_ALREADY_ASSIGNED_ERROR_KEY',
  ASSOCIATION_FAILED = 'ASSOCIATION_FAILED',
}

export type DeviceAssignmentState = {
  readonly isComplete: boolean;
  readonly associationId?: string;
  readonly hasConfirmedDevice: boolean;
  readonly isFetchingAssociation: boolean;
  readonly isUpdatingAssociation: boolean;
  readonly associatedPatientId?: number;
  readonly associatedPatient?: AlreadyAssignedPatient;
  readonly selectedPatientId?: number;
  readonly deviceInfo?: DeviceInfo;
  readonly associationError?: AssociationErrorType;
  readonly updatingError?: boolean;
  readonly displayCreatePatientView: boolean;
};

export type PatientGetParams = {
  patientId: number;
};

export type AlreadyAssignedPatient = {
  id: number;
  healthCareSystemId: string;
  firstName: string;
  surName: string;
  surName2: string;
  dateOfBirth: string;
  diabetesType: string;
  treatmentName: string;
  centerName: string;
  timezone: string;
  devices: DeviceInfo[];
};

export type GetOrUpdateDeviceAssociationErrorPayload = AssociationErrorType;

export type GetDeviceAssociationStartAction = PayloadAction<
  DeviceAssignmentActionType.GET_DEVICE_ASSOCIATION_START,
  GetDeviceAssociationParams
>;
export type GetDeviceAssociationSuccessAction = PayloadAction<
  DeviceAssignmentActionType.GET_DEVICE_ASSOCIATION_SUCCESS,
  GetDeviceAssociationResponse
>;
export type GetDeviceAssociationErrorAction = PayloadAction<
  DeviceAssignmentActionType.GET_DEVICE_ASSOCIATION_ERROR,
  GetOrUpdateDeviceAssociationErrorPayload
>;

export type UpdateDeviceAssociationStartAction = PayloadAction<
  DeviceAssignmentActionType.UPDATE_DEVICE_ASSOCIATION_START,
  UpdateDeviceAssociationParams
>;
export type UpdateDeviceAssociationSuccessAction = PayloadAction<
  DeviceAssignmentActionType.UPDATE_DEVICE_ASSOCIATION_SUCCESS,
  UpdateDeviceAssociationResponse
>;
export type UpdateDeviceAssociationErrorAction = PayloadAction<
  DeviceAssignmentActionType.UPDATE_DEVICE_ASSOCIATION_ERROR,
  GetOrUpdateDeviceAssociationErrorPayload
>;
export type ToggleCreatePatientViewAction = Action<
  DeviceAssignmentActionType.TOGGLE_CREATE_PATIENT_VIEW
>;

export type GetAlreadyAssignedPatientStartAction = PayloadAction<
  DeviceAssignmentActionType.GET_ALREADY_ASSIGNED_PATIENT_START,
  PatientGetParams
>;

export type GetAlreadyAssignedPatientSuccessAction = PayloadAction<
  DeviceAssignmentActionType.GET_ALREADY_ASSIGNED_PATIENT_SUCCESS,
  AlreadyAssignedPatient
>;

export type GetAlreadyAssignedPatientErrorAction = Action<
  DeviceAssignmentActionType.GET_ALREADY_ASSIGNED_PATIENT_ERROR
>;

export type ConfirmDeviceAction = Action<
  DeviceAssignmentActionType.CONFIRM_DEVICE
>;

export type CancelConfirmedDeviceAction = Action<
  DeviceAssignmentActionType.CANCEL_CONFIRMED_DEVICE
>;

export type PerformPatientSearchAction = PayloadAction<
  DeviceAssignmentActionType.PERFORM_PATIENT_SEARCH,
  PatientSearchParams
>;

export type SelectPatientAction = PayloadAction<
  DeviceAssignmentActionType.SELECT_PATIENT,
  number
>;

export type DeselectPatientAction = Action<
  DeviceAssignmentActionType.DESELECT_PATIENT
>;

export type ConfirmAssignmentAction = Action<
  DeviceAssignmentActionType.CONFIRM_ASSIGNMENT
>;

export type DoneAssignmentAction = Action<
  DeviceAssignmentActionType.DONE_ASSIGNMENT
>;

export type CancelAssignmentAction = Action<
  DeviceAssignmentActionType.CANCEL_ASSIGNMENT
>;

export type ResetAssignmentAction = Action<
  DeviceAssignmentActionType.RESET_ASSIGNMENT
>;

export type DeviceAssignmentEpicOnlyActions =
  | GetAlreadyAssignedPatientStartAction
  | GetAlreadyAssignedPatientErrorAction
  | PerformPatientSearchAction
  | ConfirmAssignmentAction
  | CancelAssignmentAction
  | DoneAssignmentAction;

export type DeviceAssignmentActions =
  | GetDeviceAssociationStartAction
  | GetDeviceAssociationSuccessAction
  | GetDeviceAssociationErrorAction
  | UpdateDeviceAssociationStartAction
  | UpdateDeviceAssociationSuccessAction
  | UpdateDeviceAssociationErrorAction
  | GetAlreadyAssignedPatientStartAction
  | GetAlreadyAssignedPatientSuccessAction
  | GetAlreadyAssignedPatientErrorAction
  | CancelConfirmedDeviceAction
  | ConfirmDeviceAction
  | PerformPatientSearchAction
  | SelectPatientAction
  | DeselectPatientAction
  | ConfirmAssignmentAction
  | CancelAssignmentAction
  | ResetAssignmentAction
  | DoneAssignmentAction
  | ToggleCreatePatientViewAction;

export type DeviceAssignmentReducerActions = Diff<
  DeviceAssignmentActions,
  DeviceAssignmentEpicOnlyActions
>;
