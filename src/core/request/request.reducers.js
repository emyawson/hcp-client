import { pathOr, without } from 'ramda';
import { combineReducers } from 'redux';

import { REQUEST } from './request.constants';
import { addRequestError, removeRequestError } from './request.util';

export const INITIAL_STATE = {
  onGoingRequests: [],
  errors: {},
};

const onGoingRequests = (state = INITIAL_STATE.onGoingRequests, action) => {
  switch (pathOr('', ['meta', 'activity'], action)) {
    case REQUEST.START: {
      return [...state, action.meta.base];
    }
    case REQUEST.SUCCESS:
    case REQUEST.ERROR: {
      return without([action.meta.base], state);
    }
    default:
      return state;
  }
};

const errors = (state = INITIAL_STATE.errors, action) => {
  switch (pathOr(false, ['meta', 'activity'], action)) {
    case REQUEST.START:
    case REQUEST.SUCCESS:
      return removeRequestError({ action, state });
    case REQUEST.ERROR:
      return addRequestError({ action, state });
    default:
      return state;
  }
};

export const requestReducer = combineReducers({
  onGoingRequests,
  errors,
});
