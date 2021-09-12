import { createSelector } from 'reselect';
import { path } from 'ramda';

import { transformPermissions } from './permissions.utils';

export const selectPermissionState = path(['permissions']);
export const selectPatientPermissionState = path(['patientPermissions']);
export const selectCurrentPermissions = createSelector(
  selectPermissionState,
  permissions => transformPermissions(permissions),
);
export const selectCurrentPatientPermissions = createSelector(
  selectPatientPermissionState,
  permissions => transformPermissions(permissions),
);
