import { connect } from 'react-redux';
import { compose } from 'recompose';

import { cancelDeviceAssignment } from '../../../../core';
import { mapDispatchers } from '../../../../utils';
import { deviceAssignmentConnector } from '../device-assignment/device-assignment.selectors';

import { ConfirmDeviceErrorComponent } from './confirm-device-error.component';
import { ConfirmDeviceErrorProps } from './confirm-device-error.types';

const dispatchers = mapDispatchers({
  onCancel: cancelDeviceAssignment,
});

export const ConfirmDeviceErrorContainer = compose<ConfirmDeviceErrorProps, {}>(
  connect(
    deviceAssignmentConnector,
    dispatchers,
  ),
)(ConfirmDeviceErrorComponent);
