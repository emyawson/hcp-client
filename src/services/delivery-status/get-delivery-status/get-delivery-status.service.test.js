import { getJSON } from 'src/utils/loaders';
import { Config } from 'src/core';

import {
  GetDeliveryStatusLoaderImpl,
  GetDeliveryStatusServiceImpl,
  GetDeliveryStatusTransformImpl,
} from './get-delivery-status.service';
import { mockGetDeliveryStatusResponse } from './get-delivery-status.mock';

import { transformServerToClientDeliveryStatus } from '../delivery-status.util';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

// TODO: switch to using nock and fix tests
describe.skip('Get delivery status service', () => {
  const patientId = 1;
  const token = 'magic token';
  const mockResponse = mockGetDeliveryStatusResponse;

  beforeAll(() => {
    jest.mock('src/utils/loaders');
  });

  beforeEach(() => {
    getJSON.mockClear();
  });

  describe('Loader implementation', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    getJSON.mockResolvedValue(mockResponse);

    it('Should call the API url with the provided patient ID', done => {
      expect.assertions(1);

      GetDeliveryStatusLoaderImpl({ patientId }, token).then(data => {
        expect(getJSON).toBeCalledWith(
          `${BASE_URL}/patients/${patientId}/delivery-status`,
          {},
          { Authorization: `Bearer ${token}` },
        );
        done();
      });
    });
  });

  describe('Transform implementation', () => {
    it('Should apply the correct server to client transform', () => {
      expect(GetDeliveryStatusTransformImpl(mockResponse)).toEqual(
        transformServerToClientDeliveryStatus(mockResponse),
      );
    });
  });

  describe('Service implementation', () => {
    it('Should apply the provided transform to the service response and add the patient ID', done => {
      expect.assertions(2);

      const mockTransform = jest
        .fn()
        .mockName('get delivery status server to client transform')
        .mockReturnValue({});

      GetDeliveryStatusServiceImpl(getJSON, mockTransform)(
        { patientId },
        token,
      ).then(data => {
        expect(mockTransform).toBeCalledWith(mockResponse);
        expect(data).toEqual(expect.objectContaining({ patientId }));

        done();
      });
    });
  });
});
