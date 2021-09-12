import { postJSON } from 'src/utils/loaders';
import { Config, TRAFFIC_LIGHT_STATES } from 'src/core';

import {
  SetDeliveryStatusLoaderImpl,
  SetDeliveryStatusServiceImpl,
  SetDeliveryStatusTransformImpl,
} from './set-delivery-status.service';
import { mockSetDeliveryStatusData } from './set-delivery-status.mock';

import {
  clientToServerTrafficLightStates,
  transformServerToClientDeliveryStatus,
} from '../delivery-status.util';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

// TODO: switch to using nock and fix tests
describe.skip('Set delivery status service', () => {
  const patientId = 1;
  const status = TRAFFIC_LIGHT_STATES.DELIVER;
  const comment = 'Very good boy';
  const transformedStatus =
    clientToServerTrafficLightStates[TRAFFIC_LIGHT_STATES.DELIVER];
  const token = 'magic token';
  const mockResponse = mockSetDeliveryStatusData;

  beforeAll(() => {
    jest.mock('src/utils/loaders');
  });

  beforeEach(() => {
    postJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    postJSON.mockResolvedValue(mockResponse);

    it('should call the API url with the provided patient ID and status', done => {
      expect.assertions(1);

      SetDeliveryStatusLoaderImpl({ patientId, status }, token).then(data => {
        expect(postJSON).toBeCalledWith(
          `${BASE_URL}/patients/${patientId}/delivery-status`,
          { status: transformedStatus },
          { Authorization: `Bearer ${token}` },
        );
        done();
      });
    });
  });

  describe('Transform implementation', () => {
    it('Should apply the correct server to client transform', () => {
      expect(SetDeliveryStatusTransformImpl(mockResponse)).toEqual(
        transformServerToClientDeliveryStatus(mockResponse),
      );
    });
  });

  describe('Service Implementation', () => {
    it('should apply the provided transform to the service response', done => {
      expect.assertions(1);

      const mockTransform = jest
        .fn()
        .mockName('Set delivery status service transform');
      SetDeliveryStatusServiceImpl(postJSON, mockTransform)(
        { patientId, status, comment },
        token,
      ).then(result => {
        expect(mockTransform).toBeCalledWith(mockResponse);
        done();
      });
    });
  });
});
