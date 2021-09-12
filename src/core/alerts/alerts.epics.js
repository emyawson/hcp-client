import { requestSequence } from 'src/core/request';

import {
  transformAlertsFormValuesToServerAlerts,
  transformServerAlertsToAlertSettings,
} from './alerts.utils';
import { SAVE_ALERTS_REQUEST, GET_ALERTS_REQUEST } from './alerts.constants';

export const getAlertsEpic = alertsService =>
  requestSequence({
    actionTypes: GET_ALERTS_REQUEST,
    service: alertsService,
  });

export const saveAlertsEpic = saveAlertsService =>
  requestSequence({
    actionTypes: SAVE_ALERTS_REQUEST,
    options: { delay: true },
    queryTransform: transformAlertsFormValuesToServerAlerts,
    responseTransform: transformServerAlertsToAlertSettings,
    service: saveAlertsService,
  });
