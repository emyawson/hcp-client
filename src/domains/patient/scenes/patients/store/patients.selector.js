import { createStructuredSelector } from 'reselect';
import { path } from 'ramda';

export const selectPatients = path(['patientList', 'patients']);
export const selectIsFetching = path(['patientList', 'isFetchingPatients']);

export const patientsConnector = createStructuredSelector({
  patients: selectPatients,
  isFetchingPatients: selectIsFetching,
});
