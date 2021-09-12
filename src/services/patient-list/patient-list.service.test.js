import { getJSON } from 'src/utils';
import { Config } from 'src/core';

import {
  PatientListLoaderImpl,
  PatientListTransformImpl,
  PatientListServiceImpl,
} from './patient-list.service';
import { mockPatientsListData } from './patient-list.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

jest.mock('src/utils/loaders');

describe('PatientList Service Test Suite', () => {
  const token = 'magic token';
  const mockResponse = mockPatientsListData;
  const responseTransform = PatientListTransformImpl;

  beforeEach(() => {
    getJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    getJSON.mockResolvedValue(mockResponse);

    it('should call the API url with the provided patientId', done => {
      expect.assertions(1);

      PatientListLoaderImpl(token).then(data => {
        expect(getJSON).toBeCalledWith(
          `${BASE_URL}/patients/`,
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
      expect(transformed[0].name).toBeUndefined();
      expect(transformed[0].firstName).toBeDefined();
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      expect.assertions(1);

      PatientListServiceImpl(getJSON, responseTransform)(token).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
