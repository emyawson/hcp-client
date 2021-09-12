import { getJSON } from 'src/utils';
import { Config } from 'src/core';

import {
  TimeIntervalLoaderImpl,
  TimeIntervalTransformImpl,
  TimeIntervalServiceImpl,
} from './time-interval.service';
import { mockTimeIntervals } from './time-interval.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

jest.mock('src/utils/loaders');

describe('TimeInterval Service Test Suite', () => {
  const patientId = 12345;
  const token = 'magic token';
  const mockResponse = mockTimeIntervals;
  const responseTransform = TimeIntervalTransformImpl;

  beforeEach(() => {
    getJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    getJSON.mockResolvedValue(mockResponse);

    it('should call the API url with the provided patientId', done => {
      expect.assertions(1);

      TimeIntervalLoaderImpl({ patientId }, token).then(data => {
        expect(getJSON).toBeCalledWith(
          `${BASE_URL}/patients/${patientId}/time-intervals`,
          {},
          { Authorization: `Bearer ${token}` },
        );
        done();
      });
    });
  });

  describe('Response Transform', () => {
    it('should pass only the required fields to the FE', () => {
      const transformed = responseTransform(mockResponse);
      expect(transformed[0].label).toBeUndefined();
      expect(transformed[0].description).toBeDefined();
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      expect.assertions(1);

      TimeIntervalServiceImpl(getJSON, responseTransform)(
        { patientId },
        token,
      ).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
