import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { mapDispatchers } from 'src/utils';
import {
  showCustomClinicGuidesForm,
  hideCustomClinicGuidesForm,
  getClinicGuidesRequest,
  setGuideHistoryFilter,
  getTherapiesRequest,
  deleteClinicGuideRequest,
  setGuideHistoryPage,
} from 'src/core/prescription/prescription.actions';
import { hasValue } from 'src/utils';
import { createModal, MODAL_TYPES } from 'src/core/modal';

import { CustomClinicGuides } from './custom-clinic-guides.component';
import { customClinicGuidesConnector } from './store';

import { addPatientStripManagement } from '../patient-strip-management/patient-strip-management.container';
import { DeleteCustomGuideModal } from '../../widgets/delete-custom-guide-modal';

const dispatchers = mapDispatchers({
  showCustomClinicGuidesForm,
  hideCustomClinicGuidesForm,
  setGuideHistoryFilter,
  getClinicGuidesRequest: getClinicGuidesRequest.start,
  getTherapiesRequest: getTherapiesRequest.start,
  createModal,
  deleteClinicGuideRequest: deleteClinicGuideRequest.start,
  setGuideHistoryPage,
});

const addLifecycle = lifecycle({
  componentDidMount() {
    const { getClinicGuidesRequest } = this.props;
    getClinicGuidesRequest();
  },
});

const onClickRemoveCustomGuideHandler = ({
  createModal,
  deleteClinicGuideRequest,
}) => ({ clinicGuideName, clinicGuideId }) =>
  createModal({
    key: MODAL_TYPES.CUSTOM,
    data: {
      customComponent: DeleteCustomGuideModal,
      onDeleteClinicGuideRequest: deleteClinicGuideRequest,
      clinicGuideName,
      clinicGuideId,
    },
  });

const addHandlers = withHandlers({
  onClickRemoveCustomGuide: onClickRemoveCustomGuideHandler,
});

export const addTherapiesLifecycle = lifecycle({
  componentDidMount() {
    const { getTherapiesRequest, therapies } = this.props;
    if (!hasValue(therapies)) {
      getTherapiesRequest();
    }
  },
});

export const CustomClinicGuidesContainer = compose(
  connect(
    customClinicGuidesConnector,
    dispatchers,
  ),
  addPatientStripManagement,
  addLifecycle,
  addTherapiesLifecycle,
  addHandlers,
)(CustomClinicGuides);
