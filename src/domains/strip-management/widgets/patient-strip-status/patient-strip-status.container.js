import React from 'react';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import {
  getDeliveryStatusRequest,
  saveDeliveryRequest,
} from 'src/core/strip-delivery';
import { mapDispatchers } from 'src/utils';
import { withPermissions } from 'src/utils/with-permissions/with-permissions';
import { PERMISSIONS, verifyPermission } from 'src/core/permissions';

import { StripStatusCardExpanded, StripStatusCard } from './components';
import { patientStripStatusConnector } from './patient-strip-status.selector';

import { SendPatientStatusModalContainer } from '../send-patient-status-modal';

const dispatchers = mapDispatchers({
  getDeliveryStatusRequest: getDeliveryStatusRequest.start,
  saveDeliveryRequest: saveDeliveryRequest.start,
});
export const patientStripStatusHandlers = {
  deliverStripsToPatient: ({ saveDeliveryRequest, patientDelivery }) => () =>
    saveDeliveryRequest(patientDelivery),
  onUpdateStripStatus: ({
    getDeliveryStatusRequest,
    patientId,
    permissions,
  }) => () =>
    getDeliveryStatusRequest({
      patientId,
      hasForceStatus: verifyPermission(permissions)(
        PERMISSIONS.STRIP_FORCE_STATUS,
      ),
      hasModal: true,
      modalComponent: SendPatientStatusModalContainer,
    }),
};

const addPatientStripStatus = compose(
  connect(
    patientStripStatusConnector,
    dispatchers,
  ),
  withHandlers(patientStripStatusHandlers),
);

const StripStatusCardWithHandlers = addPatientStripStatus(StripStatusCard);
const StripStatusCardExpandedWithHandlers = addPatientStripStatus(
  StripStatusCardExpanded,
);

export const CollapsedPatientStripStatusContainer = compose(
  withPermissions({
    permissions: [PERMISSIONS.STRIP_FORCE_STATUS],
    onAccessDenied: props => <StripStatusCardWithHandlers {...props} />,
  }),
  addPatientStripStatus,
)(StripStatusCardWithHandlers);

export const ExpandedPatientStripStatusContainer = compose(
  withPermissions({
    permissions: [PERMISSIONS.STRIP_FORCE_STATUS],
    onAccessDenied: props => <StripStatusCardExpandedWithHandlers {...props} />,
  }),
  addPatientStripStatus,
)(StripStatusCardExpandedWithHandlers);
