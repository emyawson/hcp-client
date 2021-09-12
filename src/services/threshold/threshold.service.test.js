import { getJSON } from 'src/utils';
import { Config } from 'src/core';

import {
  ThresholdLoaderImpl,
  ThresholdTransformImpl,
  ThresholdServiceImpl,
} from './threshold.service';
import { mockThresholds } from './threshold.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

jest.mock('src/utils/loaders');

describe('Threshold Service Test Suite', () => {
  const patientId = 12345;
  const token = 'magic token';
  const mockResponse = mockThresholds;
  const responseTransform = ThresholdTransformImpl;

  beforeEach(() => {
    getJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    getJSON.mockResolvedValue(mockResponse);

    it('should call the API url with the provided patientId', done => {
      expect.assertions(1);

      ThresholdLoaderImpl({ patientId }, token).then(data => {
        expect(getJSON).toBeCalledWith(
          `${BASE_URL}/patients/${patientId}/glucose-thresholds`,
          {},
          { Authorization: `Bearer ${token}` },
        );
        done();
      });
    });
  });

  describe('Response Transform', () => {
    it('should remove old formatting and rename keys for the FE', () => {
      const transformed = responseTransform(mockResponse);
      expect(transformed.beforeBed).toBeUndefined();
      expect(transformed.hyper).toBeDefined();
      expect(transformed.hyper.beforeBed).toBeUndefined();
      expect(transformed.hyper.preIdealInterval).toBeDefined();
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      expect.assertions(1);

      ThresholdServiceImpl(getJSON, responseTransform)(
        { patientId },
        token,
      ).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
