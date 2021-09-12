import { pathOr } from 'ramda';

export const selectPatientStock = pathOr(null, ['patientStock']);
