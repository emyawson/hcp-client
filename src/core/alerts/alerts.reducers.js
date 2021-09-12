import { STATE_ACTIONS } from 'src/core';

import {
  GET_ALERTS_REQUEST,
  SAVE_ALERTS_REQUEST,
  INITIAL_ALERT_SETTINGS_STATE,
} from './alerts.constants';

export const alertsReducer = (state = INITIAL_ALERT_SETTINGS_STATE, action) => {
  switch (action.type) {
    case STATE_ACTIONS.CLEAR_ALERTS: {
      return INITIAL_ALERT_SETTINGS_STATE;
    }
    case GET_ALERTS_REQUEST.SUCCESS: {
      return action.payload;
    }
    case SAVE_ALERTS_REQUEST.SUCCESS: {
      return action.payload;
    }
    default:
      return state;
  }
};
