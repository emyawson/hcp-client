import { selectPatient, selectPatientId } from './patient.selector';

describe('Patient selector test suite', () => {
  const state = {
    patient: {
      id: 123,
      name: 'bram',
    },
  };
  it('should select the patient', () => {
    expect(selectPatient(state)).toEqual({ id: 123, name: 'bram' });
  });
  it('should select the patient ID', () => {
    expect(selectPatientId(state)).toEqual(123);
  });
});
