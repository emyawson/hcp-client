import { compose, lifecycle, withHandlers, mapProps } from 'recompose';
import { connect } from 'react-redux';
import { pathOr, equals, or } from 'ramda';

import { mapDispatchers, addLocalFormDispatchHandlers } from 'src/utils';
import { getThresholdsRequest } from 'src/core';
import { getAlertsRequest, saveAlertsRequest } from 'src/core/alerts';

import { Alerts } from './alerts.component';
import { createRowsFromThresholdValues } from './alerts.utils';
import { alertsConnector } from './store/alerts.selectors';
import { alertThresholdRowDetails } from './alerts.constants';

import { addPatientStripManagement } from '../patient-strip-management/patient-strip-management.container';

const dispatchers = mapDispatchers({
  getThresholdsRequest: getThresholdsRequest.start,
  getAlertsRequest: getAlertsRequest.start,
  saveAlertsRequest: saveAlertsRequest.start,
});

const alertsHandlers = {
  onUpdateThresholdLimit: ({ updateValue }) => model => value =>
    updateValue(model, value),
  onSaveAlerts: ({ match, saveAlertsRequest }) => alertSettings => {
    const patientId = pathOr(null, ['params', 'id'])(match);
    if (patientId) {
      saveAlertsRequest({ patientId, alertSettings });
    }
  },
};
const addLifecycle = lifecycle({
  componentDidMount() {
    const {
      getAlertsRequest,
      getThresholdsRequest,
      match: { params },
    } = this.props;
    const patientId = params.id;
    if (patientId) {
      getAlertsRequest({ patientId });
      getThresholdsRequest({ patientId });
    }
  },
  componentWillReceiveProps(nextProps) {
    const { alertSettings, updateValue } = this.props;
    if (!equals(nextProps.alertSettings, alertSettings)) {
      updateValue('alerts', nextProps.alertSettings);
    }
  },
});

const alertsMapProps = props => ({
  ...props,
  hasError: or(props.thresholdsHasError, props.alertsHasError),
  alertThresholdRows: createRowsFromThresholdValues({
    hypoThresholds: props.hypoThresholds,
    hyperThresholds: props.hyperThresholds,
    warningThresholds: props.warningThresholds,
  })(alertThresholdRowDetails),
});

export const AlertsContainer = compose(
  connect(
    alertsConnector,
    dispatchers,
  ),
  addLocalFormDispatchHandlers,
  withHandlers(alertsHandlers),
  mapProps(alertsMapProps),
  addLifecycle,
  addPatientStripManagement,
)(Alerts);
