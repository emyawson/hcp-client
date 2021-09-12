import { createStructuredSelector } from 'reselect';

import {
  getToken,
  getIsValidSession,
  selectHasTemporaryPassword,
} from 'src/core/authentication';
import { getCombinedRoutes } from 'src/navigation/navigation.selectors';

export const loginConnector = createStructuredSelector({
  routes: getCombinedRoutes,
  token: getToken,
  isSessionValid: getIsValidSession,
  hasTemporaryPassword: selectHasTemporaryPassword,
});
