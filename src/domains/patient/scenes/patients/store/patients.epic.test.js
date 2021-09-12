import { ActionsObservable } from 'redux-observable';

import { mockPatientsListData } from 'src/services';

import { getPatientsListEpic } from './patients.epic';
import { PATIENTS_ACTIONS } from './patients.constant';

describe('patients epic', () => {
  it('dispatches the correct action when it is successful', done => {
    const expectedOutputActionType = PATIENTS_ACTIONS.SET_PATIENTS;
    const mockPatientsService = () => Promise.resolve(mockPatientsListData);

    const action$ = ActionsObservable.of({
      type: PATIENTS_ACTIONS.GET_PATIENTS,
    });
    const store = {
      getState: () => ({
        session: { token: '12345' },
      }),
    };

    getPatientsListEpic(mockPatientsService)(action$, store).subscribe(
      actualOutputAction => {
        expect(actualOutputAction.type).toEqual(expectedOutputActionType);
        expect(actualOutputAction.payload).toEqual(mockPatientsListData);
        done();
      },
    );
  });
});
