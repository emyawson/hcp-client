import { PATIENTS_ACTIONS } from './patients.constant';
import type { Action, State } from './patients.type';

export const INITIAL_SIGN_IN_STATE = {
  patients: [],
  isFetchingPatients: false,
};

export const patientsReducer = (
  state: State = INITIAL_SIGN_IN_STATE,
  action: Action,
) => {
  switch (action.type) {
    case PATIENTS_ACTIONS.GET_PATIENTS: {
      return {
        ...state,
        isFetchingPatients: true,
      };
    }
    case PATIENTS_ACTIONS.SET_PATIENTS: {
      return {
        ...state,
        isFetchingPatients: false,
        patients: action.payload,
      };
    }
    default:
      return state;
  }
};
