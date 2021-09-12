import * as React from 'react';

import { Bundle } from 'src/components/bundle';
import { EXAMPLE_CONFIG } from 'src/constants';
import i18n from 'src/i18n';
import { injectEpic, injectModuleReducer, store } from 'src/store';
import { theme } from 'src/theme';

const alertSettingsBundleWillLoad = async () => {
  const {
    createPatternsAndIndicators,
  } = await import(/* webpackChunkName: "patternsAndIndicators" */ '@roche/patterns-indicators/app');
  return {
    component: createPatternsAndIndicators(
      store,
      injectModuleReducer,
      injectEpic,
      EXAMPLE_CONFIG,
      initialConfig => () => initialConfig,
      theme,
      i18n,
    ),
  };
};

const alertSettingsBundleDidLoad = props => Component => (
  <Component {...props} />
);

export const AppBundle = (props: any = {}) => (
  <Bundle
    bundleWillLoad={alertSettingsBundleWillLoad}
    bundleDidLoad={alertSettingsBundleDidLoad(props)}
  />
);
