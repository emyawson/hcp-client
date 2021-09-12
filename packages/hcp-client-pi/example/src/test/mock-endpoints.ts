import * as nock from 'nock';

import { getDynamicConfig } from 'src/utils';

export const cleanupMockEndpoints = () => nock.cleanAll();

// Mock endpoints will intercept fetch calls made in epic tests
// Undefined strings cover cases where test environment does not get API variables
// -- In these cases, we will need to intercept calls to URLs like:
// -- "http://localhost/undefined/undefined/authenticate"
// TODO: Remove fallbacks when Jenkins loads .env file properly
const apiRoot = getDynamicConfig().REACT_APP_API_ROOT;
const apiVersion = getDynamicConfig().REACT_APP_API_VERSION;
const apiDomain = '';

export const mockEndpointUrls = {
  permissions: `/${apiRoot}/${apiVersion}/patients/1/permissions`,
  base: `/${apiRoot}/${apiVersion}/`,
};

export const addMockEndpointDomain = url => `${apiDomain}${url}`;

export const mockBaseEndpoint = headers =>
  nock(addMockEndpointDomain(mockEndpointUrls.base), headers);

export const mockPermissionsEndpoint = ({ status, body }) =>
  nock(addMockEndpointDomain(mockEndpointUrls.permissions))
    .persist()
    .get('')
    .reply(status, body);
