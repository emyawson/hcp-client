import { createStructuredSelector } from 'reselect';

import { selectPatient } from 'src/domains/diagnostics/core/patient';

export const patientSummaryBarConnector = createStructuredSelector({
  patient: selectPatient,
});
