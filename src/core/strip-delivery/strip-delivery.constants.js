import { colors } from 'src/core/styles/colors';
import { addDomainNamespace } from 'src/utils';

import { createRequestActionTypes } from '../request/request.actions';

const DOMAIN_NAMESPACE = 'STRIP_DELIVERY';
const addNamespacing = actionName =>
  addDomainNamespace(actionName, DOMAIN_NAMESPACE);

export const STRIP_DELIVERY_ACTIONS = {
  SET_NEW_PATIENT: addNamespacing('SET_NEW_PATIENT'),
};

export const GET_DELIVERY_STATUS = addNamespacing('GET_DELIVERY_STATUS');
export const GET_DELIVERY_STATUS_REQUEST = createRequestActionTypes(
  GET_DELIVERY_STATUS,
);

export const GET_LAST_DELIVERY_STATUS = addNamespacing(
  'GET_LAST_DELIVERY_STATUS',
);
export const GET_LAST_DELIVERY_STATUS_REQUEST = createRequestActionTypes(
  GET_LAST_DELIVERY_STATUS,
);

export const GET_DELIVERY = addNamespacing('GET_DELIVERY');
export const GET_DELIVERY_REQUEST = createRequestActionTypes(GET_DELIVERY);

export const SAVE_DELIVERY = addNamespacing('SAVE_DELIVERY');
export const SAVE_DELIVERY_REQUEST = createRequestActionTypes(SAVE_DELIVERY);
export const SET_DELIVERY_STATUS = addNamespacing('SET_DELIVERY_STATUS');
export const SET_DELIVERY_STATUS_REQUEST = createRequestActionTypes(
  SET_DELIVERY_STATUS,
);

export const GET_THRESHOLDS = addNamespacing('GET_THRESHOLDS');
export const GET_THRESHOLDS_REQUEST = createRequestActionTypes(GET_THRESHOLDS);

export const GET_TIME_INTERVALS = addNamespacing('GET_TIME_INTERVALS');
export const GET_TIME_INTERVALS_REQUEST = createRequestActionTypes(
  GET_TIME_INTERVALS,
);

export const SAVE_DELIVERY_STATUS_COMMENT = addNamespacing(
  'SAVE_DELIVERY_STATUS_COMMENT',
);
export const SAVE_DELIVERY_STATUS_COMMENT_REQUEST = createRequestActionTypes(
  SAVE_DELIVERY_STATUS_COMMENT,
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

export const STRIPS_PER_TUBE = 50;

export const STATUS_COMMENT_MAX_LENGTH = 255;
export const DELIVERY_COMMENT_MAX_LENGTH = 255;

export const DELIVERY_STATUS_COMMENT_STATES = {
  EMPTY: 'empty',
  IMPORTANT: 'important',
  NORMAL: 'normal',
  ACKNOWLEDGED: 'acknowledged',
};
