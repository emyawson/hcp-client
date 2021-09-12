import { connect } from 'react-redux';
import { compose } from 'recompose';

import { cancelDeviceAssignment } from '../../../../core';
import { mapDispatchers } from '../../../../utils';
import { deviceAssignmentErrorConnector } from '../device-assignment/device-assignment.selectors';

import { ConfirmAssignmentError } from './confirm-assignment-error.component';
import {
  ConfirmAssignmentErrorContainerProps,
  ConfirmAssignmentErrorProps,
} from './confirm-assignment-error.types';

const dispatchers = mapDispatchers({
  onCancel: cancelDeviceAssignment,
});

export const ConfirmAssignmentErrorContainer = compose<
  ConfirmAssignmentErrorProps,
  ConfirmAssignmentErrorContainerProps
>(
  connect(
    deviceAssignmentErrorConnector,
    dispatchers,
  ),
)(ConfirmAssignmentError);
