import { compose } from 'recompose';
import { connect } from 'react-redux';

import { mapDispatchers } from 'src/utils';
import { withNavigators } from 'src/utils/with-navigators';

import { Patients } from './patients.component';
import { patientsConnector } from './store/patients.selector';
import { getAllPatients } from './store/patients.action';

const dispatchers = mapDispatchers({
  getAllPatients,
});

export const PatientsContainer = compose(
  connect(
    patientsConnector,
    dispatchers,
  ),
  withNavigators({ hasLeftNav: true, hasTopNav: true }),
)(Patients);
