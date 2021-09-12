import { onPatientDatesRangeChange } from './patient-date-range.action';
import { PATIENT_DATE_ACTIONS } from './patient-date-range.constant';

describe('Patient date range actions tests', () => {
  it('Creates the set dates action', () => {
    expect(
      onPatientDatesRangeChange(
        '123',
        '2017-11-29T15:10:41.000Z',
        '2017-12-06T15:10:41.000Z',
      ),
    ).toEqual({
      type: PATIENT_DATE_ACTIONS.SET_DATES,
      payload: {
        patientId: '123',
        startDate: '2017-11-29T15:10:41.000Z',
        endDate: '2017-12-06T15:10:41.000Z',
      },
    });
  });
});
