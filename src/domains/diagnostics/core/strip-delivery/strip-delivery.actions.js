import { createRequestActions } from 'src/domains/diagnostics/core/request';

import {
  GET_THRESHOLDS_REQUEST,
  GET_TIME_INTERVALS_REQUEST,
} from './strip-delivery.constants';

export const getThresholdsRequest = createRequestActions(
  GET_THRESHOLDS_REQUEST,
);

export const getTimeIntervalsRequest = createRequestActions(
  GET_TIME_INTERVALS_REQUEST,
);
