import { createSelector } from 'reselect';

import { State } from 'src/app/store/app.types';
import { getIn } from 'src/utils/ramda';

export const selectCountriesState = (state: State) =>
  getIn(['countries'], state);

export const selectCountries = createSelector(
  [selectCountriesState],
  countryState => countryState.data,
);
