import { selectHasAlerts } from './alerts.selectors';
import { INITIAL_ALERT_SETTINGS_STATE, ALERTS_IDS } from './alerts.constants';

const mockInitialState = {
  alerts: INITIAL_ALERT_SETTINGS_STATE,
};

const mockState = {
  alerts: {
    [ALERTS_IDS.HYPO]: {
      active: true,
      thresholdLimit: 80,
    },
    [ALERTS_IDS.UPPER]: {
      active: true,
      thresholdLimit: 80,
    },
    [ALERTS_IDS.LOWER]: {
      active: true,
      thresholdLimit: 120,
    },
  },
};

describe('Alerts core selectors', () => {
  it('should determine that a patient has fetched alerts data', () => {
    expect(selectHasAlerts(mockState)).toBeTruthy();
  });
  it('should determine that a patient has not fetched alerts data', () => {
    expect(selectHasAlerts(mockInitialState)).toBeFalsy();
  });
});
