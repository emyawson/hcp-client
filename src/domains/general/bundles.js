import React from 'react';

import { Bundle } from 'src/navigation/bundle';

export const HomeBundle = props => (
  <Bundle
    bundleWillLoad={async () => {
      const {
        Home,
      } = await import(/* webpackChunkName: "home" */ './scenes/home');
      return Home;
    }}
    bundleDidLoad={Home => <Home {...props} />}
  />
);

export const HelpBundle = props => (
  <Bundle
    bundleWillLoad={async () => {
      const {
        HelpContainer,
      } = await import(/* webpackChunkName: "login" */ './scenes/help');
      return HelpContainer;
    }}
    bundleDidLoad={HelpContainer => <HelpContainer {...props} />}
  />
);
