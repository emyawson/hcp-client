import { compose, lifecycle } from 'recompose';
import { equals, not, pipe } from 'ramda';

import { hasValue } from 'src/utils';
import {
  connectToPermissions,
  PERMISSIONS,
  verifyPermission,
} from 'src/core/permissions';

export const hasPatientDiagnostics = permissionList =>
  verifyPermission(permissionList)(PERMISSIONS.PATIENT_DIAGNOSTICS);

export const hasPatientDiagnosticsPermissionChanged = (
  currentPermissions,
  nextPermissions,
) =>
  hasValue(currentPermissions)
    ? pipe(
        hasPatientDiagnostics,
        equals(hasPatientDiagnostics(currentPermissions)),
        not,
      )(nextPermissions)
    : hasValue(nextPermissions);

export const addDiagnosticsPermissionLifecycle = Component =>
  lifecycle({
    shouldComponentUpdate({ currentPermissions: nextPermissions }) {
      return hasPatientDiagnosticsPermissionChanged(
        this.props.currentPermissions,
        nextPermissions,
      );
    },
  })(Component);
export const connectWithDiagnosticsPermissionsLifecycle = compose(
  connectToPermissions,
  addDiagnosticsPermissionLifecycle,
);
