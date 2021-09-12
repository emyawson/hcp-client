import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import { push } from 'react-router-redux';

import { fetchCountriesStart } from 'src/core/countries/countries.actions';
import { getDepartmentProfileTypesStart } from 'src/core/department/department.actions';
import { generalLinks } from 'src/domains/general/routes';
import { mapDispatchers } from 'src/utils';

import { CreatePatient } from './create-patient.component';
import {
  CreatePatientConnectProps,
  CreatePatientExternalProps,
} from './create-patient.types';
import { createPatientStart } from './store/create-patient.actions';
import { createPatientConnector } from './store/create-patient.selectors';

const dispatchers = mapDispatchers({
  onCreatePatient: createPatientStart,
  getDepartmentProfileTypes: getDepartmentProfileTypesStart,
  getCountries: fetchCountriesStart,
  goToHome: () => push(generalLinks.home),
});

export const CreatePatientWidget = compose<
  CreatePatientConnectProps,
  CreatePatientExternalProps
>(
  connect(
    createPatientConnector,
    dispatchers,
  ),
  withHandlers({
    getDepartmentProfileTypes: ({
      departmentId,
      getDepartmentProfileTypes,
    }) => () => getDepartmentProfileTypes({ departmentId }),
  }),
)(CreatePatient);
