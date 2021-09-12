import { ALERTS_IDS } from 'src/core/alerts';

export const transformAlertToServerAlert = ({ active, thresholdLimit }) => ({
  isActive: active,
  amount: thresholdLimit,
});

export const transformServerAlertToAlert = ({ isActive, amount }) => ({
  active: isActive,
  thresholdLimit: amount,
});

export const transformServerAlertsToAlerts = ({ hypo, hyper, warning }) => ({
  [ALERTS_IDS.HYPO]: transformServerAlertToAlert(hypo),
  [ALERTS_IDS.UPPER]: transformServerAlertToAlert(hyper),
  [ALERTS_IDS.LOWER]: transformServerAlertToAlert(warning),
});
