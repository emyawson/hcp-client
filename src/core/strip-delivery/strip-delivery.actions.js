import { createRequestActions } from 'src/core/request';

import {
  SET_DELIVERY_STATUS_REQUEST,
  GET_DELIVERY_STATUS_REQUEST,
  GET_LAST_DELIVERY_STATUS_REQUEST,
  GET_DELIVERY_REQUEST,
  SAVE_DELIVERY_REQUEST,
  GET_THRESHOLDS_REQUEST,
  GET_TIME_INTERVALS_REQUEST,
  SAVE_DELIVERY_STATUS_COMMENT_REQUEST,
} from './strip-delivery.constants';

export const setDeliveryStatusRequest = createRequestActions(
  SET_DELIVERY_STATUS_REQUEST,
);

export const getDeliveryRequest = createRequestActions(GET_DELIVERY_REQUEST);
export const saveDeliveryRequest = createRequestActions(SAVE_DELIVERY_REQUEST);

export const getTimeIntervalsRequest = createRequestActions(
  GET_TIME_INTERVALS_REQUEST,
);

export const getThresholdsRequest = createRequestActions(
  GET_THRESHOLDS_REQUEST,
);

export const getDeliveryStatusRequest = createRequestActions(
  GET_DELIVERY_STATUS_REQUEST,
);

export const getLastDeliveryStatusRequest = createRequestActions(
  GET_LAST_DELIVERY_STATUS_REQUEST,
);

export const saveDeliveryStatusCommentRequest = createRequestActions(
  SAVE_DELIVERY_STATUS_COMMENT_REQUEST,
);
