import { getJSON } from 'src/utils';
import { Config } from 'src/core';

import {
  PrescriptionReasonsLoaderImpl,
  PrescriptionReasonsTransform,
  PrescriptionReasonsServiceImpl,
} from './prescription-reasons.service';
import { mockPrescriptionReasons } from './prescription-reasons.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

jest.mock('src/utils/loaders');

describe('PrescriptionReasons Service Test Suite', () => {
  const token = 'magic token';
  const mockResponse = mockPrescriptionReasons;
  const responseTransform = PrescriptionReasonsTransform;

  beforeEach(() => {
    getJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    getJSON.mockResolvedValue(mockResponse);

    it('should call the API url', done => {
      expect.assertions(1);

      PrescriptionReasonsLoaderImpl({}, token).then(data => {
        expect(getJSON).toBeCalledWith(
          `${BASE_URL}/prescription-reasons`,
          {},
          { Authorization: `Bearer ${token}` },
        );
        done();
      });
    });
  });

  describe('Response Transform', () => {
    it('should pass all server data to the FE', () => {
      const transformed = responseTransform(mockResponse);
      expect(transformed).toEqual(mockResponse);
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      expect.assertions(1);

      PrescriptionReasonsServiceImpl(getJSON, responseTransform)(
        {},
        token,
      ).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
