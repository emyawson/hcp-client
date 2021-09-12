import { createRequestActionTypes } from '../request';

export const FETCH_PATIENT = 'PATIENT/FETCH_CURRENT';
export const FETCH_PATIENT_REQUEST = createRequestActionTypes(FETCH_PATIENT);
export const PATIENT_ACTIONS = {
  SWITCH_PATIENT: 'PATIENT/SWITCH',
  CLEAR_PATIENT_STATE: 'PATIENT/CLEAR_PATIENT_STATE',
};
