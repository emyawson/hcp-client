import { requestSequence } from 'src/core/request';
import { clearPatientDateRange } from 'src/core';

import { PATIENT_ACTIONS, FETCH_PATIENT_REQUEST } from './patient.constant';
import { clearPatientState, fetchPatientRequest } from './patient.action';

export const patientChangeEpic = () => (action$, store) =>
  action$
    .ofType(PATIENT_ACTIONS.SWITCH_PATIENT)
    .flatMap(action => [
      clearPatientState(),
      clearPatientDateRange(),
      fetchPatientRequest.start({ patientId: action.payload }),
    ]);

export const fetchPatientEpic = fetchPatientService =>
  requestSequence({
    service: fetchPatientService,
    actionTypes: FETCH_PATIENT_REQUEST,
  });
