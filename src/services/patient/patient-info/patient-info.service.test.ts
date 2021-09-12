import { getJSON } from 'src/utils/service/service.utils';

import {
  getPatientInfoServiceImpl,
  getPatientInfoLoaderImpl,
  getPatientInfoTransformImpl,
} from './patient-info.service';

import { mockGetPatientInfoResponse } from './patient-info.mock';

jest.mock('src/utils/service/service.utils');

describe('Get Patient Info Service Test', () => {
  const patientId = 123;
  const token = 'gigya';

  afterAll(() => {
    getJSON.mockClear();
  });

  describe('JSON Loader', () => {
    getJSON.mockResolvedValue(mockGetPatientInfoResponse);

    it('should call the api to get patient info for a patientId', done => {
      getPatientInfoLoaderImpl({ patientId }, token).then(data => {
        expect(data).toEqual(mockGetPatientInfoResponse);
        done();
      });
    });
  });

  describe('Response Transform', () => {
    it('should strip the server result description and return status', () => {
      const transformed = getPatientInfoTransformImpl(
        mockGetPatientInfoResponse,
      );
      expect(transformed).toEqual(mockGetPatientInfoResponse.model);
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      expect.assertions(1);
      getPatientInfoServiceImpl(getJSON, getPatientInfoTransformImpl)(
        { patientId },
        token,
      )
        .then(result => {
          expect(result).toEqual(
            getPatientInfoTransformImpl(mockGetPatientInfoResponse),
          );
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
});
