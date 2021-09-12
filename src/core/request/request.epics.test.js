import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs'; // eslint-disable-line no-unused-vars

import { requestSequence } from './request.epics';

describe('request sequence epic tests', () => {
  const dataService = params => Promise.resolve([1, 2, 3, 4]);
  const actionTypes = {
    START: 'DATA_FETCH_START',
    SUCCESS: 'DATA_FETCH_SUCCESS',
    ERROR: 'DATA_FETCH_ERROR',
  };
  const store = {
    getState: () => ({
      session: {
        token: '12345',
      },
    }),
  };
  it('should handle a successful request', () => {
    const action$ = ActionsObservable.of({
      type: actionTypes.START,
    });

    requestSequence({ service: dataService, actionTypes })(
      action$,
      store,
    ).subscribe(outputAction => {
      expect(outputAction.type).toEqual(actionTypes.SUCCESS);
      expect(outputAction.payload).toEqual([1, 2, 3, 4]);
      done();
    });
  });

  it('should handle a request that errors', () => {
    const action$ = ActionsObservable.of({
      type: actionTypes.START,
    });
    const failingDataService = params =>
      Promise.reject({ error: 'this is an error' });
    requestSequence({ service: failingDataService, actionTypes })(
      action$,
      store,
    ).subscribe(outputAction => {
      expect(outputAction.type).toEqual(actionTypes.ERROR);
      expect(outputAction.payload).toEqual({ error: 'this is an error ' });
      done();
    });
  });

  it('should transform payload data based on an optional response transform function', () => {
    const action$ = ActionsObservable.of({
      type: actionTypes.START,
      payload: { id: 1 },
    });
    const responseTransform = (data, action) => ({
      requestData: data,
      id: action.payload.id,
    });
    requestSequence({ service: dataService, actionTypes, responseTransform })(
      action$,
      store,
    ).subscribe(outputAction => {
      expect(outputAction.payload).toEqual({
        requestData: [1, 2, 3, 4],
        id: 1,
      });
      done();
    });
  });

  it('should transform payload data based on an optional query transform function', () => {
    const action$ = ActionsObservable.of({
      type: actionTypes.START,
      payload: false,
    });
    const dataServiceToTestQueryTransform = bool => Promise.resolve(bool);
    const queryTransform = payload => !payload;
    requestSequence({
      service: dataServiceToTestQueryTransform,
      actionTypes,
      queryTransform,
    })(action$, store).subscribe(outputAction => {
      expect(outputAction.payload).toEqual(true);
      done();
    });
  });

  it('should let the request go thorough when invokedWhen function returns true', () => {
    const action$ = ActionsObservable.of({
      type: actionTypes.START,
    });

    const invokeWhen = store => true;

    requestSequence({ service: dataService, actionTypes, invokeWhen })(
      action$,
      store,
    ).subscribe(outputAction => {
      expect(outputAction.payload).toEqual([1, 2, 3, 4]);
      done();
    });
  });

  it('should not let the request go thorough when invokedWhen function returns false', () => {
    const action$ = ActionsObservable.of({
      type: actionTypes.START,
    });

    const invokeWhen = store => false;

    requestSequence({ service: dataService, actionTypes, invokeWhen })(
      action$,
      store,
    ).subscribe(outputAction => {
      expect(outputAction.payload).toEqual([]);
      done();
    });
  });
});
