import { getJSON } from 'src/utils';
import { Config } from 'src/core';

import {
  GetPrescriptionLoaderImpl,
  GetPrescriptionTransformImpl,
  GetPrescriptionServiceImpl,
} from './get-prescription.service';
import { mockCurrentPrescriptionsData } from './get-prescription.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

jest.mock('src/utils/loaders');

describe('GetPrescription Service Test Suite', () => {
  const patientId = 12345;
  const token = 'magic token';
  const mockResponse = mockCurrentPrescriptionsData;
  const responseTransform = GetPrescriptionTransformImpl;

  beforeEach(() => {
    getJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    getJSON.mockResolvedValue(mockResponse);

    it('should call the API url with the provided patientId', done => {
      expect.assertions(1);

      GetPrescriptionLoaderImpl({ patientId }, token).then(data => {
        expect(getJSON).toBeCalledWith(
          `${BASE_URL}/patients/${patientId}/prescriptions/current`,
          {},
          { Authorization: `Bearer ${token}` },
        );
        done();
      });
    });
  });

  describe('Response Transform', () => {
    // Further tests can be found alongside the prescription.util
    it('should transform prescription objects for the client', () => {
      const transformed = responseTransform(mockResponse);
      expect(transformed.permanent.clinicGuideId).toBeUndefined();
      expect(transformed.permanent.clinicGuide).toBeDefined();
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      expect.assertions(1);

      GetPrescriptionServiceImpl(getJSON, responseTransform)(
        { patientId },
        token,
      ).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
