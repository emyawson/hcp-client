import { STATE_ACTIONS } from 'src/core';

import {
  GET_PATIENT_STOCK_REQUEST,
  SUBMIT_LOST_STRIPS_REQUEST,
  SUBMIT_MANUAL_DELIVERY_REQUEST,
} from './patient-stock.constants';
import {
  patientStockReducer,
  INITIAL_PATIENT_STOCK_STATE,
} from './patient-stock.reducers';

describe('Patient stock reducer tests', () => {
  const mockInitialState = {
    '1': 200,
    '2': 300,
  };
  it('Returns the initial state', () => {
    expect(patientStockReducer(undefined, {})).toEqual(
      INITIAL_PATIENT_STOCK_STATE,
    );
  });
  it('Clears all patient stock data', () => {
    expect(
      patientStockReducer(mockInitialState, {
        type: STATE_ACTIONS.CLEAR_PATIENT_STOCK,
      }),
    ).toEqual(INITIAL_PATIENT_STOCK_STATE);
  });
  it('Sets the patient stock of the correct strip model on get stock success', () => {
    expect(
      patientStockReducer(mockInitialState, {
        type: GET_PATIENT_STOCK_REQUEST.SUCCESS,
        payload: { stripModelId: 1, patientStock: 500 },
      }),
    ).toEqual({ '1': 500, '2': 300 });
  });
  it('Sets the patient stock of the correct strip model on submit lost strips success', () => {
    expect(
      patientStockReducer(mockInitialState, {
        type: SUBMIT_LOST_STRIPS_REQUEST.SUCCESS,
        payload: { stripModelId: 2, patientStock: 150 },
      }),
    ).toEqual({
      '1': 200,
      '2': 150,
    });
  });
  it('Sets the patient stock of the correct strip model on submit manual delivery success', () => {
    expect(
      patientStockReducer(mockInitialState, {
        type: SUBMIT_MANUAL_DELIVERY_REQUEST.SUCCESS,
        payload: { stripModelId: 1, patientStock: 250 },
      }),
    ).toEqual({
      '1': 250,
      '2': 300,
    });
  });
});
