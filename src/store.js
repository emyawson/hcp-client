import { keys } from 'ramda';
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { routerMiddleware } from 'react-router-redux';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';

import { appEpic } from './epic';
import { reducers } from './reducer';
import { devMode, localMode } from './core';

const showDevTools = devMode || localMode;

const history = createHistory();

const colors = {
  default: '#383838',
  clear_: '#7C394B',
  _error: '#E33231',
  _success: '#4CAF50',
  _start: '#03A9F4',
  undefined: '#8ADBDE',
  gigya: '#B25FD6',
  redirect: '#12505F',
};
const mapColor = () => {
  const colorCache = {};
  return title => {
    if (colorCache[title]) return colorCache[title];
    let color;
    keys(colors).forEach(key => {
      if (!color && title.toLowerCase().match(key)) {
        color = colors[key];
        colorCache[title] = color;
      }
    });
    return color ? color : colors.default;
  };
};

function _getMiddleware() {
  let middleware = [createEpicMiddleware(appEpic), routerMiddleware(history)];
  const cachedColorMapper = mapColor();
  if (showDevTools) {
    const logger = createLogger({
      collapsed: true,
      duration: true,
      colors: {
        title: action => action.type && cachedColorMapper(action.type),
        prevState: () => '#E33231',
        action: () => '#03A9F4',
        nextState: () => '#4CAF50',
        error: () => '#E33231',
      },
    });
    middleware = [...middleware, logger];
  }

  return applyMiddleware(...middleware);
}

function _getEnhancers() {
  let enhancers = [];

  if (showDevTools && window.devToolsExtension) {
    enhancers = [...enhancers, window.devToolsExtension()];
  }

  return enhancers;
}

function _enableHotLoader(store) {
  if (localMode && module.hot) {
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer');
      store.replaceReducer(nextRootReducer);
    });
  }
}

function _createPersistedReducer(reducers) {
  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['session'],
  };

  return persistCombineReducers(persistConfig, reducers);
}

export const configureStore = initialState => {
  const store = compose(
    _getMiddleware(),
    ..._getEnhancers(),
  )(createStore)(_createPersistedReducer(reducers), initialState);

  const persistor = persistStore(store);

  _enableHotLoader(store);
  return {
    store: {
      ...store,
      persistor,
    },
    persistor,
    history,
  };
};
