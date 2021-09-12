import { postJSON } from 'src/utils/service/service.utils';

import {
  CreatePatientLoaderImpl,
  CreatePatientTransformImpl,
  CreatePatientServiceImpl,
} from './create-patient.service';
import { mockCreatePatientResponse, mockPatient } from './create-patient.mock';

jest.mock('src/utils/service/service.utils');

describe('Create Patient Service Test', () => {
  const professionalId = 123;
  const token = 'magic token';
  const responseTransform = CreatePatientTransformImpl;

  afterAll(() => {
    postJSON.mockClear();
  });

  describe('JSON Loader', () => {
    postJSON.mockResolvedValue(mockCreatePatientResponse);

    it('should call api to create patient for a professional by ID', done => {
      CreatePatientLoaderImpl(
        { professionalId: 123, patient: mockPatient },
        token,
      ).then(data => {
        expect(data).toEqual(mockCreatePatientResponse);
        done();
      });
    });
  });

  describe('Response Transform', () => {
    it('should strip the server result description and return status', () => {
      const transformed = responseTransform(mockCreatePatientResponse);
      expect(transformed).toEqual(mockCreatePatientResponse.model);
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      expect.assertions(1);
      CreatePatientServiceImpl(postJSON, responseTransform)(
        { professionalId, patient: mockPatient },
        token,
      )
        .then(result => {
          expect(result).toEqual(responseTransform(mockCreatePatientResponse));
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
});
