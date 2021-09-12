import { getJSON } from 'src/utils';
import { Config } from 'src/core';

import {
  TherapiesLoaderImpl,
  TherapiesTransformImpl,
  TherapiesServiceImpl,
} from './therapies.service';
import { mockTherapiess } from './therapies.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

jest.mock('src/utils/loaders');

describe('Therapies Service Test Suite', () => {
  const token = 'magic token';
  const mockResponse = mockTherapiess;
  const responseTransform = TherapiesTransformImpl;

  beforeEach(() => {
    getJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    getJSON.mockResolvedValue(mockResponse);

    it('should call the API url with the provided patientId', done => {
      expect.assertions(1);

      TherapiesLoaderImpl(null, token).then(data => {
        expect(getJSON).toBeCalledWith(
          `${BASE_URL}/therapies`,
          {},
          { Authorization: `Bearer ${token}` },
        );
        done();
      });
    });
  });

  describe('Response Transform', () => {
    it('should pass all server fields to the FE', () => {
      const transformed = responseTransform(mockResponse);
      expect(transformed).toEqual(mockResponse);
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      expect.assertions(1);

      TherapiesServiceImpl(getJSON, responseTransform)(null, token).then(
        result => {
          expect(result).toEqual(responseTransform(mockResponse));
          done();
        },
      );
    });
  });
});
