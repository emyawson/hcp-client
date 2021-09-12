import * as React from 'react';

import { Bundle } from 'src/components/bundle';
import { EXAMPLE_CONFIG } from 'src/constants';
import i18n from 'src/i18n';
import { injectEpic, injectModuleReducer, store } from 'src/store';
import { theme } from 'src/theme';

export const PiProfileSetupBundle = () => (
  <Bundle
    bundleWillLoad={async () => {
      const {
        createPiProfileSetupModule,
      } = await import(/* webpackChunkName: "piProfileSetup" */ '@roche/patterns-indicators/domains/pi-profile-setup');

      return {
        component: createPiProfileSetupModule(
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
    bundleDidLoad={Component => <Component />}
  />
);
