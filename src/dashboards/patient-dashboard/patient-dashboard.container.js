import React from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import { PatientStatusNotificationModalContainer } from 'src/domains/strip-management/widgets';
import { mapDispatchers } from 'src/utils';
import {
  getTimeIntervalsRequest,
  getThresholdsRequest,
  getDeliveryRequest,
  getLastDeliveryStatusRequest,
  saveDeliveryRequest,
  setDeliveryStatusRequest,
  fetchPatientDateRangeRequest,
  getCurrentPrescriptionRequest,
  fetchPatientPermissions,
} from 'src/core';
import { verifyPermission } from 'src/core/permissions/permissions.utils';

import { PatientDashboard } from './patient-dashboard.component';
import { patientDashboardConnector } from './store/patient-dashboard.selector';
import { changeGraph, changeGraphType, changeLogbookType } from './store';

import { withNavigators } from '../../utils/with-navigators';
import { withPermissions } from '../../utils/with-permissions/with-permissions';
import { PERMISSIONS } from '../../core/permissions/permissions.constants';

const dispatchers = mapDispatchers({
  changeGraph,
  changeGraphType,
  changeLogbookType,
  onFetchPatientDateRange: fetchPatientDateRangeRequest.start,
  getTimeIntervals: getTimeIntervalsRequest.start,
  getThresholdsRequest: getThresholdsRequest.start,
  getDeliveryRequest: getDeliveryRequest.start,
  saveDeliveryRequest: saveDeliveryRequest.start,
  setDeliveryStatusRequest: setDeliveryStatusRequest.start,
  getCurrentPrescriptionRequest: getCurrentPrescriptionRequest.start,
  onFetchPatientPermissions: fetchPatientPermissions.start,
  getLastDeliveryStatusRequest: getLastDeliveryStatusRequest.start,
});

const PatientDashboardWithLifecycle = lifecycle({
  componentDidMount() {
    const {
      onFetchPatientDateRange,
      onFetchPatientPermissions,
      getTimeIntervals,
      getDeliveryRequest,
      getThresholdsRequest,
      getCurrentPrescriptionRequest,
      match: { params },
      permissions,
      getLastDeliveryStatusRequest,
      endDate,
    } = this.props;

    const patientId = params.id;

    if (!endDate) {
      onFetchPatientDateRange({ patientId });
    }

    onFetchPatientPermissions({ patientId });
    getTimeIntervals({ patientId });
    getLastDeliveryStatusRequest({
      patientId,
      hasModal: true,
      modalComponent: PatientStatusNotificationModalContainer,
      hasForceStatus: verifyPermission(permissions)(
        PERMISSIONS.STRIP_FORCE_STATUS,
      ),
    });
    getDeliveryRequest({ patientId });
    getThresholdsRequest({ patientId });
    getCurrentPrescriptionRequest({ patientId });
  },
})(PatientDashboard);

export const PatientDashboardContainer = compose(
  connect(
    patientDashboardConnector,
    dispatchers,
  ),
  withNavigators({ hasLeftNav: true, hasTopNav: true }),
  withPermissions({
    permissions: [
      PERMISSIONS.TREATMENT_LIST,
      PERMISSIONS.USER_SHOW_GRAPHIC_CONFIG,
      PERMISSIONS.PATIENT_MANAGEMENT_DELETE,
      PERMISSIONS.TIME_BLOCKS_MANAGEMENT,
      PERMISSIONS.STRIP_TRAFFIC_LIGHT,
      PERMISSIONS.DELIVERY_PROFESSIONAL,
      PERMISSIONS.STRIP_FORCE_STATUS,
    ],
    onAccessDenied: props => <PatientDashboardWithLifecycle {...props} />,
  }),
)(PatientDashboardWithLifecycle);
