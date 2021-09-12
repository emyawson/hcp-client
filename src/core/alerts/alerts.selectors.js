import { createSelector } from 'reselect';
import { equals, not, path, prop } from 'ramda';

import { createRequestHasErrorSelector } from 'src/core/request';
import { GET_THRESHOLDS } from 'src/core/strip-delivery';

import { INITIAL_ALERT_SETTINGS_STATE, GET_ALERTS } from './alerts.constants';

export const selectAlertSettings = path(['alerts']);

export const selectThresholds = path(['stripDelivery', 'thresholds']);

export const selectHypoIntervals = createSelector(
  selectThresholds,
  prop('hypo'),
);
export const selectHyperIntervals = createSelector(
  selectThresholds,
  prop('hyper'),
);
export const selectWarningIntervals = createSelector(
  selectThresholds,
  prop('warning'),
);

export const selectHasAlerts = createSelector(
  selectAlertSettings,
  alertSettings => not(equals(INITIAL_ALERT_SETTINGS_STATE)(alertSettings)),
);

export const selectAlertsRequestHasError = createRequestHasErrorSelector([
  GET_ALERTS,
]);

export const selectThresholdsRequestHasError = createRequestHasErrorSelector([
  GET_THRESHOLDS,
]);
