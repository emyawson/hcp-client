import { STATE_ACTIONS } from 'src/core';

import {
  INITIAL_ALERT_SETTINGS_STATE,
  GET_ALERTS_REQUEST,
  SAVE_ALERTS_REQUEST,
} from './alerts.constants';
import { alertsReducer } from './alerts.reducers';

const mockAlertsResponse = {
  hyper: { amount: 42, isActive: false },
  hypo: { amount: 44, isActive: true },
  warning: { amount: 48, isActive: true },
};

describe('alerts reducer', () => {
  it('should return the initial state', () => {
    expect(alertsReducer(undefined, { type: 'OTHER_ACTION' })).toEqual(
      INITIAL_ALERT_SETTINGS_STATE,
    );
  });
  it('should return the initial state when changing patient', () => {
    expect(
      alertsReducer(undefined, { type: STATE_ACTIONS.CLEAR_ALERTS }),
    ).toEqual(INITIAL_ALERT_SETTINGS_STATE);
  });
  it('should insert the API response when fetching alerts', () => {
    expect(
      alertsReducer(INITIAL_ALERT_SETTINGS_STATE, {
        type: GET_ALERTS_REQUEST.SUCCESS,
        payload: mockAlertsResponse,
      }),
    ).toEqual(mockAlertsResponse);
  });
  it('should insert the API response when saving alerts', () => {
    expect(
      alertsReducer(INITIAL_ALERT_SETTINGS_STATE, {
        type: SAVE_ALERTS_REQUEST.SUCCESS,
        payload: mockAlertsResponse,
      }),
    ).toEqual(mockAlertsResponse);
  });
});
