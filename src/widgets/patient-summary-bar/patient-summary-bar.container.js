import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { mapDispatchers } from 'src/utils';
import { fetchPatientRequest } from 'src/core';

import { PatientSummaryBar } from './patient-summary-bar.component';
import { patientSummaryBarConnector } from './store/patient-summary-bar.selector';

const dispatchers = mapDispatchers({
  onFetchPatient: fetchPatientRequest.start,
});

const addLifeCycles = lifecycle({
  componentDidMount() {
    const { onFetchPatient } = this.props;
    const patientId = this.props.match.params.id;
    onFetchPatient({ patientId });
  },
});

export const PatientSummaryBarContainer = compose(
  connect(
    patientSummaryBarConnector,
    dispatchers,
  ),
  withRouter,
  addLifeCycles,
)(PatientSummaryBar);
