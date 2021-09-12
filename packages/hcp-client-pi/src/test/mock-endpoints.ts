import * as nock from 'nock';

export const cleanupMockEndpoints = () => nock.cleanAll();

// Mock endpoints will intercept fetch calls made in epic tests
// Undefined strings cover cases where test environment does not get API variables
// -- In these cases, we will need to intercept calls to URLs like:
// -- 'http://localhost/undefined/undefined/authenticate'
// TODO: Remove fallbacks when Jenkins loads .env file properly
export const apiDomain = 'http://localhost:3000';

export const mockEndpointUrls = {
  base: `/api/v1`,
  getBGValues: `/api/v1/econecta/bgvalues`,
  indicatorsConfigurationTemplate: `https://univ-uploader-dev.rochedc.accentureanalytics.com/hcp-backend-pi/v1/indicators-configuration-template`,
};

export const addMockEndpointDomain = url => `${apiDomain}${url}`;

export const mockBaseEndpoint = headers =>
  nock(addMockEndpointDomain(mockEndpointUrls.base), headers);

export const mockAuthentication = ({ status, body }) =>
  nock(addMockEndpointDomain(mockEndpointUrls.getBGValues))
    .persist()
    .get('')
    .reply(status, body);

export const mockIndicatorsConfigurationTemplate = ({ status, body }) =>
  nock(addMockEndpointDomain(mockEndpointUrls.indicatorsConfigurationTemplate))
    .persist()
    .get('')
    .query({
      profile_type: 'test',
    })
    .reply(status, body);
