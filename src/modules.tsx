import { combineReducers, Reducer, ReducersMapObject, Store } from 'redux';
import { Persistor as RPPersistor } from 'redux-persist/es/types';
import { Reducers } from 'src/modules.types';

import { reducers } from './reducer';

// tslint:disable-next-line:only-arrow-functions
const replaceReducers = function<S>(store: PersistedStore<S>) {
  store.replaceReducer(createRootReducer<S>() as Reducer<S>);
  store.persistor.persist();
};

const moduleReducers: any = {};

export type Persistor = {
  persist: () => void;
} & RPPersistor;

export type PersistedStore<S> = Store<S> & {
  persistor: Persistor;
};

export const injectModuleReducer = <
  State,
  ReducerState,
  ReducerKey extends keyof State
>(
  store: PersistedStore<State>,
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

  replaceReducers<State>(store);
};

const createModuleReducers = () =>
  Object.keys(moduleReducers).reduce((acc, key) => {
    acc[key] = combineReducers(moduleReducers[key]);
    return acc;
  }, {});

// tslint:disable-next-line:only-arrow-functions
export const createRootReducer = function<S>() {
  const rootReducers: Reducers<S> = {
    ...createModuleReducers(),
    ...reducers,
  };

  return combineReducers(rootReducers as ReducersMapObject);
};
