import { createRequestActions } from 'src/core';

import { SAVE_ALERTS_REQUEST, GET_ALERTS_REQUEST } from './alerts.constants';

export const getAlertsRequest = createRequestActions(GET_ALERTS_REQUEST);

export const saveAlertsRequest = createRequestActions(SAVE_ALERTS_REQUEST);
