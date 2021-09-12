import { postJSON } from 'src/utils';
import { Config } from 'src/core';

import {
  ManualDeliveryLoaderImpl,
  ManualDeliveryTransformImpl,
  ManualDeliveryServiceImpl,
} from './manual-delivery.service';
import { mockManualDeliveryData } from './manual-delivery.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

jest.mock('src/utils/loaders');

describe('ManualDelivery Service Test Suite', () => {
  const patientId = 12345;
  const token = 'magic token';
  const comment = 'comment';
  const mockResponse = mockManualDeliveryData;
  const responseTransform = ManualDeliveryTransformImpl;

  const stripModelId = 123;
  const numberOfStripsDelivered = 25;

  beforeEach(() => {
    postJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    postJSON.mockResolvedValue(mockResponse);

    it('should call the API url with the provided patientId', done => {
      expect.assertions(1);

      ManualDeliveryLoaderImpl(
        { patientId, numberOfStripsDelivered, stripModelId, comment },
        token,
      ).then(data => {
        expect(postJSON).toBeCalledWith(
          `${BASE_URL}/patients/${patientId}/strips-information/manual-delivery`,
          { numberOfStripsDelivered, stripModelId, comment },
          { Authorization: `Bearer ${token}` },
        );
        done();
      });
    });
  });

  describe('Response Transform', () => {
    it('should pass all fields to the FE', () => {
      const transformed = responseTransform(mockResponse);
      expect(transformed).toEqual(mockResponse);
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      expect.assertions(1);

      ManualDeliveryServiceImpl(postJSON, responseTransform)(
        { patientId },
        token,
      ).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
