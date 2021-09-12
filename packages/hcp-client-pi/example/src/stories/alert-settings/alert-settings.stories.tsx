import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'src/theme';

import { AlertSettingsBundle } from 'src/bundles/alert-settings/alert-settings.bundle';
import i18n from 'src/i18n';
import { store } from 'src/store';
import { theme } from 'src/theme';

import AlertSettingsInfo from './alert-settings.info.md';

import {
  configDetails,
  configState,
  translationText,
  validationConfig,
} from './config';

storiesOf(`Alert Settings`, module)
  .addDecorator(story => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>{story()}</I18nextProvider>
      </ThemeProvider>
    </Provider>
  ))
  .addDecorator(withKnobs)
  .add(
    'Personal Alert Settings menu',
    withInfo(AlertSettingsInfo)(() => (
      <AlertSettingsBundle
        validationConfig={validationConfig}
        configDetails={configDetails}
        configState={configState}
        translationText={translationText}
      />
    )),
  );
