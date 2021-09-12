import { createSelector, createStructuredSelector } from 'reselect';
import { path } from 'ramda';
import { compose } from 'recompose';
import { connect } from 'react-redux';

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

const permissionConnector = createStructuredSelector({
  currentPermissions: selectCurrentPermissions,
});

export const connectToPermissions = Component =>
  compose(connect(permissionConnector))(Component);
