import { requestSequence } from 'src/core';

import { SEARCH_PATIENTS_REQUEST } from './patient-search.constants';

export const getPatientSearchEpic = patientSearchService =>
  requestSequence({
    service: patientSearchService,
    actionTypes: SEARCH_PATIENTS_REQUEST,
  });
