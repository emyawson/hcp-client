import centered from '@storybook/addon-centered';
import { withInfo } from '@storybook/addon-info';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import { CounterBundle } from 'src/bundles/counter/counter.bundle';
import i18n from 'src/i18n';
import { store } from 'src/store';

import CounterInfo from './counter.info.md';

storiesOf(`Advanced Indicators (Epic name)`, module)
  .addDecorator(centered)
  .addDecorator(story => (
    <Provider store={store}>
      {<I18nextProvider i18n={i18n}>{story()}</I18nextProvider>}
    </Provider>
  ))
  .add(
    '<Brief Summary of Feature> (Brief feature description / can encompass multiple stories)',
    withInfo(CounterInfo)(() => <CounterBundle />),
  );
