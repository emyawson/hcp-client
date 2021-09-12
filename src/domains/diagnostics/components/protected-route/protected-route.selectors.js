import { createStructuredSelector } from 'reselect';

import {
  getIsValidSession,
  selectHasLoggedOut,
} from 'src/domains/diagnostics/core/authentication';
import { getCombinedRoutes } from 'src/domains/diagnostics/store/diagnostics-selector-old';

export const protectedRouteConnector = createStructuredSelector({
  isAuthenticated: getIsValidSession,
  routes: getCombinedRoutes,
  hasLoggedOut: selectHasLoggedOut,
});
