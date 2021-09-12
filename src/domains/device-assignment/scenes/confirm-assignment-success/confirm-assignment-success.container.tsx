import { connect } from 'react-redux';
import { compose } from 'recompose';
import { doneDeviceAssignment } from 'src/core';
import { mapDispatchers } from 'src/utils';

import { deviceAssignmentConnector } from '../device-assignment/device-assignment.selectors';

import { ConfirmAssignmentSuccessComponent } from './confirm-assignment-success.component';
import {
  ConfirmAssignmentSuccessContainerProps,
  ConfirmAssignmentSuccessProps,
} from './confirm-assignment-success.types';

const dispatchers = mapDispatchers({
  onComplete: doneDeviceAssignment,
});

export const ConfirmAssignmentSuccessContainer = compose<
  ConfirmAssignmentSuccessProps,
  ConfirmAssignmentSuccessContainerProps
>(
  connect(
    deviceAssignmentConnector,
    dispatchers,
  ),
)(ConfirmAssignmentSuccessComponent);
