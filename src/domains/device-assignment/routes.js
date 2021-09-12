import React from 'react';

import { ProtectedRoute } from 'src/components/protected-route/protected-route.container';

import { DeviceAssignmentBundle } from './bundles';

export const deviceAssignmentLinks = {
  associateDevice: '/associate-device/:associationId',
};

export const DeviceAssignmentRoutes = ({ path, ...props }) => [
  <ProtectedRoute
    key="device-assignment"
    exact
    path={deviceAssignmentLinks.associateDevice}
    component={props => <DeviceAssignmentBundle path={path} {...props} />}
  />,
];
