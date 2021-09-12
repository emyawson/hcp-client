import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs'; // eslint-disable-line no-unused-vars
import { find, propEq } from 'ramda';

import { FETCH_PATIENT_REQUEST, PATIENT_ACTIONS } from './patient.constant';
import { patientChangeEpic, fetchPatientEpic } from './patient.epic';

describe('Patient change epic', () => {
  it('dispatches the correct actions', done => {
    const expectedOutputActionTypeOne = FETCH_PATIENT_REQUEST.START;
    const expectedOutputActionPayloadOne = { patientId: 1 };
    const expectedOutputActionTypeTwo = PATIENT_ACTIONS.CLEAR_PATIENT_STATE;

    const action$ = ActionsObservable.of({
      type: PATIENT_ACTIONS.SWITCH_PATIENT,
      payload: 1,
    });
    const emittedActions = [];
    patientChangeEpic()(action$, {}).subscribe(
      outputAction => emittedActions.push(outputAction),
      e => null,
      () => {
        const emittedActionOne = find(
          propEq('type', expectedOutputActionTypeOne),
        )(emittedActions);
        const emittedActionTwo = find(
          propEq('type', expectedOutputActionTypeTwo),
        )(emittedActions);

        expect(emittedActions.length).toEqual(3);
        expect(emittedActionOne).toBeDefined();
        expect(emittedActionOne.payload).toEqual(
          expectedOutputActionPayloadOne,
        );
        expect(emittedActionTwo).toBeDefined();
        expect(emittedActionTwo.payload).toEqual(null);
        done();
      },
    );
  });
});

describe('Fetch patient epic', () => {
  it('dispatches the correct action when it is successful', () => {
    const expectedOuputActionType = FETCH_PATIENT_REQUEST.SUCCESS;
    const mockOutput = { id: 123 };
    const action$ = ActionsObservable.of({
      type: FETCH_PATIENT_REQUEST.START,
      payload: { patientId: 1 },
    });
    const mockFetchPatientService = () => Promise.resolve(mockOutput);
    const store = {
      getState: () => ({
        session: {
          token: '12345',
        },
      }),
    };

    fetchPatientEpic(mockFetchPatientService)(action$, store).subscribe(
      actualOutputAction => {
        expect(actualOutputAction.type).toEqual(expectedOuputActionType);
        expect(actualOutputAction.payload).toEqual(mockOutput);
      },
    );
  });
});
