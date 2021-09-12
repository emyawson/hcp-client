import { path, pathOr } from 'ramda';

export const selectTimeIntervals = path(['stripDelivery', 'timeIntervals']);

export const selectStripDeliveryThresholds = pathOr({}, [
  'stripDelivery',
  'thresholds',
]);
