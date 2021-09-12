import * as React from 'react';

import { Bundle } from 'src/components/bundle';
import { EXAMPLE_CONFIG } from 'src/constants';
import i18n from 'src/i18n';
import { injectEpic, injectModuleReducer, store } from 'src/store';
import { theme } from 'src/theme';

export const AlertSettingsBundle = (props: any = {}) => (
  <Bundle
    bundleWillLoad={async () => {
      const {
        createAlertSettingsModule,
      } = await import(/* webpackChunkName: "alertSettings" */ '@roche/patterns-indicators/domains/alert-settings');
      return {
        component: createAlertSettingsModule(
          store,
          injectModuleReducer,
          injectEpic,
          EXAMPLE_CONFIG,
          initialConfig => () => initialConfig,
          theme,
          i18n,
        ),
      };
    }}
    bundleDidLoad={Component => <Component {...props} />}
  />
);
