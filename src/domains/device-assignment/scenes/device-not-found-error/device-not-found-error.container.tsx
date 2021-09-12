import { connect } from 'react-redux';
import { compose } from 'recompose';

import { cancelDeviceAssignment } from '../../../../core';
import { mapDispatchers } from '../../../../utils';
import { deviceAssignmentConnector } from '../device-assignment/device-assignment.selectors';

import { DeviceNotFoundErrorComponent } from './device-not-found-error.component';
import { DeviceNotFoundErrorProps } from './device-not-found-error.types';

const dispatchers = mapDispatchers({
  onCancel: cancelDeviceAssignment,
});

export const DeviceNotFoundErrorContainer = compose<
  DeviceNotFoundErrorProps,
  {}
>(
  connect(
    deviceAssignmentConnector,
    dispatchers,
  ),
)(DeviceNotFoundErrorComponent);
