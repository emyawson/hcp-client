import { connect } from 'react-redux';
import { compose, mapProps } from 'recompose';
import { createStructuredSelector } from 'reselect';

import {
  selectCurrentPermissions,
  selectCurrentPatientPermissions,
  hasPermissions,
  getPermissions,
} from 'src/domains/diagnostics/core/permissions/index';

import { WithPermissionsComponent } from './with-permissions.component';

const permissionConnector = createStructuredSelector({
  currentPermissions: selectCurrentPermissions,
});

const patientPermissionsConnector = createStructuredSelector({
  currentPermissions: selectCurrentPatientPermissions,
});

const mapPermissions = () =>
  mapProps(props => ({
    ...props,
    hasAccess: hasPermissions({
      toValidate: props.hasPermissions,
      current: props.currentPermissions,
    }),
    permissions: getPermissions({
      permissions: props.hasPermissions,
      current: props.currentPermissions,
    }),
  }));

export const WithPermissions = compose(
  connect(permissionConnector),
  mapPermissions(),
)(WithPermissionsComponent);

export const WithPatientPermissions = compose(
  connect(patientPermissionsConnector),
  mapPermissions(),
)(WithPermissionsComponent);
