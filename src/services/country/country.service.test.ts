import {
  cleanupMockEndpoints,
  mockCountryEndpoint,
} from 'src/test/mock-endpoints';

import { countryService } from './country.service';

describe('permissions service test', () => {
  beforeAll(() => {
    mockCountryEndpoint({
      status: 200,
      body: {
        model: [
          {
            id: 1,
            name: 'Spain',
            isoCode: 'es',
            labelProperty: 'configuration.country.es',
            labelText: 'Spain',
            language: {
              id: 1,
              languageId: '1',
              labelProperty: 'enum.Spanish',
              labelText: null,
              isoCode: 'es',
              key: '1',
              value: null,
            },
          },
        ],
      },
    });
  });
  afterAll(() => {
    cleanupMockEndpoints();
  });
  it('should bootstrap a service that calls the permissions endpoint', async () => {
    const data = await countryService({ devMode: false })({ token: '123' });
    expect(data).toEqual([
      {
        id: 1,
        isoCode: 'es',
        labelProperty: 'configuration.country.es',
        labelText: 'Spain',
        language: {
          id: 1,
          isoCode: 'es',
          key: '1',
          labelProperty: 'enum.Spanish',
          labelText: null,
          languageId: '1',
          value: null,
        },
        name: 'Spain',
      },
    ]);
  });
});
