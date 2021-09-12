import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import { getDepartmentProfileTypesStart } from 'src/core/department/department.actions';
import { mapDispatchers } from 'src/utils/map-dispatchers';
import { withNavigators } from 'src/utils/with-navigators';
import { createPatientStart } from 'src/widgets/patient/create-patient/store/create-patient.actions';

import { EditPatientComponent } from './edit-patient.component';
import { editPatientConnector } from './edit-patient.selectors';

const dispatchers = mapDispatchers({
  onCreatePatient: createPatientStart,
  getDepartmentProfileTypes: getDepartmentProfileTypesStart,
});

export const EditPatient = compose(
  withNavigators({ hasLeftNav: true, hasTopNav: true }),
  connect(
    editPatientConnector,
    dispatchers,
  ),
  withHandlers({
    getDepartmentProfileTypes: ({
      departmentId,
      getDepartmentProfileTypes,
    }) => () => getDepartmentProfileTypes({ departmentId }),
  }),
)(EditPatientComponent);
