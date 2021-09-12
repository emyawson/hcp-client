import { createStructuredSelector } from 'reselect';

import { selectPatient } from 'src/core/patient';

export const patientSummaryBarConnector = createStructuredSelector({
  patient: selectPatient,
});
