import { getJSON } from 'src/utils';
import { Config } from 'src/core';

import {
  GetPatientStockLoaderImpl,
  GetPatientStockTransformImpl,
  GetPatientStockServiceImpl,
} from './get-patient-stock.service';
import { mockPatientStockData } from './get-patient-stock.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

jest.mock('src/utils/loaders');

describe('GetPatientStock Service Test Suite', () => {
  const patientId = 12345;
  const stripModelId = 5000;
  const token = 'magic token';
  const mockResponse = mockPatientStockData;
  const responseTransform = GetPatientStockTransformImpl;

  beforeEach(() => {
    getJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    getJSON.mockResolvedValue(mockResponse);

    it('should call the API url with the provided patientId', done => {
      expect.assertions(1);

      GetPatientStockLoaderImpl({ patientId, stripModelId }, token).then(
        data => {
          expect(getJSON).toBeCalledWith(
            `${BASE_URL}/patients/${patientId}/strips-information`,
            { stripModelId },
            { Authorization: `Bearer ${token}` },
          );
          done();
        },
      );
    });
  });

  describe('Response Transform', () => {
    it('should rename fields for the FE', () => {
      const transformed = responseTransform(mockResponse);
      expect(transformed.patientStock).toBeUndefined();
      expect(transformed.stock).toBeDefined();
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      expect.assertions(1);

      GetPatientStockServiceImpl(getJSON, responseTransform)(
        { patientId, stripModelId },
        token,
      ).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
