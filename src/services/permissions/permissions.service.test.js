import { getJSON } from 'src/utils';
import { Config } from 'src/core';

import {
  PermissionsServiceLoaderImpl,
  transformPermissions,
  PermissionsService,
} from './permissions.service';
import { mockPermissions } from './permissions.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

jest.mock('src/utils/loaders');

describe('Permissions Service Test Suite', () => {
  const token = 'magic token';
  const mockResponse = mockPermissions;
  const responseTransform = transformPermissions;

  beforeEach(() => {
    getJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    getJSON.mockResolvedValue(mockResponse);

    it('should call the API url', done => {
      expect.assertions(1);

      PermissionsServiceLoaderImpl({}, token).then(data => {
        expect(getJSON).toBeCalledWith(
          `${BASE_URL}/permissions`,
          {},
          { Authorization: `Bearer ${token}` },
        );
        done();
      });
    });
  });

  describe('Response Transform', () => {
    it('convert permission names for use as front end flags', () => {
      const transformed = responseTransform(mockResponse);
      expect(transformed[0]).toBeDefined();
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      expect.assertions(1);

      PermissionsService(getJSON, responseTransform)({}, token).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
