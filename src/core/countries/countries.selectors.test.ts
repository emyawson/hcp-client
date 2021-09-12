import { selectCountries } from 'src/core/countries/countries.selectors';

import { CountriesState, Country } from './countries.types';

describe('Patient selector test suite', () => {
  const countries: Country[] = [
    {
      id: 'en',
      name: 'en',
      isoCode: 'en',
      labelProperty: '',
      labelText: '',
      language: {
        id: '',
        languageId: '',
        labelProperty: '',
        labelText: '',
        isoCode: '',
        key: '',
        value: '',
      },
    },
  ];

  const countryState: CountriesState = {
    isLoading: false,
    data: countries,
    error: '',
  };

  const state: any = {
    countries: countryState,
  };

  it('should select the countries available', () => {
    expect(selectCountries(state)).toBe(countries);
  });
});
