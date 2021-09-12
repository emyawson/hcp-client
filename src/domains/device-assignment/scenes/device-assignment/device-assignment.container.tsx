import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose, lifecycle, withHandlers } from 'recompose';
import { cancelDeviceAssignment, getDeviceAssociationStart } from 'src/core';
import { createModal, MODAL_TYPES } from 'src/core/modal';
import { mapDispatchers } from 'src/utils';
import { withNavigators } from 'src/utils/with-navigators';

import { CancelConfirmationModal } from '../cancel-confirmation-modal';

import { DeviceAssignmentComponent } from './device-assignment.component';
import { deviceAssignmentConnector } from './device-assignment.selectors';
import { DeviceAssignmentProps } from './device-assignment.types';

export const DeviceAssignmentContainer = compose<DeviceAssignmentProps, {}>(
  connect(
    deviceAssignmentConnector,
    mapDispatchers({
      getDeviceAssociation: getDeviceAssociationStart,
      cancelDeviceAssignment,
      createModal,
    }),
  ),
  withHandlers({
    onCancel: ({ createModal, cancelDeviceAssignment }) => () =>
      createModal({
        key: MODAL_TYPES.CUSTOM,
        data: {
          customComponent: CancelConfirmationModal,
          onConfirmCancel: cancelDeviceAssignment,
        },
      }),
  }),
  withNavigators({ hasLeftNav: true, hasTopNav: true }),
  withRouter,
  lifecycle<DeviceAssignmentProps, void>({
    componentDidMount() {
      const {
        getDeviceAssociation,
        match: { params },
      } = this.props;
      const associationId = params.associationId;
      if (associationId) {
        getDeviceAssociation(associationId);
      }
    },
  }),
)(DeviceAssignmentComponent);
