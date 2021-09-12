import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import { PiProfileSetupBundle } from 'src/bundles/pi-profile-setup/pi-profile-setup.bundle';
import i18n from 'src/i18n';
import { store } from 'src/store';
import { theme, ThemeProvider } from 'src/theme';

storiesOf(`Configurations`, module)
  .addDecorator(story => (
    <Provider store={store}>
      {<I18nextProvider i18n={i18n}>{story()}</I18nextProvider>}
    </Provider>
  ))
  .add('Pi Profile Setup', () => (
    <ThemeProvider theme={theme}>
      <PiProfileSetupBundle />
    </ThemeProvider>
  ));
