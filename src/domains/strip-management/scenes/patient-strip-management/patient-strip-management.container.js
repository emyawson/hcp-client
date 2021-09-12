import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isEmpty } from 'ramda';

import { mapDispatchers } from 'src/utils';
import { getDeliveryRequest, fetchPatientRequest } from 'src/core';
import { withNavigators } from 'src/utils/with-navigators';
import { getPatientStockRequest } from 'src/core';
import {
  getCurrentPrescriptionRequest,
  getStripModelsRequest,
} from 'src/core/prescription';

import { PatientStripManagementComp } from './patient-strip-management.component';
import { patientStripManagementConnector } from './store/patient-strip-management.selector';

const dispatchers = mapDispatchers({
  getPatientStockRequest: getPatientStockRequest.start,
  onFetchPatient: fetchPatientRequest.start,
  getDeliveryRequest: getDeliveryRequest.start,
  getCurrentPrescriptionRequest: getCurrentPrescriptionRequest.start,
  getStripModelsRequest: getStripModelsRequest.start,
});

export const addPatientStripManagement = Component =>
  compose(
    connect(
      patientStripManagementConnector,
      dispatchers,
    ),
    lifecycle({
      componentDidMount() {
        const patientId = this.props.match.params.id;
        const { clinicId, departmentId, stripModels } = this.props;

        this.props.onFetchPatient({ patientId });
        this.props.getDeliveryRequest({ patientId });
        this.props.getCurrentPrescriptionRequest({ patientId });

        if (isEmpty(stripModels)) {
          this.props.getStripModelsRequest({ clinicId, departmentId });
        }
      },
    }),
  )(Component);

export const PatientStripManagementWrapper = compose(
  withNavigators({
    hasLeftNav: true,
    hasTopNav: true,
  }),
  withRouter,
  addPatientStripManagement,
)(PatientStripManagementComp);
