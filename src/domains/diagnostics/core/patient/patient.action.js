import { createRequestActions } from 'src/domains/diagnostics/core/request';

import { FETCH_PATIENT_REQUEST } from './patient.constant';

export const fetchPatientRequest = createRequestActions(FETCH_PATIENT_REQUEST);
