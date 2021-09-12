import { path } from 'ramda';
import {
  applyMiddleware,
  combineReducers,
  createStore,
  Reducer,
  Store,
} from 'redux';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';
import { State } from 'src/store/example.types';
import { Action } from 'src/utils/store';

type MockStore = {
  readonly state: Partial<State>;
  readonly reducers: { [key: string]: Reducer<any> };
  readonly epics?: Epic<Action<any>, Partial<State>>;
};

type Update = {
  readonly update: (s: string[]) => void;
};

export const createMockStore = ({
  state,
  reducers,
  epics,
}: MockStore): Store<Partial<State>> & Update => {
  const middlewares: any = [];
  if (epics) {
    middlewares.push(createEpicMiddleware(combineEpics(epics)));
  }
  const store = createStore(
    combineReducers(reducers),
    state,
    epics ? applyMiddleware(...middlewares) : undefined,
  );
  return {
    ...store,
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
