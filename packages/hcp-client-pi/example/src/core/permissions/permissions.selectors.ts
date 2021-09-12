import { path } from 'ramda';
import { createSelector } from 'reselect';

import { transformPermissions } from './permissions.utils';

export const selectPermissionState = path(['permissions']);
export const selectCurrentPermissions = createSelector(
  selectPermissionState,
  permissions => transformPermissions(permissions),
);
