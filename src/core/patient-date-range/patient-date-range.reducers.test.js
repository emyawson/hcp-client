import {
  patientDateRangeReducer,
  INITIAL_PATIENT_DATE_RANGE_STATE,
} from './patient-date-range.reducers';
import {
  FETCH_PATIENT_DATE_RANGE_REQUEST,
  PATIENT_DATE_ACTIONS,
} from './patient-date-range.constant';

describe('Patient date range reducer tests', () => {
  it('Returns the initial state', () => {
    expect(patientDateRangeReducer(undefined, {})).toEqual(
      INITIAL_PATIENT_DATE_RANGE_STATE,
    );
  });
  it('Sets the correct date information on date range request success', () => {
    expect(
      patientDateRangeReducer(INITIAL_PATIENT_DATE_RANGE_STATE, {
        type: FETCH_PATIENT_DATE_RANGE_REQUEST.SUCCESS,
        payload: {
          firstMeasurement: new Date('2017-01-24T11:38:00.000Z').toISOString(),
          latestMeasurement: new Date('2018-03-05T08:32:00.000Z').toISOString(),
        },
      }),
    ).toEqual({
      firstMeasurementDate: new Date('2017-01-24T11:38:00.000Z').toISOString(),
      lastMeasurementDate: new Date('2018-03-05T08:32:00.000Z').toISOString(),
      startDate: new Date('2018-02-20T00:00:00.000Z').toISOString(),
      endDate: new Date('2018-03-05T23:59:59.999Z').toISOString(),
    });
  });
  it('Sets the start and end date', () => {
    expect(
      patientDateRangeReducer(INITIAL_PATIENT_DATE_RANGE_STATE, {
        type: PATIENT_DATE_ACTIONS.SET_DATES,
        payload: {
          startDate: new Date('2017-01-24T11:38:00.000Z').toISOString(),
          endDate: new Date('2018-03-05T08:32:00.000Z').toISOString(),
        },
      }),
    ).toEqual({
      ...INITIAL_PATIENT_DATE_RANGE_STATE,
      startDate: new Date('2017-01-24T00:00:00.000Z').toISOString(),
      endDate: new Date('2018-03-05T23:59:59.999Z').toISOString(),
    });
  });
});
