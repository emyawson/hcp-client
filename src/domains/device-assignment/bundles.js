import React from 'react';

import { Bundle } from 'src/navigation';

export const DeviceAssignmentBundle = props => (
  <Bundle
    bundleWillLoad={async () => {
      const {
        DeviceAssignmentContainer,
      } = await import(/* webpackChunkName: "device-assignment" */ './scenes/device-assignment');
      return DeviceAssignmentContainer;
    }}
    bundleDidLoad={DeviceAssignmentContainer => (
      <DeviceAssignmentContainer {...props} />
    )}
  />
);
