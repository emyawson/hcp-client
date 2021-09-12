import * as enzyme from 'enzyme';
import * as React from 'react';
import { ThemeProvider } from 'styled-components';

export const shallowWithTheme = (tree, theme) => {
  const context = enzyme.shallow(<ThemeProvider theme={theme} />).instance();
  return enzyme.shallow(tree, { context });
};

export const mountWithTheme = (tree, theme) => {
  const context = enzyme.shallow(<ThemeProvider theme={theme} />).instance();

  return enzyme.mount(tree, {
    context,
    childContextTypes: ThemeProvider.childContextTypes, // Needed so child components receive the theme prop
  });
};
