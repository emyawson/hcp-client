import { createStructuredSelector } from 'reselect';

import { selectPatient } from 'src/core/patient';

export const orgStripManagementConnector = createStructuredSelector({
  //TODO: replace placeholder
  patient: selectPatient,
});
