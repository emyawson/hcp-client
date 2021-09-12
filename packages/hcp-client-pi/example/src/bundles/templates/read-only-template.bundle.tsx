import * as React from 'react';

import { Bundle } from 'src/components/bundle';

const readOnlyTemplateBundleWillLoad = async () => {
  const {
    ReadOnlyTemplateComponent,
  } = await import(/* webpackChunkName: "read-only-template" */ '@roche/patterns-indicators/components');
  return {
    component: ReadOnlyTemplateComponent,
  };
};

const readOnlyTemplateBundleDidLoad = props => Component => (
  <Component {...props} />
);

export const ReadOnlyTemplateBundle = props => (
  <Bundle
    bundleWillLoad={readOnlyTemplateBundleWillLoad}
    bundleDidLoad={readOnlyTemplateBundleDidLoad(props)}
  />
);
