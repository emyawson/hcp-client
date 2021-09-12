import { createSelector } from 'reselect';
import { and, path, pathOr, prop, equals, not, pipe } from 'ramda';

import { hasValue } from 'src/utils/validation-helpers';
import { translate } from 'src/i18n';

import {
  GET_DELIVERY,
  TRAFFIC_LIGHT_STATES,
  GET_LAST_DELIVERY_STATUS,
} from './strip-delivery.constants';
import {
  calculateNextDeliveryDate,
  calculateNewPatientDeliveryDate,
  formatStripDeliveryDateString,
} from './strip-delivery.utils';

import { createRequestHasErrorSelector } from '../request/request.selectors';
import {
  selectCurrentPrescriptionWithStripModels,
  selectCurrentPrescriptionFrequency,
} from '../prescription/prescription.selectors';

export const selectLastCollectedDate = path([
  'stripDelivery',
  'stripDeliveryInfo',
  'lastCollectedDate',
]);

export const selectLastStatusLastCollectedDate = path([
  'stripDelivery',
  'stripDeliveryInfo',
  'lastStatusLastCollectedDate',
]);

export const selectNextDeliveryDate = createSelector(
  selectLastCollectedDate,
  selectCurrentPrescriptionFrequency,
  (lastCollectedDate, frequency) =>
    frequency
      ? lastCollectedDate
        ? calculateNextDeliveryDate(lastCollectedDate, frequency)
        : calculateNewPatientDeliveryDate(frequency)
      : null,
);

export const selectLastStatusNextDeliveryDate = createSelector(
  selectLastStatusLastCollectedDate,
  selectCurrentPrescriptionFrequency,
  (lastCollectedDate, frequency) =>
    frequency && lastCollectedDate
      ? calculateNextDeliveryDate(lastCollectedDate, frequency)
      : null,
);

export const selectNumberOfStripsToDeliver = pathOr(null, [
  'stripDelivery',
  'stripDeliveryInfo',
  'numberOfStripsToDeliver',
]);

export const selectLastNumberOfStripsToDeliver = pathOr(null, [
  'stripDelivery',
  'stripDeliveryInfo',
  'lastNumberOfStripsToDeliver',
]);

export const selectTrafficLightStatus = pathOr(null, [
  'stripDelivery',
  'stripDeliveryInfo',
  'trafficLightStatus',
]);

export const selectTrafficLightStatusConditions = pathOr(null, [
  'stripDelivery',
  'stripDeliveryInfo',
  'trafficLightStatusConditions',
]);

export const selectTrafficLightStatusId = pathOr(null, [
  'stripDelivery',
  'stripDeliveryInfo',
  'trafficLightStatusId',
]);

export const selectTrafficLightStatusForced = pathOr(null, [
  'stripDelivery',
  'stripDeliveryInfo',
  'trafficLightStatusForced',
]);

export const selectForceTrafficStatus = pathOr(null, [
  'stripDelivery',
  'forceTrafficStatus',
  'status',
]);

export const selectCurrentPrescriptionStripModel = createSelector(
  selectCurrentPrescriptionWithStripModels,
  prop('stripModel'),
);

export const selectHasActivePrescription = createSelector(
  selectCurrentPrescriptionWithStripModels,
  hasValue,
);

export const selectHasStripDeliveryData = createSelector(
  selectNumberOfStripsToDeliver,
  hasValue,
);

export const selectDeliveryRequestHasError = createRequestHasErrorSelector([
  GET_DELIVERY,
]);

export const selectLastDeliveryStatusRequestHasError = createRequestHasErrorSelector(
  [GET_LAST_DELIVERY_STATUS],
);

export const selectClinicId = pathOr(null, ['session', 'user', 'centerId']);

export const selectDepartmentId = pathOr(null, [
  'session',
  'user',
  'departmentId',
]);

export const selectLastTrafficLightStatus = pathOr(null, [
  'stripDelivery',
  'stripDeliveryInfo',
  'lastTrafficLightStatus',
]);

export const selectLastDeliveryTrafficLightStatus = pathOr(null, [
  'stripDelivery',
  'stripDeliveryInfo',
  'lastDeliveryTrafficLightStatus',
]);

export const selectLastTrafficLightStatusConditions = pathOr(null, [
  'stripDelivery',
  'stripDeliveryInfo',
  'lastTrafficLightStatusConditions',
]);

export const selectTrafficLightStatusDateCalculated = path([
  'stripDelivery',
  'stripDeliveryInfo',
  'trafficLightStatusDateCalculated',
]);

export const selectLastTrafficLightStatusDateCalculated = path([
  'stripDelivery',
  'stripDeliveryInfo',
  'lastTrafficLightStatusDateCalculated',
]);

export const selectLastTrafficLightStatusDateCalculatedFormatted = createSelector(
  selectLastTrafficLightStatusDateCalculated,
  date =>
    formatStripDeliveryDateString(
      date,
      translate('stripDelivery.empty.nextDeliveryDate'),
    ),
);

export const selectTrafficLightStatusComment = path([
  'stripDelivery',
  'stripDeliveryInfo',
  'trafficLightStatusComment',
]);

export const selectLastTrafficLightStatusComment = path([
  'stripDelivery',
  'stripDeliveryInfo',
  'lastTrafficLightStatusComment',
]);

export const selectLastTrafficLightStatusExplanation = createSelector(
  selectLastTrafficLightStatusConditions,
  pathOr('', ['explanation', 'message']),
);

export const selectHasLastTrafficLightStatusWithAlert = createSelector(
  selectLastTrafficLightStatusExplanation,
  equals('The previous traffic light status is orange.'),
);

export const selectHasForcedStatusComment = createSelector(
  selectTrafficLightStatus,
  selectTrafficLightStatusForced,
  selectTrafficLightStatusComment,
  (trafficLightStatus, isForced, trafficLightStatusComment) =>
    pipe(
      equals(TRAFFIC_LIGHT_STATES.DISABLED),
      not,
    )(trafficLightStatus) &&
    isForced &&
    hasValue(trafficLightStatusComment),
);

export const selectDeliveryStatusId = path([
  'stripDelivery',
  'stripDeliveryInfo',
  'trafficLightStatusId',
]);

export const selectHasLastDeliveryWithAlert = createSelector(
  selectTrafficLightStatus,
  selectLastDeliveryTrafficLightStatus,
  (trafficLightStatus, lastDeliveryTrafficLightStatus) =>
    and(
      equals(trafficLightStatus, TRAFFIC_LIGHT_STATES.DO_NOT_DELIVER),
      equals(
        lastDeliveryTrafficLightStatus,
        TRAFFIC_LIGHT_STATES.DELIVER_WITH_ALERT,
      ),
    ),
);

export const selectTimeIntervals = path(['stripDelivery', 'timeIntervals']);
