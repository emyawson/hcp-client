import { createRequestActionTypes } from '../request';

export const FETCH_PATIENT_DATE_RANGE = 'PATIENT/FETCH_DATE_RANGE';
export const FETCH_PATIENT_DATE_RANGE_REQUEST = createRequestActionTypes(
  FETCH_PATIENT_DATE_RANGE,
);
export const PATIENT_DATE_ACTIONS = {
  SET_DATES: 'PATIENT/SET_DATES',
  CLEAR: 'PATIENT/CLEAR_DATES',
};
