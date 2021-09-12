import { PayloadAction } from 'src/app/store/app.types';
import {
  CreatePatientErrorResponse,
  CreatePatientParams as CreatePatientServiceParams,
  CreatePatientResponse,
} from 'src/services/patient/create-patient/create-patient.types';

export enum CreatePatientActionType {
  CREATE_PATIENT_START = 'CREATE_PATIENT_START',
  CREATE_PATIENT_SUCCESS = 'CREATE_PATIENT_SUCCESS',
  CREATE_PATIENT_ERROR = 'CREATE_PATIENT_ERROR',
}

export type CreatePatientParams = CreatePatientServiceParams;
export type CreatePatientSuccessPayload = CreatePatientResponse;
export type CreatePatientErrorPayload = CreatePatientErrorResponse;

export type CreatePatientStartAction = PayloadAction<
  CreatePatientActionType.CREATE_PATIENT_START,
  CreatePatientParams
>;
export type CreatePatientSuccessAction = PayloadAction<
  CreatePatientActionType.CREATE_PATIENT_SUCCESS,
  CreatePatientSuccessPayload
>;
export type CreatePatientErrorAction = PayloadAction<
  CreatePatientActionType.CREATE_PATIENT_ERROR,
  CreatePatientErrorPayload
>;

export type CreatePatientActions =
  | CreatePatientStartAction
  | CreatePatientSuccessAction
  | CreatePatientErrorAction;

export type CreatePatientState = {
  profileType: string;
};
