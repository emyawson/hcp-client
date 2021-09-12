import { createPayloadAction } from 'src/app/store/app.actions';

import {
  CreatePatientActionType,
  CreatePatientErrorAction,
  CreatePatientErrorPayload,
  CreatePatientParams,
  CreatePatientStartAction,
  CreatePatientSuccessAction,
  CreatePatientSuccessPayload,
} from './create-patient.types';

export const createPatientStart = (
  payload: CreatePatientParams,
): CreatePatientStartAction =>
  createPayloadAction(CreatePatientActionType.CREATE_PATIENT_START, payload);

export const createPatientSuccess = (
  payload: CreatePatientSuccessPayload,
): CreatePatientSuccessAction =>
  createPayloadAction(CreatePatientActionType.CREATE_PATIENT_SUCCESS, payload);

export const createPatientError = (
  payload: CreatePatientErrorPayload,
): CreatePatientErrorAction =>
  createPayloadAction(CreatePatientActionType.CREATE_PATIENT_ERROR, payload);
