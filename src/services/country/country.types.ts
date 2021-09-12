import { Country } from 'src/core/countries/countries.types';

import { Service } from '../service.types';

export type CountryOptions = {
  readonly token: string;
};

export type CountryData = {
  model: Country[];
};

export type CountryService = Service<CountryOptions, Country[]>;
