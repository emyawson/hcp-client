import { PATIENT_ACTIONS } from 'src/core/patient/patient.constant';

import {
  clearPrescriptions,
  clearStripDelivery,
  clearPatientStock,
  clearPatientDashboard,
  clearAlerts,
  clearPatientSearchResults,
  clearOrgStock,
  clearPatientPermissions,
} from './state.actions';
import { STATE_ACTIONS } from './state.constants';

export const clearPatientStateEpic = (action$, store) =>
  action$
    .ofType(PATIENT_ACTIONS.CLEAR_PATIENT_STATE)
    .flatMap(() => [
      clearStripDelivery(),
      clearPrescriptions(),
      clearPatientDashboard(),
      clearPatientStock(),
      clearAlerts(),
      clearPatientSearchResults(),
      clearPatientPermissions(),
    ]);

export const clearOrganizationStateEpic = (action$, store) =>
  action$
    .ofType(STATE_ACTIONS.CLEAR_ORGANIZATION_STATE)
    .flatMap(() => [clearOrgStock()]);
