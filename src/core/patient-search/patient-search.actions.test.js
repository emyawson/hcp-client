import { SEARCH_PATIENTS_REQUEST } from './patient-search.constants';
import { search } from './patient-search.actions';

describe('action test suite', () => {
  it('should trigger a search action', () => {
    expect(search({ fullName: 'Dave Harrison', patientID: '13234' })).toEqual({
      type: SEARCH_PATIENTS_REQUEST.START,
      payload: {
        fullName: 'Dave Harrison',
        patientID: '13234',
      },
    });
  });
  it('should trigger a search for all patients if form left empty', () => {
    expect(search({})).toEqual({
      type: SEARCH_PATIENTS_REQUEST.START,
      payload: {
        fullName: '',
        patientID: '',
      },
    });
  });
});
