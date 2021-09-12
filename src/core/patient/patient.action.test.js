import { switchPatient, clearPatientState } from './patient.action';
import { PATIENT_ACTIONS } from './patient.constant';

describe('Patient action creator test suite', () => {
  it('should create action to switch patient', () => {
    expect(switchPatient(1)).toEqual({
      type: PATIENT_ACTIONS.SWITCH_PATIENT,
      payload: 1,
    });
  });

  it('should create action to clear patient state', () => {
    expect(clearPatientState()).toEqual({
      type: PATIENT_ACTIONS.CLEAR_PATIENT_STATE,
      payload: null,
    });
  });
});
