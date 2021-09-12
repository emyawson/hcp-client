import { patientReducer, INITIAL_PATIENT_STATE } from './patient.reducers';
import { FETCH_PATIENT_REQUEST, PATIENT_ACTIONS } from './patient.constant';

describe('Patient reducer tests', () => {
  it('should put patient information into the store', () => {
    expect(
      patientReducer(INITIAL_PATIENT_STATE, {
        type: FETCH_PATIENT_REQUEST.SUCCESS,
        payload: { id: 123 },
      }),
    ).toEqual({ id: 123 });
  });
  it('should clear all patient data', () => {
    const mockState = {
      id: 1234,
      name: 'patient name',
    };
    expect(
      patientReducer(mockState, {
        type: PATIENT_ACTIONS.CLEAR_PATIENT_STATE,
      }),
    ).toEqual(INITIAL_PATIENT_STATE);
  });
  it('should return the default state', () => {
    expect(
      patientReducer(INITIAL_PATIENT_STATE, { type: 'SOME_ACTION' }),
    ).toEqual(INITIAL_PATIENT_STATE);
  });
});
