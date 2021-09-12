import {
  invertObj,
  pathOr,
  propEq,
  find,
  pipe,
  always,
  ifElse,
  isNil,
  divide,
  multiply,
  toPairs,
  map,
  assoc,
} from 'ramda';

import { isNotNil } from 'src/utils/validation-helpers';
import { TRAFFIC_LIGHT_STATES } from 'src/core';

import { SERVER_TRAFFIC_LIGHT_STATES } from './delivery-status.constant';

const {
  DISABLED,
  DO_NOT_DELIVER,
  DELIVER_WITH_ALERT,
  DELIVER,
} = TRAFFIC_LIGHT_STATES;

export const clientToServerTrafficLightStates = {
  [DISABLED]: SERVER_TRAFFIC_LIGHT_STATES.DISABLED,
  [DO_NOT_DELIVER]: SERVER_TRAFFIC_LIGHT_STATES.DO_NOT_DELIVER,
  [DELIVER_WITH_ALERT]: SERVER_TRAFFIC_LIGHT_STATES.DELIVER_WITH_ALERT,
  [DELIVER]: SERVER_TRAFFIC_LIGHT_STATES.DELIVER,
};
export const serverToClientTrafficLightStates = invertObj(
  clientToServerTrafficLightStates,
);
export const trafficLightColorToStatus = {
  red: TRAFFIC_LIGHT_STATES.DO_NOT_DELIVER,
  orange: TRAFFIC_LIGHT_STATES.DELIVER_WITH_ALERT,
  green: TRAFFIC_LIGHT_STATES.DELIVER,
  grey: TRAFFIC_LIGHT_STATES.DISABLED,
};

export const clientToServerConditionTypes = {
  hypos: 'HYPO_ALERT',
  hypers: 'HYPER_ALERT',
  warnings: 'WARNING_ALERT',
  consumption: 'CONSUMPTION',
};

export const transformStatusToServerDeliveryStatus = ({ status, comment }) => ({
  comment,
  status: clientToServerTrafficLightStates[status],
});
// TODO: update this function to only accept one condition shape after MW endpoint responses
// (GET /delivery and GET/delivery-status) have been updated in V1
// This accepts conditions with threshold and amount either flat or nested in value
const flattenCondition = condition => {
  const { pass, value, explanation } = condition;
  const threshold = pathOr(condition.threshold, ['threshold'], value);
  const amount = pathOr(condition.amount, ['amount'], value);
  return isNil(explanation)
    ? {
        pass,
        threshold,
        amount,
      }
    : { message: explanation };
};
const defaultCondition = { pass: null, threshold: null, amount: null };
const findConditionFromArray = type => find(propEq('type', type));
const transformCondition = type =>
  pipe(
    findConditionFromArray(type),
    ifElse(isNil, always(defaultCondition), flattenCondition),
  );
export const calculatePercentConsumed = (amount, threshold) =>
  amount &&
  threshold &&
  pipe(
    divide,
    multiply(100),
    Math.floor,
  )(amount, threshold);
const addPercentConsumedToCondition = ({ pass, threshold, amount }) => ({
  pass,
  threshold,
  amount,
  percentConsumed: calculatePercentConsumed(amount, threshold),
});

const reshapeTrafficLightConditions = pipe(
  toPairs,
  map(([conditionType, conditionData]) => ({
    type: conditionType,
    pass: conditionData.pass,
    value: {
      threshold: conditionData.threshold,
      amount: conditionData.amount,
    },
  })),
);
const transformClientToServerTrafficLightConditionType = condition =>
  assoc('type', clientToServerConditionTypes[condition.type], condition);
export const transformClientToServerTrafficLightConditions = pipe(
  reshapeTrafficLightConditions,
  map(transformClientToServerTrafficLightConditionType),
);

export const transformClientToServerTrafficLightStatus = ({
  id,
  status,
  conditions,
  forced,
}) => ({
  id,
  forced,
  status: clientToServerTrafficLightStates[status],
  conditions: transformClientToServerTrafficLightConditions(conditions),
});
export const transformServerToClientTrafficLightConditions = conditions => {
  const hypos = conditions && transformCondition('HYPO_ALERT')(conditions);
  const hypers = conditions && transformCondition('HYPER_ALERT')(conditions);
  const warnings =
    conditions && transformCondition('WARNING_ALERT')(conditions);
  const consumption =
    conditions &&
    pipe(
      transformCondition('CONSUMPTION'),
      addPercentConsumedToCondition,
    )(conditions);
  const explanation =
    conditions && transformCondition('explanation')(conditions);
  return { hypos, hypers, warnings, consumption, explanation };
};

export const transformServerToClientDeliveryStatus = ({
  trafficLightStatus,
  numberOfStripsToDeliver,
  numberOfStrips,
}) => {
  const conditions = pathOr(null, ['conditions'], trafficLightStatus);
  const trafficLightColor = pathOr(null, ['status'], trafficLightStatus);
  return {
    trafficLightStatus: trafficLightColorToStatus[trafficLightColor],
    trafficLightStatusId: pathOr(null, ['id'], trafficLightStatus),
    trafficLightStatusDateCalculated: pathOr(
      null,
      ['dateCalculated'],
      trafficLightStatus,
    ),
    trafficLightStatusForced: pathOr(null, ['forced'], trafficLightStatus),
    numberOfStripsToDeliver: isNotNil(numberOfStripsToDeliver)
      ? numberOfStripsToDeliver
      : numberOfStrips,
    trafficLightStatusConditions: transformServerToClientTrafficLightConditions(
      conditions,
    ),
    trafficLightStatusComment: pathOr(null, ['comment'], trafficLightStatus),
    trafficLightStatusCommentState: pathOr(
      null,
      ['commentStatus'],
      trafficLightStatus,
    ), // TODO: transform 'empty' | 'important' | 'normal' | 'acknowledged' for client
  };
};
