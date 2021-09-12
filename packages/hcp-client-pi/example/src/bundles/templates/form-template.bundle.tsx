import * as React from 'react';

import { Bundle } from 'src/components/bundle';

const formTemplateBundleWillLoad = async () => {
  const {
    FormTemplateComponent,
  } = await import(/* webpackChunkName: "form-template" */ '@roche/patterns-indicators/components');
  return {
    component: FormTemplateComponent,
  };
};

const formTemplateBundleDidLoad = props => Component => (
  <Component {...props} />
);

export const FormTemplateBundle = props => (
  <Bundle
    bundleWillLoad={formTemplateBundleWillLoad}
    bundleDidLoad={formTemplateBundleDidLoad(props)}
  />
);
