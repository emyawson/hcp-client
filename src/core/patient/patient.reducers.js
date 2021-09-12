import { FETCH_PATIENT_REQUEST, PATIENT_ACTIONS } from './patient.constant';

export const INITIAL_PATIENT_STATE = {};

export const patientReducer = (state = INITIAL_PATIENT_STATE, action) => {
  switch (action.type) {
    case FETCH_PATIENT_REQUEST.SUCCESS:
      return action.payload;
    case PATIENT_ACTIONS.CLEAR_PATIENT_STATE:
      return INITIAL_PATIENT_STATE;
    default:
      return state;
  }
};
