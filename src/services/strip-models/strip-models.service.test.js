import { getJSON } from 'src/utils';
import { Config } from 'src/core';

import {
  StripModelsLoaderImpl,
  StripModelsTransform,
  StripModelsServiceImpl,
} from './strip-models.service';
import { mockStripModels } from './strip-models.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

jest.mock('src/utils/loaders');

describe('StripModels Service Test Suite', () => {
  const token = 'magic token';
  const clinicId = 123;
  const departmentId = 5000;
  const mockResponse = mockStripModels;
  const responseTransform = StripModelsTransform;

  beforeEach(() => {
    getJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    getJSON.mockResolvedValue(mockResponse);

    it('should call the API url with the correct clinic and department IDs', done => {
      expect.assertions(1);

      StripModelsLoaderImpl({ clinicId, departmentId }, token).then(data => {
        expect(getJSON).toBeCalledWith(
          `${BASE_URL}/strip-models`,
          { centerId: clinicId, departmentId },
          { Authorization: `Bearer ${token}` },
        );
        done();
      });
    });
  });

  describe('Response Transform', () => {
    it('should all server data to the FE', () => {
      const transformed = responseTransform(mockResponse);
      expect(transformed).toEqual(mockResponse);
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      expect.assertions(1);

      StripModelsServiceImpl(getJSON, responseTransform)(
        { clinicId, departmentId },
        token,
      ).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
