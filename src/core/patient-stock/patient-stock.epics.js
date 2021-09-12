import { requestSequence } from 'src/core/request';

import {
  GET_PATIENT_STOCK_REQUEST,
  SUBMIT_LOST_STRIPS_REQUEST,
  SUBMIT_MANUAL_DELIVERY_REQUEST,
} from './patient-stock.constants';

// Display loading modal during POST requests
const withRequestDelay = { delay: true };

export const patientStockResponseTransform = (data, action) => ({
  patientStock: data.stock,
  stripModelId: action.payload.stripModelId,
});

export const getPatientStockEpic = getPatientStockService =>
  requestSequence({
    service: getPatientStockService,
    actionTypes: GET_PATIENT_STOCK_REQUEST,
    responseTransform: patientStockResponseTransform,
  });

export const submitLostStripsEpic = submitLostStripsService =>
  requestSequence({
    service: submitLostStripsService,
    actionTypes: SUBMIT_LOST_STRIPS_REQUEST,
    options: withRequestDelay,
  });

export const submitManualDeliveryEpic = submitManualDeliveryService =>
  requestSequence({
    service: submitManualDeliveryService,
    actionTypes: SUBMIT_MANUAL_DELIVERY_REQUEST,
    options: withRequestDelay,
  });
