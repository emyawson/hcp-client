import { REQUEST } from './request.constants';

type RequestActionTypes = {
  START: string,
  SUCCESS: string,
  ERROR: string,
  BASE: string,
};

export const createRequestActionTypes = (
  baseAction: string,
): RequestActionTypes => ({
  START: `${baseAction}_START`,
  SUCCESS: `${baseAction}_SUCCESS`,
  ERROR: `${baseAction}_ERROR`,
  BASE: baseAction,
});

export const createRequestActions = (
  requestActionTypes: RequestActionTypes,
) => ({
  start: (payload = {}): Action => ({
    type: requestActionTypes.START,
    payload,
    meta: { activity: REQUEST.START, base: requestActionTypes.BASE },
  }),
  success: (payload): Action => ({
    type: requestActionTypes.SUCCESS,
    payload,
    meta: { activity: REQUEST.SUCCESS, base: requestActionTypes.BASE },
  }),
  error: (error): Action => ({
    type: requestActionTypes.ERROR,
    payload: error,
    meta: {
      activity: REQUEST.ERROR,
      base: requestActionTypes.BASE,
    },
  }),
});
