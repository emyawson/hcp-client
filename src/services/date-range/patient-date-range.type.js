import type { PatientId } from '../patient';

type MeasurementDate = string;

export type ServerDateRange = {
  firstMeasurement: MeasurementDate,
  lastMeasurement: MeasurementDate,
};

export type DateRange = {
  firstMeasurement: MeasurementDate,
  lastMeasurement: MeasurementDate,
};

export type DateRangeQuery = {
  patientId: PatientId,
};
