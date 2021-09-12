import { createRequestActions } from 'src/core/request';

import {
  GET_PATIENT_STOCK_REQUEST,
  SUBMIT_LOST_STRIPS_REQUEST,
  SUBMIT_MANUAL_DELIVERY_REQUEST,
} from './patient-stock.constants';

export const getPatientStockRequest = createRequestActions(
  GET_PATIENT_STOCK_REQUEST,
);

export const submitLostStripsRequest = createRequestActions(
  SUBMIT_LOST_STRIPS_REQUEST,
);

export const submitManualDeliveryRequest = createRequestActions(
  SUBMIT_MANUAL_DELIVERY_REQUEST,
);
