import { SEARCH_PATIENTS_REQUEST } from './patient-search.constants';

import { STATE_ACTIONS } from '../state/index';
import { DeviceAssignmentActionType } from '../device-assignment/index';

export const INITIAL_PATIENT_SEARCH_STATE = {
  data: [],
  error: '',
  didSearch: false,
  searchBarOptions: {},
  fullName: '',
  patientID: '',
};

export const patientSearchReducer = (
  state = INITIAL_PATIENT_SEARCH_STATE,
  action,
) => {
  switch (action.type) {
    case SEARCH_PATIENTS_REQUEST.SUCCESS:
      return { ...state, data: action.payload, didSearch: true };
    case SEARCH_PATIENTS_REQUEST.ERROR:
      return { ...state, error: action.payload, didSearch: true };
    case STATE_ACTIONS.CLEAR_PATIENT_SEARCH_RESULTS:
      return INITIAL_PATIENT_SEARCH_STATE;
    case DeviceAssignmentActionType.CANCEL_ASSIGNMENT:
      return INITIAL_PATIENT_SEARCH_STATE;
    default:
      return state;
  }
};
