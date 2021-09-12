import { STATE_ACTIONS } from 'src/core';

import {
  GET_PATIENT_STOCK_REQUEST,
  SUBMIT_LOST_STRIPS_REQUEST,
  SUBMIT_MANUAL_DELIVERY_REQUEST,
} from './patient-stock.constants';

export const INITIAL_PATIENT_STOCK_STATE = {};

export const patientStockReducer = (
  state = INITIAL_PATIENT_STOCK_STATE,
  action,
) => {
  switch (action.type) {
    case STATE_ACTIONS.CLEAR_PATIENT_STOCK: {
      return INITIAL_PATIENT_STOCK_STATE;
    }
    case GET_PATIENT_STOCK_REQUEST.SUCCESS: {
      const { stripModelId, patientStock } = action.payload;
      return {
        ...state,
        [stripModelId]: patientStock,
      };
    }
    case SUBMIT_LOST_STRIPS_REQUEST.SUCCESS: {
      const { stripModelId, patientStock } = action.payload;
      return {
        ...state,
        [stripModelId]: patientStock,
      };
    }
    case SUBMIT_MANUAL_DELIVERY_REQUEST.SUCCESS: {
      const { stripModelId, patientStock } = action.payload;
      return {
        ...state,
        [stripModelId]: patientStock,
      };
    }
    default:
      return state;
  }
};
