import {
  FETCH_PERMISSIONS,
  FETCH_PATIENT_PERMISSIONS,
} from './permissions.constants';

import { createRequestActions } from '../request/request.actions';

export const fetchPermissions = createRequestActions(FETCH_PERMISSIONS);
export const fetchPatientPermissions = createRequestActions(
  FETCH_PATIENT_PERMISSIONS,
);
