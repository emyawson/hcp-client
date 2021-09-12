import { requestReducer } from './request.reducers';
import { REQUEST } from './request.constants';

describe('request reducer tests', () => {
  describe('ongoing request reducer', () => {
    it('should return default when the meta activity is not available', () => {
      const action = {
        type: 'SOME_NON_REQUEST_ACTION',
        meta: {},
      };
      const state = {
        onGoingRequests: [],
        errors: {},
      };

      expect(requestReducer(state, action)).toEqual(state);
    });

    it('should return the default value when meta is not available', () => {
      const action = {
        type: 'SOME_NON_REQUEST_ACTION',
      };
      const state = {
        onGoingRequests: [],
        errors: {},
      };

      expect(requestReducer(state, action)).toEqual(state);
    });
    it('should add the base action type to the ongoing requests on request start', () => {
      const action = {
        type: 'SOME_REQUEST_START',
        meta: { activity: REQUEST.START, base: 'SOME_REQUEST' },
      };
      const state = {
        onGoingRequests: [],
        errors: {},
      };

      expect(requestReducer(state, action)).toEqual({
        errors: {},
        onGoingRequests: ['SOME_REQUEST'],
      });
    });

    it('should add the base action type to the existing ongoing requests on request start', () => {
      const action = {
        type: 'SOME_REQUEST_START',
        meta: { activity: REQUEST.START, base: 'SOME_REQUEST' },
      };
      const state = {
        onGoingRequests: ['SOME_OTHER_REQUEST'],
        errors: {},
      };

      expect(requestReducer(state, action)).toEqual({
        errors: {},
        onGoingRequests: ['SOME_OTHER_REQUEST', 'SOME_REQUEST'],
      });
    });

    it('should remove the base action from the ongoing requests array on success', () => {
      const action = {
        type: 'SOME_REQUEST_SUCCESS',
        meta: { activity: REQUEST.SUCCESS, base: 'SOME_REQUEST' },
      };
      const state = {
        errors: {},
        onGoingRequests: ['SOME_OTHER_REQUEST', 'SOME_REQUEST'],
      };

      expect(requestReducer(state, action)).toEqual({
        errors: {},
        onGoingRequests: ['SOME_OTHER_REQUEST'],
      });
    });

    it('should remove the base action from the ongoing requests array on error', () => {
      const action = {
        type: 'SOME_REQUEST_SUCCESS',
        meta: { activity: REQUEST.ERROR, base: 'SOME_REQUEST' },
        payload: {
          status: 500,
          statusText: 'Internal Server Error',
          errorCode: null,
        },
      };
      const state = {
        errors: {},
        onGoingRequests: ['SOME_OTHER_REQUEST', 'SOME_REQUEST'],
      };

      expect(requestReducer(state, action)).toEqual({
        errors: {
          SOME_REQUEST: {
            status: 500,
            errorMessage: 'Internal Server Error',
            errorCode: null,
          },
        },
        onGoingRequests: ['SOME_OTHER_REQUEST'],
      });
    });

    it('should handle the case where the base action to remove isnt in the ongoing requests', () => {
      const action = {
        type: 'SOME_REQUEST_ERROR',
        meta: { activity: REQUEST.ERROR, base: 'SOME_REQUEST' },
        payload: { status: 500, statusText: 'Internal Server Error' },
      };
      const state = {
        errors: {},
        onGoingRequests: ['SOME_OTHER_REQUEST'],
      };

      expect(requestReducer(state, action)).toEqual({
        errors: {
          SOME_REQUEST: {
            status: 500,
            errorMessage: 'Internal Server Error',
            errorCode: null,
          },
        },
        onGoingRequests: ['SOME_OTHER_REQUEST'],
      });
    });
  });

  describe('error reducer tests', () => {
    it('should return default when there is no meta activity', () => {
      const action = {
        type: 'SOME_NON_REQUEST_ACTION',
      };
      const state = {
        errors: {},
        onGoingRequests: [],
      };

      expect(requestReducer(state, action)).toEqual(state);
    });

    it('should return default when the meta activity isnt request error', () => {
      const action = {
        type: 'SOME_REQUEST_SUCCESS',
        meta: { activity: REQUEST.SUCCESS, base: 'SOME_REQUEST' },
      };
      const state = {
        errors: {},
        onGoingRequests: [],
      };

      expect(requestReducer(state, action)).toEqual(state);
    });

    it('should store the error if the meta activity is request error by base action key', () => {
      const action = {
        type: 'SOME_REQUEST_ERROR',
        meta: {
          activity: REQUEST.ERROR,
          base: 'SOME_REQUEST',
        },
        payload: { statusText: 'there was an error in the network request' },
      };
      const state = {
        errors: {},
        onGoingRequests: [],
      };

      expect(requestReducer(state, action)).toEqual({
        errors: {
          SOME_REQUEST: {
            status: null,
            errorMessage: 'there was an error in the network request',
            errorCode: null,
          },
        },
        onGoingRequests: [],
      });
    });
  });
});
