import { path, pathOr } from 'ramda';

export const selectPatient = path(['patient']);
export const selectPatientId = pathOr(null, ['patient', 'id']);
export const selectPatientDevices = path(['patient', 'devices']);
