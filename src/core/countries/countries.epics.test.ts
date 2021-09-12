import 'rxjs';
import { sessionReducer } from 'src/core/authentication/authentication.reducers';
import { cleanupMockEndpoints, mockCountryEndpoint } from 'src/test';
import { createMockStore } from 'src/test/create-mock-store';
import { countryService } from 'src/services/country';

import { fetchCountriesStart } from './countries.actions';
import { countriesEpic } from './countries.epics';
import { countriesReducer } from './countries.reducer';

describe('authentication epic test', () => {
  let store;
  beforeAll(() => {
    mockCountryEndpoint({
      status: 200,
      body: {
        model: [
          {
            id: 'en',
          },
        ],
      },
    });
    const mockState = {
      session: {
        token: '1324',
        isValid: false,
        hasLoggedOut: false,
        isAuthenticated: true,
      },
    };
    store = createMockStore({
      state: mockState,
      reducers: { session: sessionReducer, countries: countriesReducer },
      epics: countriesEpic(countryService({ devMode: false })),
    });
  });

  afterAll(() => {
    cleanupMockEndpoints();
  });

  it('should execute authentication task when the epic is fired', async () => {
    store.dispatch(fetchCountriesStart());
    await store.update(['countries']);
    expect(store.getState()).toEqual({
      countries: { data: [{ id: 'en' }], error: '', isLoading: false },
      session: {
        hasLoggedOut: false,
        isAuthenticated: true,
        isValid: false,
        token: '1324',
      },
    });
  });
});
