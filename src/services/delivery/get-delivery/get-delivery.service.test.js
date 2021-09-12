import { getJSON } from 'src/utils/loaders';
import { Config } from 'src/core';

import {
  GetDeliveryLoaderImpl,
  GetDeliveryServiceImpl,
} from './get-delivery.service';
import { getDeliveryMockData } from './get-delivery.mock';

const { REACT_APP_API_ROOT, REACT_APP_API_VERSION } = Config;

// TODO: switch to using nock and fix tests
describe.skip('Get delivery service', () => {
  const patientId = 1;
  const token = 'magic token';
  const mockResponse = getDeliveryMockData;

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

      GetDeliveryLoaderImpl({ patientId }, token).then(data => {
        expect(getJSON).toBeCalledWith(
          `${BASE_URL}/patients/${patientId}/delivery`,
          {},
          { Authorization: `Bearer ${token}` },
        );

        done();
      });
    });
  });

  describe('Service implementation', () => {
    it('Should apply the provided transform to the service response', done => {
      expect.assertions(1);

      const mockTransform = jest
        .fn()
        .mockName('get delivery service transform');
      GetDeliveryServiceImpl(getJSON, mockTransform)({ patientId }, token).then(
        data => {
          expect(mockTransform).toBeCalledWith(mockResponse);
          done();
        },
      );
    });
  });
});
