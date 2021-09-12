import {
  INITIAL_PATIENT_SEARCH_STATE,
  patientSearchReducer,
} from './patient-search.reducers';
import { SEARCH_PATIENTS_REQUEST } from './patient-search.constants';

describe('Patient search reducer tests', () => {
  const initial = {
    data: [],
    error: '',
  };
  const searchPayload = {
    data: [{ id: '1234' }],
  };
  it('Should put the patient results onto the store', () => {
    expect(
      patientSearchReducer(initial, {
        type: SEARCH_PATIENTS_REQUEST.SUCCESS,
        payload: {
          data: [{ id: '1234' }],
        },
      }),
    ).toMatchSnapshot();
    expect(
      patientSearchReducer(initial, {
        type: SEARCH_PATIENTS_REQUEST.SUCCESS,
        payload: {
          data: [{ id: '1234' }],
        },
      }),
    ).toEqual({
      ...initial,
      data: searchPayload,
      didSearch: true,
    });
  });
  it('Should register patient search error', () => {
    expect(
      patientSearchReducer(initial, {
        type: SEARCH_PATIENTS_REQUEST.ERROR,
        payload: searchPayload,
      }),
    ).toEqual({
      ...initial,
      error: searchPayload,
      didSearch: true,
    });
  });
  it('Should return initial state', () => {
    expect(patientSearchReducer(undefined, { type: 'OTHER_ACTION' })).toEqual(
      INITIAL_PATIENT_SEARCH_STATE,
    );
  });
});
