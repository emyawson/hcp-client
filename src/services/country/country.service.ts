import { Config } from 'src/core';
import { getJSON } from 'src/utils/service';

import { createService } from '../service';

import { CountryData, CountryOptions, CountryService } from './country.types';

const { REACT_APP_EC6_API_ROOT } = Config;

const countryTransform = countryData => countryData.model;

/**
 * @param {string} token
 * @returns {Promise<CountryData>}
 *
 * Note: the token is without bearer attached to it because EC6 directly expect it without
 */
const countryRequest = ({ token }: CountryOptions): Promise<CountryData> =>
  getJSON(`${REACT_APP_EC6_API_ROOT}/eConecta/rest/api/country`, {
    headers: {
      Authorization: token,
    },
  });

export const countryService = ({ devMode = false }): CountryService => {
  if (devMode) {
    return createService(() => Promise.resolve({} as any), countryTransform);
  }
  return createService(countryRequest, countryTransform);
};
