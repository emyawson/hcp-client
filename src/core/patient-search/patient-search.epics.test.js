import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs'; // eslint-disable-line no-unused-vars

import { SEARCH_PATIENTS_REQUEST } from './patient-search.constants';
import { getPatientSearchEpic } from './patient-search.epics';

describe('patient search epic', () => {
  const mockOutput = [
    {
      id: '1234',
    },
  ];
  it('dispatches the correct action when it is successful', done => {
    const expectedOutputActionType = SEARCH_PATIENTS_REQUEST.SUCCESS;
    const mockPatientSearchService = () => Promise.resolve(mockOutput);

    const action$ = ActionsObservable.of({
      type: SEARCH_PATIENTS_REQUEST.START,
    });

    const store = {
      getState: () => ({
        session: {
          token: '12345',
        },
      }),
    };

    getPatientSearchEpic(mockPatientSearchService)(action$, store).subscribe(
      actualOutputAction => {
        expect(actualOutputAction.type).toEqual(expectedOutputActionType);
        expect(actualOutputAction.payload).toEqual(mockOutput);
        done();
      },
    );
  });
});
