import {
  transformAlertToServerAlert,
  transformServerAlertsToAlerts,
} from 'src/services/alerts/alerts.utils';

import { ALERTS_IDS } from './alerts.constants';

export const transformAlertsFormValuesToServerAlerts = ({
  patientId,
  alertSettings,
}) => ({
  alerts: {
    hyper: transformAlertToServerAlert(alertSettings[ALERTS_IDS.UPPER]),
    hypo: transformAlertToServerAlert(alertSettings[ALERTS_IDS.HYPO]),
    warning: transformAlertToServerAlert(alertSettings[ALERTS_IDS.LOWER]),
  },
  patientId,
});

export const transformServerAlertsToAlertSettings = (data, action) =>
  transformServerAlertsToAlerts(data);
