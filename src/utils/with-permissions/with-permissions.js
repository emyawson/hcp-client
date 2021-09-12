import React from 'react';
import { compose, mapProps } from 'recompose';

import {
  WithPermissions,
  WithPatientPermissions,
} from './with-permissions.container';

export const withPermissions = ({
  permissions,
  onVerification = () => null,
  onAccessDenied = () => null,
}) => Component =>
  compose(
    mapProps(props => ({
      ...props,
      hasPermissions: permissions,
      onVerification,
      onAccessDenied,
      onRender: props => <Component {...props} />,
    })),
  )(WithPermissions);

export const withPatientPermissions = ({
  permissions,
  onVerification = () => null,
  onAccessDenied = () => null,
}) => Component =>
  compose(
    mapProps(props => ({
      ...props,
      hasPermissions: permissions,
      onVerification,
      onAccessDenied,
      onRender: props => <Component {...props} />,
    })),
  )(WithPatientPermissions);
