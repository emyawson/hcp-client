import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';

import { rootEpic } from 'src/epic';

export const END = {
  type: 'END',
  payload: true,
};

export const createMockStore = ({ state = {}, middlewares = [] }) => {
  const epicMiddleware = createEpicMiddleware(rootEpic);
  const createStore = configureMockStore([epicMiddleware, ...middlewares]);
  const store = createStore(state);

  return {
    getState: store.getState,
    getActions: () =>
      store.getActions().filter(action => action.type !== END.type),
    getActionTypes: () =>
      store
        .getActions()
        .filter(action => action.type !== END.type)
        .map(action => action.type),
    dispatch: store.dispatch,
    waitForEpics: (timeout = 400) =>
      new Promise(res => {
        // TODO: be better than this!
        setTimeout(() => {
          res(store.dispatch(END));
        }, timeout);
      }),
  };
};
