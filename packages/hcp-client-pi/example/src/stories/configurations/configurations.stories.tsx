import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'src/theme';

import { ConfigurationsBundle } from 'src/bundles/configurations/configurations.bundle';
import i18n from 'src/i18n';
import { store } from 'src/store';
import { theme } from 'src/theme';

import ConfigurationsInfo from './configurations.info.md';

storiesOf(`Configurations`, module)
  .addDecorator(story => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>{story()}</I18nextProvider>
      </ThemeProvider>
    </Provider>
  ))
  .addDecorator(withKnobs)
  .add(
    'Configurations',
    withInfo(ConfigurationsInfo)(() => <ConfigurationsBundle />),
  );
