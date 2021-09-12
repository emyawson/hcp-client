import createBrowserHistory from 'history/createBrowserHistory';
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import i18nConfig from 'src/i18n';

export const MockProvider = ({ children, store, i18n = i18nConfig }) => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <ConnectedRouter history={createBrowserHistory()}>
        {children}
      </ConnectedRouter>
    </I18nextProvider>
  </Provider>
);
