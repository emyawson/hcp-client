import { PATIENTS_ACTIONS } from './patients.constant';

export const getAllPatients = () => ({
  type: PATIENTS_ACTIONS.GET_PATIENTS,
});

export const setPatients = patients => ({
  type: PATIENTS_ACTIONS.SET_PATIENTS,
  payload: patients,
});
