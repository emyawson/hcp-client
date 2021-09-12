import { createBrowserHistory } from 'history';
import { identity } from 'ramda';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore, Reducer } from 'redux';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

import { isDevEnv } from 'src/utils';

import { appEpic } from './example.epics';
import { createRootReducer } from './example.reducer';
import { State } from './example.types';

export const history = createBrowserHistory();

const epicMiddleware = createEpicMiddleware(appEpic);

const middlewares = [epicMiddleware, routerMiddleware(history)];

if (isDevEnv()) {
  middlewares.push(logger);
}

const composeEnhancers = isDevEnv()
  ? typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose
  : identity;

export const store = createStore<State>(
  createRootReducer() as Reducer<State>,
  composeEnhancers(applyMiddleware(...middlewares)),
);
