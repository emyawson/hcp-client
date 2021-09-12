import { isNil, pipe, prop, divide, contains, equals } from 'ramda';

import {
  addDays,
  convertStringToJSDate,
  convertJSDate,
  isDateStringValid,
  toJSDate,
  jsDateToISOString,
  setTimezone,
  now,
  formatDateString,
} from 'src/utils/date';
import { hasValue } from 'src/utils/validation-helpers';

import {
  TRAFFIC_COLOR_MAP,
  TRAFFIC_LIGHT_STATES,
  STRIPS_PER_TUBE,
  DELIVERY_STATUS_COMMENT_STATES,
} from './strip-delivery.constants';

const AVERAGE_WEEKS_PER_MONTH = 4.348214;

export const convertStripConsumptionToTrafficLightState = percentConsumed => {
  const percentConsumedInt = percentConsumed
    ? Math.floor(percentConsumed)
    : null;
  switch (true) {
    case isNil(percentConsumedInt):
      return TRAFFIC_LIGHT_STATES.DISABLED;
    case percentConsumedInt < 70 || percentConsumedInt > 100:
      return TRAFFIC_LIGHT_STATES.DO_NOT_DELIVER;
    case percentConsumedInt < 80:
      return TRAFFIC_LIGHT_STATES.DELIVER_WITH_ALERT;
    default:
      return TRAFFIC_LIGHT_STATES.DELIVER;
  }
};

export const convertStripConsumptionToTrafficLightColor = percentConsumed =>
  prop(
    convertStripConsumptionToTrafficLightState(percentConsumed),
    TRAFFIC_COLOR_MAP,
  );

export const getTrafficLightColorFromStatus = trafficLightStatus =>
  TRAFFIC_COLOR_MAP[trafficLightStatus || TRAFFIC_LIGHT_STATES.DISABLED];

export const convertDateStringToDateTime = pipe(
  convertStringToJSDate,
  convertJSDate,
);

export const daysInWeeks = numOfWeeks => numOfWeeks * 7;

export const daysInMonths = numOfMonths =>
  Math.round(daysInWeeks(numOfMonths * AVERAGE_WEEKS_PER_MONTH));

export const addTime = (duration, unit) => date => {
  switch (unit.toLowerCase()) {
    case 'months':
      return addDays(daysInMonths(duration))(date);
    case 'weeks':
      return addDays(daysInWeeks(duration))(date);
    case 'days':
      return addDays(duration)(date);
    default:
      return date;
  }
};

export const numberOfStripsToTubes = strips =>
  strips && divide(strips, STRIPS_PER_TUBE);

export const calculateNextDeliveryDate = (
  lastCollectedDate,
  { duration, unit },
) =>
  isDateStringValid(lastCollectedDate) && hasValue(duration) && hasValue(unit)
    ? pipe(
        convertDateStringToDateTime,
        addTime(duration, unit),
        toJSDate,
        jsDateToISOString,
      )(lastCollectedDate)
    : null;

export const calculateNewPatientDeliveryDate = frequency => {
  const currentTimeIso = pipe(
    setTimezone('Etc/GMT+0'),
    toJSDate,
    jsDateToISOString,
  )(now());
  return calculateNextDeliveryDate(currentTimeIso, frequency);
};

export const formatStripDeliveryDateString = (dateString, errorString) =>
  formatDateString({
    dateString,
    errorString,
    format: 'd LLLL yyyy',
  });

export const shouldTriggerNotificationModal = ({
  hasModal,
  hasForceStatus,
  lastTrafficLightStatusCommentState,
  lastTrafficLightStatus,
}) =>
  hasModal &&
  hasForceStatus &&
  equals(
    lastTrafficLightStatusCommentState,
    DELIVERY_STATUS_COMMENT_STATES.IMPORTANT,
  ) &&
  contains(lastTrafficLightStatus, [
    TRAFFIC_LIGHT_STATES.DO_NOT_DELIVER,
    TRAFFIC_LIGHT_STATES.DELIVER_WITH_ALERT,
  ]);

export const shouldTriggerSendPatientStatusModal = ({
  hasModal,
  trafficLightStatus,
  hasForceStatus,
  trafficLightStatusForced,
}) =>
  hasModal &&
  !hasForceStatus &&
  !trafficLightStatusForced &&
  contains(trafficLightStatus, [
    TRAFFIC_LIGHT_STATES.DO_NOT_DELIVER,
    TRAFFIC_LIGHT_STATES.DELIVER_WITH_ALERT,
  ]);
