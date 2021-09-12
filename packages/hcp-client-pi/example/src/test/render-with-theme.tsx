import * as enzyme from 'enzyme';
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import i18nConfig from 'src/i18n';
import { theme, ThemeProvider } from 'src/theme';

export const shallowWithTheme = (tree, themeObj) => {
  const context = enzyme.shallow(<ThemeProvider theme={themeObj} />).instance();
  return enzyme.shallow(tree, { context });
};

export const mountWithTheme = (tree, themeObj) => {
  const context = enzyme.shallow(<ThemeProvider theme={themeObj} />).instance();
  return enzyme.mount(tree, {
    context,
    childContextTypes: ThemeProvider.childContextTypes,
  });
};

export const mountWithThemeConnected = (tree, store) => {
  return enzyme.mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18nConfig}>
        <ThemeProvider theme={theme}>{tree}</ThemeProvider>
      </I18nextProvider>
    </Provider>,
  );
};
