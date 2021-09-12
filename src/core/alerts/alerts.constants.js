import { addDomainNamespace } from 'src/utils';

import { createRequestActionTypes } from '../request/request.actions';

const DOMAIN_NAMESPACE = 'STRIP_MANAGEMENT_ALERTS';
const addNamespacing = actionName =>
  addDomainNamespace(actionName, DOMAIN_NAMESPACE);

export const ALERTS_THRESHOLD_LIMITS = {
  LIMIT_MAX: 99,
  LIMIT_MIN: 0,
};
export const DEFAULT_THRESHOLD_LIMIT = ALERTS_THRESHOLD_LIMITS.LIMIT_MIN;

export const GET_ALERTS = addNamespacing('GET_ALERTS');
export const GET_ALERTS_REQUEST = createRequestActionTypes(GET_ALERTS);

export const SAVE_ALERTS = addNamespacing('SAVE_ALERTS');
export const SAVE_ALERTS_REQUEST = createRequestActionTypes(SAVE_ALERTS);

export const ALERTS_MODEL_PATH = 'alerts';
export const ALERT_SETTINGS_MODEL_PATH = `${ALERTS_MODEL_PATH}.alertSettings`;

export const ALERTS_IDS = {
  HYPO: 'hypoglycemiaAlert',
  LOWER: 'lowerAlert',
  UPPER: 'upperAlert',
};

export const INITIAL_ALERT_SETTINGS_STATE = {
  [ALERTS_IDS.HYPO]: {
    active: false,
    thresholdLimit: DEFAULT_THRESHOLD_LIMIT,
  },
  [ALERTS_IDS.LOWER]: {
    active: false,
    thresholdLimit: DEFAULT_THRESHOLD_LIMIT,
  },
  [ALERTS_IDS.UPPER]: {
    active: false,
    thresholdLimit: DEFAULT_THRESHOLD_LIMIT,
  },
};
