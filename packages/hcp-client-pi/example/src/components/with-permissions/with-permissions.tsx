import * as React from 'react';
import { compose, mapProps } from 'recompose';

import { WithPermissions } from './with-permissions.container';
import { WithPermissionProps } from './with-permissions.types';

export const withPermissions = ({
  permissions,
  onVerification = () => null,
  onAccessDenied = () => null,
}) => Component =>
  compose<WithPermissionProps, any>(
    mapProps(props => ({
      ...props,
      hasPermissions: permissions,
      onVerification,
      onAccessDenied,
      onRender: (onRenderProps: WithPermissionProps) => (
        <Component {...onRenderProps} />
      ),
    })),
  )(WithPermissions);
