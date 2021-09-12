import { STATE_ACTIONS } from './state.constants';

export const clearStripDelivery = () => ({
  type: STATE_ACTIONS.CLEAR_STRIP_DELIVERY,
  payload: true,
});

export const clearPrescriptions = () => ({
  type: STATE_ACTIONS.CLEAR_PRESCRIPTIONS,
  payload: true,
});

export const clearPatientDashboard = () => ({
  type: STATE_ACTIONS.CLEAR_PATIENT_DASHBOARD,
  payload: true,
});

export const clearPatientStock = () => ({
  type: STATE_ACTIONS.CLEAR_PATIENT_STOCK,
  payload: true,
});

export const clearAlerts = () => ({
  type: STATE_ACTIONS.CLEAR_ALERTS,
  payload: true,
});

export const clearPatientSearchResults = () => ({
  type: STATE_ACTIONS.CLEAR_PATIENT_SEARCH_RESULTS,
  payload: true,
});

export const clearOrgStock = () => ({
  type: STATE_ACTIONS.CLEAR_ORG_STOCK,
  payload: true,
});

export const clearOrganizationState = () => ({
  type: STATE_ACTIONS.CLEAR_ORGANIZATION_STATE,
});

export const clearPermissions = () => ({
  type: STATE_ACTIONS.CLEAR_PERMISSIONS,
});

export const clearPatientPermissions = () => ({
  type: STATE_ACTIONS.CLEAR_PATIENT_PERMISSIONS,
});
