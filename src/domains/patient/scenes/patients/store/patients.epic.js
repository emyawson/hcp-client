import { getToken } from 'src/core/authentication';

import { PATIENTS_ACTIONS } from './patients.constant';
import { setPatients } from './patients.action';

// TODO: Refactor to use request sequence
export const getPatientsListEpic = patientListService => (action$, store) =>
  action$.ofType(PATIENTS_ACTIONS.GET_PATIENTS).mergeMap(
    () =>
      patientListService(getToken(store.getState()))
        .then(patients => setPatients(patients))
        .catch(err => err), // dispatch error action when refactored
  );
