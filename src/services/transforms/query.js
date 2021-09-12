import { propOr } from 'ramda';

export const withQueryPatientId = query => values => ({
  ...values,
  patientId: propOr(null, 'patientId')(query),
});
