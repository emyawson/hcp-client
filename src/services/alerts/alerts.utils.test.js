import { ALERTS_IDS } from 'src/core/alerts';

import {
  transformAlertToServerAlert,
  transformServerAlertsToAlerts,
  transformServerAlertToAlert,
} from './alerts.utils';
import { mockAlertsData } from './get-alerts/get-alerts.mock';

describe('Alerts Service utils', () => {
  it('should transform a single alert node from server to client format', () => {
    const input = mockAlertsData.hyper;
    const output = {
      active: input.isActive,
      thresholdLimit: input.amount,
    };
    expect(transformServerAlertToAlert(input)).toEqual(output);
  });
  it('should transform a single alert node from client to server format', () => {
    const input = {
      active: true,
      thresholdLimit: 42,
    };
    const output = {
      isActive: true,
      amount: 42,
    };
    expect(transformAlertToServerAlert(input)).toEqual(output);
  });
  it('should transform a set of server alerts to client formatting', () => {
    const input = mockAlertsData;
    const output = {
      [ALERTS_IDS.HYPO]: transformServerAlertToAlert(input.hypo),
      [ALERTS_IDS.UPPER]: transformServerAlertToAlert(input.hyper),
      [ALERTS_IDS.LOWER]: transformServerAlertToAlert(input.warning),
    };
    expect(transformServerAlertsToAlerts(input)).toEqual(output);
  });
});
