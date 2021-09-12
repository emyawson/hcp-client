import React from 'react';

import { ProtectedRoute } from 'src/components/protected-route/protected-route.container';

import { HelpBundle, HomeBundle } from './bundles';

export const generalLinks = {
  home: '/home',
  dtc: '/dtc',
  help: '/help',
};

export const GeneralRoutes = () => [
  <ProtectedRoute
    key="home-route"
    exact
    path={generalLinks.home}
    component={HomeBundle}
  />,
  <ProtectedRoute key="help" exact path="/help" component={HelpBundle} />,
];
