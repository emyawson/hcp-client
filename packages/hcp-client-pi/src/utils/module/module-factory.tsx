import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { combineEpics } from 'redux-observable';

import { ModuleFactory } from './module-factory.types';

export const createModule: ModuleFactory = (
  namespace,
  reducers,
  epics,
  validator,
  Component,
) => (store, injectReducer, injectEpic, config, configReducer, theme, i18n) => {
  if (!validator(config, theme, i18n)) {
    return () => null;
  }

  if (Object.keys(reducers).length) {
    injectReducer(store, namespace, {
      ...Object.assign(reducers),
      config: configReducer(config),
    });
  }

  if (epics.length) {
    injectEpic(combineEpics(...epics));
  }

  return props => (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Component {...props} />
      </I18nextProvider>
    </Provider>
  );
};
