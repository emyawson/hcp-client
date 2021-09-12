import { GET_STRIP_MODELS_REQUEST } from 'src/core/prescription';

import {
  FETCH_ORG_STOCK_REQUEST,
  ADD_ORG_STOCK_REQUEST,
} from './org-stock.constants';

import { STATE_ACTIONS } from '../state/state.constants';

export const INITIAL_ORG_STOCK_STATE = {
  aggregateStripStock: null,
  stripModelStocks: {},
  stripModels: [],
};

export const orgStockReducer = (state = INITIAL_ORG_STOCK_STATE, action) => {
  switch (action.type) {
    case FETCH_ORG_STOCK_REQUEST.SUCCESS: {
      return {
        ...state,
        aggregateStripStock: action.payload.aggregateStripStock,
        stripModelStocks: action.payload.stripModelStocks,
      };
    }
    case ADD_ORG_STOCK_REQUEST.SUCCESS: {
      return {
        ...state,
        aggregateStripStock: action.payload.aggregateStripStock,
        stripModelStocks: action.payload.stripModelStocks,
      };
    }
    case GET_STRIP_MODELS_REQUEST.SUCCESS: {
      return { ...state, stripModels: action.payload };
    }
    case STATE_ACTIONS.CLEAR_ORG_STOCK: {
      return INITIAL_ORG_STOCK_STATE;
    }
    default:
      return state;
  }
};
