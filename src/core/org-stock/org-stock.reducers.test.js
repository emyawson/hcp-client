import { GET_STRIP_MODELS_REQUEST } from 'src/core/prescription';

import { INITIAL_ORG_STOCK_STATE, orgStockReducer } from './org-stock.reducers';
import {
  FETCH_ORG_STOCK_REQUEST,
  ADD_ORG_STOCK_REQUEST,
} from './org-stock.constants';

import { STATE_ACTIONS } from '../state/state.constants';

const state = INITIAL_ORG_STOCK_STATE;

const mockResponse = {
  aggregateStripStock: 137500,
  stripModelStocks: {
    '1': {
      id: 1,
      name: 'strip-model-123',
      currentStripStock: 5000,
      lastShipmentDate: '2018-03-02T18:21:03.182Z',
      lastShipmentNumberOfStripsReceived: 2500,
    },
  },
};

const mockOptionsResponse = [{ id: 1, name: 'Aviva Plus' }];

describe('Organization Stock Reducers', () => {
  it('Should insert the added stock on success', () => {
    expect(
      orgStockReducer(state, {
        type: ADD_ORG_STOCK_REQUEST.SUCCESS,
        payload: mockResponse,
      }),
    ).toEqual({ ...state, ...mockResponse });
  });
  it('Should add the fetched strip model stock data on success', () => {
    expect(
      orgStockReducer(state, {
        type: FETCH_ORG_STOCK_REQUEST.SUCCESS,
        payload: mockResponse,
      }),
    ).toEqual({ ...state, ...mockResponse });
  });
  it('Should add the fetched strip model options on success', () => {
    expect(
      orgStockReducer(state, {
        type: GET_STRIP_MODELS_REQUEST.SUCCESS,
        payload: mockOptionsResponse,
      }),
    ).toEqual({ ...state, stripModels: mockOptionsResponse });
  });
  it('Should return the default state', () => {
    expect(orgStockReducer(undefined, { type: 'OTHER_ACTION' })).toEqual(state);
  });
  it('should clear the state on logout or session reset', () => {
    expect(
      orgStockReducer(undefined, { type: STATE_ACTIONS.CLEAR_ORG_STOCK }),
    ).toEqual(state);
  });
});
