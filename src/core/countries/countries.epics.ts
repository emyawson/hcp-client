import { Epic } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { State } from 'src/app/store/app.types';
import {
  fetchCountriesError,
  fetchCountriesSuccess,
} from 'src/core/countries/countries.actions';
import { CountryService } from 'src/services/country/country.types';

import { getToken } from '../authentication/authentication.selectors';

import { CountriesActions, CountriesActionType } from './countries.types';

export const countriesEpic = (
  service: CountryService,
): Epic<CountriesActions, State> => (action$, store$) =>
  action$
    .ofType(CountriesActionType.FETCH_COUNTRIES_START)
    .debounceTime(1000)
    .switchMap(() => {
      const token = getToken(store$.getState());
      return Observable.fromPromise(service({ token }))
        .map(data => fetchCountriesSuccess(data))
        .pipe(catchError(err => Observable.of(fetchCountriesError(err))));
    });
