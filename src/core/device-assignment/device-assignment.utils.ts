import { path, pipe } from 'ramda';

type RoutesMap = Map<string, any>;

export const selectPatientDashboardUrl = (routes: RoutesMap): string =>
  path(['patient', 'patientById'])(routes);

export const createPatientDashboardUrlByPatient = (patientId: number) => (
  url: string,
): string => url.replace(':id', patientId.toString());

export const constructAssignedPatientDashboardUrl = (
  patientId: number,
  routes: RoutesMap,
): string =>
  pipe(
    selectPatientDashboardUrl,
    createPatientDashboardUrlByPatient(patientId),
  )(routes);
