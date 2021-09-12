import { getJSON } from 'src/utils';
import { Config } from 'src/core';

import {
  GetPatientSummaryLoaderImpl,
  GetPatientSummaryTransformImpl,
  GetPatientSummaryServiceImpl,
} from './get-patient-summary.service';
import { mockPatientSummaryData } from './get-patient-summary.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

jest.mock('src/utils/loaders');

describe('GetPatientSummary Service Test Suite', () => {
  const patientId = 12345;
  const token = 'magic token';
  const mockResponse = mockPatientSummaryData;
  const responseTransform = GetPatientSummaryTransformImpl;

  beforeEach(() => {
    getJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    getJSON.mockResolvedValue(mockResponse);

    it('should call the API url with the provided patientId', done => {
      expect.assertions(1);

      GetPatientSummaryLoaderImpl({ patientId }, token).then(data => {
        expect(getJSON).toBeCalledWith(
          `${BASE_URL}/patients/${patientId}/summary`,
          {},
          { Authorization: `Bearer ${token}` },
        );
        done();
      });
    });
  });

  describe('Response Transform', () => {
    it('rename server fields for the client', () => {
      const transformed = responseTransform(mockResponse);
      expect(transformed.name).toBeUndefined();
      expect(transformed.firstName).toBeDefined();
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      expect.assertions(1);

      GetPatientSummaryServiceImpl(getJSON, responseTransform)(
        { patientId },
        token,
      ).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
