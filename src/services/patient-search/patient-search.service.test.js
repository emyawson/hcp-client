import { getJSON } from 'src/utils';
import { Config } from 'src/core';

import {
  PatientSearchLoaderImpl,
  PatientSearchTransformImpl,
  PatientSearchServiceImpl,
} from './patient-search.service';
import { mockPatientSearchData } from './patient-search.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

jest.mock('src/utils/loaders');

describe('PatientSearch Service Test Suite', () => {
  const patientID = '12345';
  const fullName = 'TestPatient';
  const token = 'magic token';
  const mockResponse = mockPatientSearchData;
  const responseTransform = PatientSearchTransformImpl;

  beforeEach(() => {
    getJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    getJSON.mockResolvedValue(mockResponse);

    it('should call the API url with the provided search parameters', done => {
      expect.assertions(1);

      PatientSearchLoaderImpl({ patientID, fullName }, token).then(data => {
        expect(getJSON).toBeCalledWith(
          `${BASE_URL}/patients?search=${fullName}&healthCareId=${patientID}`,
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
      expect(transformed[0].treatmentName).toBeUndefined();
      expect(transformed[0].treatment).toBeDefined();
      expect(transformed[0].fullname).toBeUndefined();
      expect(transformed[0].fullName).toBeDefined();
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      expect.assertions(1);

      PatientSearchServiceImpl(getJSON, responseTransform)(
        { patientID },
        token,
      ).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
