import { getAllPatients, setPatients } from './patients.action';
import { INITIAL_SIGN_IN_STATE, patientsReducer } from './patients.reducer';

describe('Patients reducer', () => {
  it('should return the initial state', () => {
    // $FlowIgnore
    expect(patientsReducer(undefined, {})).toEqual(INITIAL_SIGN_IN_STATE);
  });

  it('properly captures getPatients dispatch to change patients state', () => {
    expect(patientsReducer(INITIAL_SIGN_IN_STATE, getAllPatients())).toEqual({
      patients: [],
      isFetchingPatients: true,
    });
  });

  it('properly captures setPatients dispatch to change patients state', () => {
    expect(
      patientsReducer(
        INITIAL_SIGN_IN_STATE,
        // $FlowIgnore
        setPatients(['patient1', 'patient2']),
      ),
    ).toEqual({
      patients: ['patient1', 'patient2'],
      isFetchingPatients: false,
    });
  });
});
