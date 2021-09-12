import { createRequestActionTypes } from 'src/core';

export const SEARCH_PATIENTS = 'SEARCH/FETCH_PATIENTS';
export const SEARCH_PATIENTS_REQUEST = createRequestActionTypes(
  SEARCH_PATIENTS,
);
