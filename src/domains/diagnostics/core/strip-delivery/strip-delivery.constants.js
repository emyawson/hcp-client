import { colors } from 'src/domains/diagnostics/styles';
import { addDomainNamespace } from 'src/domains/diagnostics/utils';

import { createRequestActionTypes } from '../request/request.actions';

const DOMAIN_NAMESPACE = 'STRIP_DELIVERY';
const addNamespacing = actionName =>
  addDomainNamespace(actionName, DOMAIN_NAMESPACE);

export const GET_THRESHOLDS = addNamespacing('GET_THRESHOLDS');
export const GET_THRESHOLDS_REQUEST = createRequestActionTypes(GET_THRESHOLDS);

export const GET_TIME_INTERVALS = addNamespacing('GET_TIME_INTERVALS');
export const GET_TIME_INTERVALS_REQUEST = createRequestActionTypes(
  GET_TIME_INTERVALS,
);

export const TRAFFIC_LIGHT_STATES = {
  DELIVER: 'DELIVER',
  DELIVER_WITH_ALERT: 'DELIVER_WITH_ALERT',
  DO_NOT_DELIVER: 'DO_NOT_DELIVER',
  DISABLED: 'DISABLED',
};

export const TRAFFIC_COLOR_MAP = {
  [TRAFFIC_LIGHT_STATES.DO_NOT_DELIVER]: colors.trafficRed,
  [TRAFFIC_LIGHT_STATES.DELIVER]: colors.trafficGreen,
  [TRAFFIC_LIGHT_STATES.DELIVER_WITH_ALERT]: colors.trafficOrange,
  [TRAFFIC_LIGHT_STATES.DISABLED]: colors.grayLight,
};
