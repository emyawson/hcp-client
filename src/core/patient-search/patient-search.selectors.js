import { path } from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';

import { getCombinedRoutes } from 'src/navigation/navigation.selectors';

export const getPatientSearch = path(['patientSearch']);

export const getSearchResults = createSelector(
  getPatientSearch,
  patientSearch => path(['data'], patientSearch),
);

export const getDidSearch = createSelector(getPatientSearch, patientSearch =>
  path(['didSearch'], patientSearch),
);

export const getPatientName = createSelector(getPatientSearch, patientSearch =>
  path(['fullName'], patientSearch),
);
export const getPatientID = createSelector(getPatientSearch, patientSearch =>
  path(['patientID'], patientSearch),
);
export const getSearchBarOptions = createSelector(
  getPatientSearch,
  patientSearch => path(['searchBar'], patientSearch),
);

export const patientSearchConnector = createStructuredSelector({
  results: getSearchResults,
  didSearch: getDidSearch,
  routes: getCombinedRoutes,
});
