import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { mapDispatchers, addLocalFormDispatchHandlers } from 'src/utils';
import { saveDeliveryStatusCommentRequest } from 'src/core/strip-delivery';

import { SendPatientStatusModal } from './send-patient-status-modal.component';
import { sendPatientStatusModalConnector } from './send-patient-status-modal.selectors';

const dispatchers = mapDispatchers({
  saveDeliveryStatusCommentRequest: saveDeliveryStatusCommentRequest.start,
});

const addHandlers = withHandlers({
  onSubmitPatientStatusComment: ({
    saveDeliveryStatusCommentRequest,
    destroyModal,
    deliveryStatusId,
    patientId,
  }) => ({ comment }) => {
    saveDeliveryStatusCommentRequest({
      comment,
      deliveryStatusId,
      patientId,
    });
  },
});

export const SendPatientStatusModalContainer = compose(
  connect(
    sendPatientStatusModalConnector,
    dispatchers,
  ),
  addLocalFormDispatchHandlers,
  addHandlers,
)(SendPatientStatusModal);
