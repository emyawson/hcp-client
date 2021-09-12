import * as React from 'react';

import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { AppBundle } from 'src/bundles/app/app.bundle';
import { theme, ThemeProvider } from 'src/theme';

import PatternsAndIndicatorsInfo from './patterns-and-indicators.info.md';

storiesOf(`Patterns and Indicators`, module)
  .addDecorator(withKnobs)
  .add(
    'App',
    withInfo(PatternsAndIndicatorsInfo)(() => (
      <ThemeProvider theme={theme}>
        <AppBundle />
      </ThemeProvider>
    )),
  );
