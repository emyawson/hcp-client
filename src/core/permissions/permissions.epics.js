import {
  fetchPermissions,
  fetchPatientPermissions,
} from './permissions.actions';
import {
  FETCH_PERMISSIONS,
  FETCH_PATIENT_PERMISSIONS,
} from './permissions.constants';

export const permissionsEpic = permissionsService => (action$, store$) =>
  action$
    .ofType(FETCH_PERMISSIONS.START)
    .debounceTime(2000)
    .flatMap(action =>
      permissionsService(action.payload, store$.getState().session.token)
        .then(data => fetchPermissions.success(data, action))
        .catch(error => fetchPermissions.error(error)),
    );

export const patientPermissionsEpic = permissionsService => (action$, store$) =>
  action$
    .ofType(FETCH_PATIENT_PERMISSIONS.START)
    .debounceTime(2000)
    .flatMap(action =>
      permissionsService(action.payload, store$.getState().session.token)
        .then(data => fetchPatientPermissions.success(data, action))
        .catch(error => fetchPatientPermissions.error(error)),
    );
