import { createAction, createPayloadAction } from '../../app/store/app.actions';
import {
  GetDeviceAssociationResponse,
  UpdateDeviceAssociationParams,
  UpdateDeviceAssociationResponse,
} from '../../services/index';

import {
  AlreadyAssignedPatient,
  CancelAssignmentAction,
  CancelConfirmedDeviceAction,
  ConfirmAssignmentAction,
  ConfirmDeviceAction,
  DeselectPatientAction,
  DeviceAssignmentActionType,
  DoneAssignmentAction,
  GetAlreadyAssignedPatientErrorAction,
  GetAlreadyAssignedPatientStartAction,
  GetAlreadyAssignedPatientSuccessAction,
  GetDeviceAssociationErrorAction,
  GetDeviceAssociationStartAction,
  GetDeviceAssociationSuccessAction,
  GetOrUpdateDeviceAssociationErrorPayload,
  PatientGetParams,
  PerformPatientSearchAction,
  ResetAssignmentAction,
  SelectPatientAction,
  ToggleCreatePatientViewAction,
  UpdateDeviceAssociationErrorAction,
  UpdateDeviceAssociationStartAction,
  UpdateDeviceAssociationSuccessAction,
} from './device-assignment.types';

export const confirmDevice = (): ConfirmDeviceAction =>
  createAction(DeviceAssignmentActionType.CONFIRM_DEVICE);

export const cancelConfirmedDevice = (): CancelConfirmedDeviceAction =>
  createAction(DeviceAssignmentActionType.CANCEL_CONFIRMED_DEVICE);

export const cancelDeviceAssignment = (): CancelAssignmentAction =>
  createAction(DeviceAssignmentActionType.CANCEL_ASSIGNMENT);

export const resetDeviceAssignment = (): ResetAssignmentAction =>
  createAction(DeviceAssignmentActionType.RESET_ASSIGNMENT);

export const doneDeviceAssignment = (): DoneAssignmentAction =>
  createAction(DeviceAssignmentActionType.DONE_ASSIGNMENT);

export const performPatientSearch = (
  patientId: number,
  name: string,
): PerformPatientSearchAction =>
  createPayloadAction(DeviceAssignmentActionType.PERFORM_PATIENT_SEARCH, {
    patientId,
  });

export const selectDeviceAssignmentPatient = (
  patientId: number,
): SelectPatientAction =>
  createPayloadAction(DeviceAssignmentActionType.SELECT_PATIENT, patientId);

export const deselectDeviceAssignmentPatient = (): DeselectPatientAction =>
  createAction(DeviceAssignmentActionType.DESELECT_PATIENT);

export const confirmDeviceAssignment = (): ConfirmAssignmentAction =>
  createAction(DeviceAssignmentActionType.CONFIRM_ASSIGNMENT);

export const getDeviceAssociationStart = (
  associationId: string,
): GetDeviceAssociationStartAction =>
  createPayloadAction(DeviceAssignmentActionType.GET_DEVICE_ASSOCIATION_START, {
    associationId,
  });

export const getDeviceAssociationError = (
  payload: GetOrUpdateDeviceAssociationErrorPayload,
): GetDeviceAssociationErrorAction =>
  createPayloadAction(
    DeviceAssignmentActionType.GET_DEVICE_ASSOCIATION_ERROR,
    payload,
  );

export const getDeviceAssociationSuccess = (
  payload: GetDeviceAssociationResponse,
): GetDeviceAssociationSuccessAction =>
  createPayloadAction(
    DeviceAssignmentActionType.GET_DEVICE_ASSOCIATION_SUCCESS,
    payload,
  );

export const updateDeviceAssociationStart = (
  payload: UpdateDeviceAssociationParams,
): UpdateDeviceAssociationStartAction =>
  createPayloadAction(
    DeviceAssignmentActionType.UPDATE_DEVICE_ASSOCIATION_START,
    payload,
  );

export const updateDeviceAssociationError = (
  payload: GetOrUpdateDeviceAssociationErrorPayload,
): UpdateDeviceAssociationErrorAction =>
  createPayloadAction(
    DeviceAssignmentActionType.UPDATE_DEVICE_ASSOCIATION_ERROR,
    payload,
  );

export const updateDeviceAssociationSuccess = (
  payload: UpdateDeviceAssociationResponse,
): UpdateDeviceAssociationSuccessAction =>
  createPayloadAction(
    DeviceAssignmentActionType.UPDATE_DEVICE_ASSOCIATION_SUCCESS,
    payload,
  );

export const getAlreadyAssignedPatientStart = (
  payload: PatientGetParams,
): GetAlreadyAssignedPatientStartAction =>
  createPayloadAction(
    DeviceAssignmentActionType.GET_ALREADY_ASSIGNED_PATIENT_START,
    payload,
  );

export const getAlreadyAssignedPatientError = (): GetAlreadyAssignedPatientErrorAction =>
  createAction(DeviceAssignmentActionType.GET_ALREADY_ASSIGNED_PATIENT_ERROR);

export const getAlreadyAssignedPatientSuccess = (
  payload: AlreadyAssignedPatient,
): GetAlreadyAssignedPatientSuccessAction =>
  createPayloadAction(
    DeviceAssignmentActionType.GET_ALREADY_ASSIGNED_PATIENT_SUCCESS,
    payload,
  );
export const toggleCreatePatientView = (): ToggleCreatePatientViewAction =>
  createAction(DeviceAssignmentActionType.TOGGLE_CREATE_PATIENT_VIEW);
