import { connect } from 'react-redux';
import { compose } from 'recompose';
import { confirmDevice } from 'src/core';
import { mapDispatchers, withToolTip } from 'src/utils';

import { deviceAssignmentConnector } from '../device-assignment/device-assignment.selectors';

import { ConfirmDeviceComponent } from './confirm-device.component';
import {
  ConfirmDeviceContainerProps,
  ConfirmDeviceProps,
} from './confirm-device.types';

const dispatchers = mapDispatchers({
  onConfirmDevice: confirmDevice,
});

export const ConfirmDeviceContainer = compose<
  ConfirmDeviceProps,
  ConfirmDeviceContainerProps
>(
  connect(
    deviceAssignmentConnector,
    dispatchers,
  ),
  withToolTip,
)(ConfirmDeviceComponent);
