import { Action, State } from '@roche/patterns-indicators/core';
import {
  applyMiddleware,
  combineReducers,
  createStore,
  Reducer,
  Store,
} from 'redux';
import { createEpicMiddleware, Epic } from 'redux-observable';

import { PATTERNS_AND_INDICATORS_NAMESPACE } from '@roche/patterns-indicators/constants/namespace.constants';

import { RecursivePartial } from 'src/utils/typescript';

type MockStore = {
  state: RecursivePartial<State>;
  reducers?: { [key: string]: Reducer<any> };
  epics?: Epic<Action<any>, Partial<State>>;
};

const mockReducer = (someState: RecursivePartial<State>) => someState;

export const createMockStore = ({
  state,
  reducers,
  epics,
}: MockStore): Store<Partial<State>> => {
  let epicMiddleware;
  if (epics) {
    epicMiddleware = createEpicMiddleware(epics);
  }
  let rootReducer: Reducer<any> = mockReducer;

  if (reducers) {
    rootReducer = combineReducers({
      [PATTERNS_AND_INDICATORS_NAMESPACE]: combineReducers(reducers),
    });
  }
  return createStore(
    rootReducer,
    state,
    epics ? applyMiddleware(epicMiddleware) : undefined,
  );
};
