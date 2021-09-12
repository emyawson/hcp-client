// tslint:disable-next-line
const configureMockStore = require('redux-mock-store').default;

import { path } from 'ramda';
import { applyMiddleware, combineReducers, createStore, Reducer } from 'redux';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';
import { Action, State, Store } from 'src/app/store/app.types';

import { rootEpic } from 'src/epic';
export const END = {
  type: 'END',
  payload: true,
};

export const createLegacyMockStore = ({ state = {}, middlewares = [] }) => {
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

type MockStore<S> = {
  readonly state: Partial<S>;
  readonly reducers: { [key: string]: Reducer<any> };
  readonly epics?: Epic<Action<any>, Partial<State>>;
};

type Update = {
  readonly update: (s: string[]) => void;
};

export const createMockStore = <S = State>({
  state,
  reducers,
  epics,
}: MockStore<S>): Store<Partial<S>> & Update => {
  const middlewares: any = [];
  if (epics) {
    middlewares.push(createEpicMiddleware(combineEpics(epics)));
  }
  const store = createStore(
    combineReducers(reducers),
    state,
    epics ? applyMiddleware(...middlewares) : undefined,
  );

  // @ts-ignore
  return {
    ...store,
    persistor: {
      persist: () => null,
    },
    update: (propertyPath: string[]) => {
      return new Promise((resolve, reject) => {
        let currentValue;
        const unsubscribe = store.subscribe(() => {
          // tslint:disable-next-line
          let previousValue = currentValue;
          currentValue = path(propertyPath, store.getState());
          if (previousValue !== currentValue) {
            resolve(currentValue);
          } else {
            reject(false);
          }
          unsubscribe();
        });
      });
    },
  };
};
