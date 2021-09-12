import { postJSON } from 'src/utils';
import { Config } from 'src/core';

import {
  SavePrescriptionLoaderImpl,
  SavePrescriptionTransformImpl,
  SavePrescriptionServiceImpl,
} from './save-prescription.service';
import { mockSavedPrescription } from './save-prescription.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

jest.mock('src/utils/loaders');

describe('SavePrescription Service Test Suite', () => {
  const patientId = 12345;
  const token = 'magic token';
  const mockResponse = mockSavedPrescription;
  const responseTransform = SavePrescriptionTransformImpl;

  const clientPrescription = {
    clinicGuide: 'c28beb14-cc46-440e-bc69-86b80bb84f27',
    dateRange: { startDate: null, endDate: null },
    frequency: 'oneMonth',
    period: 'days',
    quantity: 6,
    reason: null,
    stripModel: 10609,
    therapy: '50f17667-8903-4f38-953d-6da75fbe792b',
  };

  beforeEach(() => {
    postJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    postJSON.mockResolvedValue(mockResponse);

    it('should call the API url with the provided patientId and a sanitized prescription', done => {
      expect.assertions(1);

      // Remove null fields, rename
      const sanitizedPrescription = {
        frequency: {
          duration: 1,
          unit: 'months',
        },
        period: clientPrescription.period,
        quantity: clientPrescription.quantity,
        clinicGuideId: clientPrescription.clinicGuide,
        stripModelId: clientPrescription.stripModel,
        therapyId: clientPrescription.therapy,
      };

      SavePrescriptionLoaderImpl(
        { patientId, prescription: clientPrescription },
        token,
      ).then(data => {
        expect(postJSON).toBeCalledWith(
          `${BASE_URL}/patients/${patientId}/prescriptions/`,
          sanitizedPrescription,
          { Authorization: `Bearer ${token}` },
        );
        done();
      });
    });
  });

  describe('Response Transform', () => {
    // Further tests can be found alongside the prescription.util
    it('should transform saved prescription object for the client', () => {
      const transformed = responseTransform(mockResponse);
      expect(transformed.clinicGuideId).toBeUndefined();
      expect(transformed.clinicGuide).toBeDefined();
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      expect.assertions(1);

      SavePrescriptionServiceImpl(postJSON, responseTransform)(
        { patientId },
        token,
      ).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
