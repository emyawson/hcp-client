import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { mapDispatchers } from 'src/utils';
import { switchPatient } from 'src/core/patient/patient.action';
import { patientSearchConnector, search } from 'src/core/patient-search';

import { PatientSearchWidget } from './patient-search.component';

const dispatchers = mapDispatchers({
  search,
  switchPatient,
});

export const PatientSearchWidgetContainer = compose(
  connect(
    patientSearchConnector,
    dispatchers,
  ),
  withHandlers({
    onCreatePatient: ({ dispatch, routes }) => () =>
      dispatch(push(routes.patient.createPatient)),
    onSearch: props => ({ fullName, patientID }) =>
      props.search({ fullName, patientID }),
  }),
)(PatientSearchWidget);
