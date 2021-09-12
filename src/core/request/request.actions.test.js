import { REQUEST } from './request.constants';
import {
  createRequestActionTypes,
  createRequestActions,
} from './request.actions';

describe('request action utils tests', () => {
  const actionTypes = createRequestActionTypes('BASE_ACTION');
  const requestActions = createRequestActions(actionTypes);
  describe('request action type creator', () => {
    it('should generate request action types for a base action', () => {
      const actual = actionTypes;
      const expected = {
        START: 'BASE_ACTION_START',
        SUCCESS: 'BASE_ACTION_SUCCESS',
        ERROR: 'BASE_ACTION_ERROR',
        BASE: 'BASE_ACTION',
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('request actions creator', () => {
    it('should create the start request action (no payload)', () => {
      const actual = requestActions.start();
      const expected = {
        type: actionTypes.START,
        payload: {},
        meta: { activity: REQUEST.START, base: actionTypes.BASE },
      };
      expect(actual).toEqual(expected);
    });

    it('should create the start request action with a payload', () => {
      const actual = requestActions.start('test');
      const expected = {
        type: actionTypes.START,
        payload: 'test',
        meta: { activity: REQUEST.START, base: actionTypes.BASE },
      };
      expect(actual).toEqual(expected);
    });

    it('should create the request success action', () => {
      const actual = requestActions.success({ values: [] });
      const expected = {
        type: actionTypes.SUCCESS,
        payload: { values: [] },
        meta: { activity: REQUEST.SUCCESS, base: actionTypes.BASE },
      };
      expect(actual).toEqual(expected);
    });

    it('should create the request error action', () => {
      const actual = requestActions.error({ message: 'the request failed' });
      const expected = {
        type: actionTypes.ERROR,
        payload: { message: 'the request failed' },
        meta: { activity: REQUEST.ERROR, base: actionTypes.BASE },
      };
      expect(actual).toEqual(expected);
    });
  });
});
