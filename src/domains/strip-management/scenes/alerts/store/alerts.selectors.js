import { createSelector, createStructuredSelector } from 'reselect';
import { propOr } from 'ramda';

import {
  selectHypoIntervals,
  selectHyperIntervals,
  selectWarningIntervals,
  selectHasAlerts,
  selectAlertSettings,
  selectAlertsRequestHasError,
  selectThresholdsRequestHasError,
} from 'src/core/alerts';

import { createThresholdDisplayString } from '../alerts.utils';

export const mapDataByTime = thresholdGroup => ({
  preIdealInterval: createThresholdDisplayString(
    propOr(null, 'preIdealInterval')(thresholdGroup),
  ),
  postIdealInterval: createThresholdDisplayString(
    propOr(null, 'postIdealInterval')(thresholdGroup),
  ),
  noctIdealInterval: createThresholdDisplayString(
    propOr(null, 'noctIdealInterval')(thresholdGroup),
  ),
});

export const selectHypoThresholds = createSelector(
  selectHypoIntervals,
  mapDataByTime,
);
export const selectHyperThresholds = createSelector(
  selectHyperIntervals,
  mapDataByTime,
);
export const selectWarningThresholds = createSelector(
  selectWarningIntervals,
  mapDataByTime,
);

export const alertsConnector = createStructuredSelector({
  hypoThresholds: selectHypoThresholds,
  hyperThresholds: selectHyperThresholds,
  warningThresholds: selectWarningThresholds,
  hasAlerts: selectHasAlerts,
  alertSettings: selectAlertSettings,
  alertsHasError: selectAlertsRequestHasError,
  thresholdsHasError: selectThresholdsRequestHasError,
});
