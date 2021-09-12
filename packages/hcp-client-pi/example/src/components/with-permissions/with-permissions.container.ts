import { connect } from 'react-redux';
import { compose, mapProps } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { selectCurrentPermissions } from 'src/core/permissions/permissions.selectors';
import {
  getPermissions,
  hasPermissions,
} from 'src/core/permissions/permissions.utils';

import { WithPermissionsComponent } from './with-permissions.component';
import {
  WithPermissionComponentProps,
  WithPermissionContainerProps,
  WithPermissionProps,
} from './with-permissions.types';

const permissionConnector = createStructuredSelector({
  currentPermissions: selectCurrentPermissions,
});

const mapPermissions = () =>
  mapProps((props: WithPermissionContainerProps) => ({
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

export const WithPermissions = compose<
  WithPermissionComponentProps,
  WithPermissionProps
>(
  connect(permissionConnector),
  mapPermissions(),
)(WithPermissionsComponent);
