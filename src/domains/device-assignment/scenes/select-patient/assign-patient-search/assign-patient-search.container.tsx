import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { compose, withHandlers } from 'recompose';

import { toggleCreatePatientView } from 'src/core/device-assignment/device-assignment.actions';
import { patientSearchConnector, search } from 'src/core/patient-search/index';
import { switchPatient } from 'src/core/patient/patient.action';
import { mapDispatchers } from 'src/utils/index';

import { AssignPatientSearch } from './assign-patient-search.component';
import { AssignPatientSearchProps } from './assign-patient-search.types';

const dispatchers = mapDispatchers({
  onSearch: search,
  switchPatient,
  toggleCreatePatientView,
});

export const AssignPatientSearchContainer = compose<
  AssignPatientSearchProps,
  {}
>(
  connect(
    patientSearchConnector,
    dispatchers,
  ),
  withHandlers({
    onCreatePatient: ({ dispatch, routes }) => () =>
      dispatch(push(routes.patient.createPatient)),
    onSearch: (props: AssignPatientSearchProps) => ({
      patientID,
      fullName,
    }) => {
      return props.onSearch({ patientID, fullName });
    },
  }),
)(AssignPatientSearch);
