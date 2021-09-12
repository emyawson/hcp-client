import type { PatientId } from '../patient';

type TimeIntervalDescription =
  | 'BEFORE_BREAKFAST'
  | 'AFTER_BREAKFAST'
  | 'BEFORE_LUNCH'
  | 'AFTER_LUNCH'
  | 'BEFORE_DINNER'
  | 'AFTER_DINNER'
  | 'BEDTIME'
  | 'NIGHT';

type ServerTimeBlock = {
  id: number,
  description: TimeIntervalDescription,
  startTime: string,
  endTime: string,
};

export type ServerTimeIntervals = {
  id: number,
  patientId: string,
  timeIntervals: ServerTimeBlock[],
};

export type TimeInterval = {
  id: number,
  description: TimeIntervalDescription,
  startTime: string,
  endTime: string,
};

export type TimeIntervalQuery = {
  patientId: PatientId,
};
