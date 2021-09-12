import type { PatientId } from '../patient';

export type GlucoseValue = number;

export type WrappedGlucoseValue = {
  value: GlucoseValue,
};

export type GlucoseMeasurement = {
  value: GlucoseValue,
  date: Date,
  beforeMeal: boolean,
  afterMeal: boolean,
  aboveTargetRange: boolean,
  belowTargetRange: boolean,
  hypoSymptoms: boolean,
};

export type GlucoseMeasurementQuery = {
  patientId: PatientId,
};

export type ServerGlucoseMeasurement = {
  glucose: number,
  carbohydrates: number | null,
  date: string,
  beforeMeal: boolean,
  afterMeal: boolean,
  flagAboveTargetRange: boolean,
  flagBelowTargetRange: boolean,
  hypoSymptoms: boolean,
};

export type ServerGlucoseMeasurements = {
  glucoseValues: Array<ServerGlucoseMeasurement>,
};
