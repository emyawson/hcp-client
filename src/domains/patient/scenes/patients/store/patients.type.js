import type { BasePatient, PatientStock } from 'src/services';

type GetPatientsAction = {
  type: 'GET_PATIENTS',
};
type SetPatientsAction = {
  type: 'SET_PATIENTS',
  payload: BasePatient[],
};

type GetPatientStockAction = {
  type: 'GET_PATIENT_STOCK',
  payload: PatientStock,
};

export type Action =
  | GetPatientsAction
  | SetPatientsAction
  | GetPatientStockAction;

export type State = {
  patientStock: number,
  patients: BasePatient[],
  isFetchingPatients: boolean,
};
