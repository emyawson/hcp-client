import {
  FETCH_PERMISSIONS,
  FETCH_PATIENT_PERMISSIONS,
} from './permissions.constants';

import { STATE_ACTIONS } from '../state/state.constants';

export const INITIAL_PERMISSIONS_STATE = [];
export const permissionsReducer = (
  state = INITIAL_PERMISSIONS_STATE,
  action,
) => {
  switch (action.type) {
    case FETCH_PERMISSIONS.SUCCESS:
      return action.payload;
    case STATE_ACTIONS.CLEAR_PERMISSIONS:
      return INITIAL_PERMISSIONS_STATE;
    default:
      return state;
  }
};

export const patientPermissionsReducer = (
  state = INITIAL_PERMISSIONS_STATE,
  action,
) => {
  switch (action.type) {
    case FETCH_PATIENT_PERMISSIONS.SUCCESS:
      return action.payload;
    case STATE_ACTIONS.CLEAR_PATIENT_PERMISSIONS:
      return INITIAL_PERMISSIONS_STATE;
    default:
      return state;
  }
};
