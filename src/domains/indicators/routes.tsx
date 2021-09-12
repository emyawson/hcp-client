import * as React from 'react';
import { Switch } from 'react-router-dom';

import { ProtectedRoute } from 'src/components/protected-route';
import { PERMISSIONS } from 'src/core/permissions/permissions.constants';
import { AugmentedAdvancedIndicatorsBundleContainer } from 'src/domains/indicators/bundles';

export const indicatorsLinks = {
  main: '/patients/:id/advanced-indicators',
};

export const IndicatorsRoutes = () => (
  <Switch>
    <ProtectedRoute
      exact
      path={indicatorsLinks.main}
      component={AugmentedAdvancedIndicatorsBundleContainer}
      hasPermissions={[PERMISSIONS.ADVANCED_INDICATORS]}
    />
  </Switch>
);
