import { compose } from 'recompose';

import { CreatePatientComponent } from 'src/domains/patient/scenes/create-patient/create-patient.component';
import { withNavigators } from 'src/utils/with-navigators';

export const CreatePatient = compose(
  withNavigators({ hasLeftNav: true, hasTopNav: true }),
)(CreatePatientComponent);
