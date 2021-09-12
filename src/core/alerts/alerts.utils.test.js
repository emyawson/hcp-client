import { transformServerAlertsToAlerts } from 'src/services/alerts/alerts.utils';
import { mockAlertsData } from 'src/services/alerts/get-alerts/get-alerts.mock';

import { ALERTS_IDS } from './alerts.constants';
import {
  transformAlertsFormValuesToServerAlerts,
  transformServerAlertsToAlertSettings,
} from './alerts.utils';

describe('Alerts Utils', () => {
  it('should transform a server response to client formatting', () => {
    expect(transformServerAlertsToAlertSettings(mockAlertsData, null)).toEqual(
      transformServerAlertsToAlerts(mockAlertsData),
    );
  });
  it('should transform a set of client alert setting to server formatting', () => {
    const alertSettings = {
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
    };
    const patientId = 1;
    expect(
      transformAlertsFormValuesToServerAlerts({ patientId, alertSettings }),
    ).toEqual({
      patientId,
      alerts: {
        hypo: {
          isActive: true,
          amount: 80,
        },
        hyper: {
          isActive: true,
          amount: 80,
        },
        warning: {
          isActive: true,
          amount: 120,
        },
      },
    });
  });
});
