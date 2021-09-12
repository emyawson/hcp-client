import {
  getPatientID,
  getPatientName,
  getSearchBarOptions,
  getSearchResults,
  getDidSearch,
} from './patient-search.selectors';

describe('patient-selector tests', () => {
  const state = {
    patientSearch: {
      data: [1],
      patientID: '123',
      fullName: 'David H',
      searchBar: {
        query: '123',
      },
      didSearch: false,
    },
  };
  it('should select the search results', () => {
    expect(getSearchResults(state)).toEqual([1]);
  });
  it('should select the name', () => {
    expect(getPatientName(state)).toEqual(state.patientSearch.fullName);
  });
  it('should select the id', () => {
    expect(getPatientID(state)).toEqual(state.patientSearch.patientID);
  });
  it('should select the search bar query', () => {
    expect(getSearchBarOptions(state)).toEqual(state.patientSearch.searchBar);
  });
  it('should select if the user has searched', () => {
    expect(getDidSearch(state)).toEqual(state.patientSearch.didSearch);
  });
});
