import { connect } from 'react-redux';
import { compose } from 'recompose';

import {
  confirmDeviceAssignment,
  deselectDeviceAssignmentPatient,
} from 'src/core';
import { mapDispatchers } from 'src/utils';

import { deviceAssignmentConnector } from '../device-assignment/device-assignment.selectors';

import { ConfirmAssignmentComponent } from './confirm-assignment.component';
import {
  ConfirmAssignmentContainerProps,
  ConfirmAssignmentProps,
} from './confirm-assignment.types';

const dispatchers = mapDispatchers({
  onConfirmAssignment: confirmDeviceAssignment,
  onChangePatient: deselectDeviceAssignmentPatient,
});

export const ConfirmAssignmentContainer = compose<
  ConfirmAssignmentProps,
  ConfirmAssignmentContainerProps
>(
  connect(
    deviceAssignmentConnector,
    dispatchers,
  ),
)(ConfirmAssignmentComponent);
