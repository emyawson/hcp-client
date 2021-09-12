import { routerReducer } from 'react-router-redux';
import { combineReducers, Reducer, ReducersMapObject, Store } from 'redux';

import { sessionReducer } from 'src/core/authentication/authentication.reducers';
import { userReducer } from 'src/core/user/user.reducer';
import { ReducerEntry, Reducers } from 'src/utils/store/store.types';

import { State } from './example.types';

const replaceReducers = (store: Store<State>) =>
  store.replaceReducer(createRootReducer() as Reducer<State>);

const moduleReducers: any = {};

export const injectModuleReducer = <
  ReducerState,
  ReducerKey extends keyof State
>(
  store: Store<State>,
  namespace: string,
  reducerMap: { [key: string]: Reducer<any> },
) => {
  if (moduleReducers[namespace]) {
    moduleReducers[namespace] = {
      ...moduleReducers[namespace],
      ...reducerMap,
    };
  } else {
    moduleReducers[namespace] = reducerMap;
  }

  replaceReducers(store);
};

const createModuleReducers = () =>
  Object.keys(moduleReducers).reduce((acc, key) => {
    acc[key] = combineReducers(moduleReducers[key]);
    return acc;
  }, {});

const asyncReducers: any = {};

export const createRootReducer = () => {
  const rootReducers: Reducers = {
    ...asyncReducers,
    ...createModuleReducers(),
    router: routerReducer,
    user: userReducer,
    session: sessionReducer,
  };

  return combineReducers(rootReducers as ReducersMapObject);
};

export const injectReducer = <ReducerKey extends keyof State>(
  store: Store<State>,
  { key, reducer }: ReducerEntry<ReducerKey>,
) => {
  if (typeof asyncReducers[key] !== 'undefined') {
    return;
  }

  asyncReducers[key] = reducer;
  replaceReducers(store);
};
