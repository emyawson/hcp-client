import { getJSON } from 'src/utils/service/service.utils';

import {
  ProfileTypesLoaderImpl,
  ProfileTypesTransformImpl,
  ProfileTypesServiceImpl,
} from './profile-types.service';
import { mockResponse } from './profile-types.mock';

jest.mock('src/utils/service/service.utils');

describe('Create Patient Service Test', () => {
  const departmentId = 123;
  const token = 'magic token';
  const responseTransform = ProfileTypesTransformImpl;

  afterAll(() => {
    // @ts-ignore
    getJSON.mockClear();
  });

  describe('JSON Loader', () => {
    // @ts-ignore
    getJSON.mockResolvedValue(mockResponse);

    it('should call api to create patient for a professional by ID', done => {
      ProfileTypesLoaderImpl({ departmentId: 123 }, token).then(data => {
        expect(data).toEqual(mockResponse);
        done();
      });
    });
  });

  describe('Response Transform', () => {
    it('should strip the server result description and return status', () => {
      const transformed = responseTransform(mockResponse);
      expect(transformed).toEqual(mockResponse.model);
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      expect.assertions(1);
      ProfileTypesServiceImpl(getJSON, responseTransform)(
        { departmentId },
        token,
      ).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
