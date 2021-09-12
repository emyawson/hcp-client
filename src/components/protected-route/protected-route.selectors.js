import { createStructuredSelector } from 'reselect';

import { getIsValidSession, selectHasLoggedOut } from 'src/core/authentication';
import { getCombinedRoutes } from 'src/navigation/navigation.selectors';

export const protectedRouteConnector = createStructuredSelector({
  hasLoggedOut: selectHasLoggedOut,
  isAuthenticated: getIsValidSession,
  routes: getCombinedRoutes,
});
