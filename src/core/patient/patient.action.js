import { createRequestActions } from 'src/core/request';

import { PATIENT_ACTIONS, FETCH_PATIENT_REQUEST } from './patient.constant';

export const switchPatient = patientId => ({
  type: PATIENT_ACTIONS.SWITCH_PATIENT,
  payload: patientId,
});

export const fetchPatientRequest = createRequestActions(FETCH_PATIENT_REQUEST);

export const clearPatientState = () => ({
  type: PATIENT_ACTIONS.CLEAR_PATIENT_STATE,
  payload: null,
});
