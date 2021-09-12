import { getJSON } from 'src/utils';
import { Config } from 'src/core';

import {
  PatientLoaderImpl,
  PatientTransformImpl,
  PatientServiceImpl,
} from './patient.service';
import { mockPatientData } from './patient.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

jest.mock('src/utils/loaders');

describe('Patient Service Test Suite', () => {
  const patientId = 12345;
  const token = 'magic token';
  const mockResponse = mockPatientData;
  const responseTransform = PatientTransformImpl;

  beforeEach(() => {
    getJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    getJSON.mockResolvedValue(mockResponse);

    it('should call the API url with the provided patientId', done => {
      expect.assertions(1);

      PatientLoaderImpl({ patientId }, token).then(data => {
        expect(getJSON).toBeCalledWith(
          `${BASE_URL}/patients/${patientId}`,
          {},
          { Authorization: `Bearer ${token}` },
        );
        done();
      });
    });
  });

  describe('Response Transform', () => {
    it('should flatten patient details for the client', () => {
      const transformed = responseTransform(mockResponse);
      expect(transformed.diabetesType).toBeDefined();
      expect(transformed.patientDetails).toBeUndefined();
      expect(transformed.firstName).toBeDefined();
      expect(transformed.user).toBeUndefined();
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      expect.assertions(1);

      PatientServiceImpl(getJSON, responseTransform)({ patientId }, token).then(
        result => {
          expect(result).toEqual(responseTransform(mockResponse));
          done();
        },
      );
    });
  });
});
