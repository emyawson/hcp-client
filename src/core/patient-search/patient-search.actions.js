import { createRequestActions } from 'src/core/request/request.actions';

import { SEARCH_PATIENTS_REQUEST } from './patient-search.constants';

export const search = ({ patientID = '', fullName = '' }) => ({
  type: SEARCH_PATIENTS_REQUEST.START,
  payload: {
    patientID,
    fullName,
  },
});

export const getPatientsSearchRequest = createRequestActions(
  SEARCH_PATIENTS_REQUEST,
);
