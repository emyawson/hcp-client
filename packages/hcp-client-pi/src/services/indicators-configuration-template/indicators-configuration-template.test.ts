import {
  cleanupMockEndpoints,
  mockEndpointUrls,
  mockIndicatorsConfigurationTemplate,
} from '@roche/patterns-indicators/test';

import { indicatorsConfigurationTemplateService } from './indicators-configuration-template';

describe('indicatorsConfigurationTemplateService test suite ', () => {
  const mockConfigState = {
    'indicator-category.1': {
      enabled: true,
    },
    'indicator.1.pattern.1': {
      enabled: true,
      key: 'value',
      field: 123,
    },
    'indicator.1.pattern.2': {
      enabled: false,
      key: 'value 2',
      field: 456,
    },
    'indicator-category.2': {
      enabled: false,
    },
  };
  const mockServiceOptions = { profileType: 'test' };

  beforeAll(() => {
    mockIndicatorsConfigurationTemplate({ status: 200, body: mockConfigState });
  });
  afterAll(() => {
    cleanupMockEndpoints();
  });
  it('Should successfully return transformed response', async () => {
    const response = await indicatorsConfigurationTemplateService(
      mockEndpointUrls.indicatorsConfigurationTemplate,
    )(mockServiceOptions);

    expect(response).toEqual(mockConfigState);
  });

  it('Should throw an error', async () => {
    mockIndicatorsConfigurationTemplate({
      status: 500,
      body: { error: 'some error' },
    });

    const response = await indicatorsConfigurationTemplateService(
      mockEndpointUrls.indicatorsConfigurationTemplate,
    )(mockServiceOptions);

    expect(response).toEqual(mockConfigState);
    cleanupMockEndpoints();
  });
});
