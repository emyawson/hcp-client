import { REQUEST } from './request.constants';

export const createRequestActionTypes = baseAction => ({
  START: `${baseAction}_START`,
  SUCCESS: `${baseAction}_SUCCESS`,
  ERROR: `${baseAction}_ERROR`,
  BASE: baseAction,
});

export const createRequestActions = requestActionTypes => ({
  start: (payload = {}) => ({
    type: requestActionTypes.START,
    payload,
    meta: { activity: REQUEST.START, base: requestActionTypes.BASE },
  }),
  success: payload => ({
    type: requestActionTypes.SUCCESS,
    payload,
    meta: { activity: REQUEST.SUCCESS, base: requestActionTypes.BASE },
  }),
  error: error => ({
    type: requestActionTypes.ERROR,
    payload: error,
    meta: {
      activity: REQUEST.ERROR,
      base: requestActionTypes.BASE,
    },
  }),
});
