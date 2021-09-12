import { postJSON } from 'src/utils/loaders';
import { Config } from 'src/core';

import {
  SaveDeliveryStatusCommentLoaderImpl,
  SaveDeliveryStatusCommentServiceImpl,
  SaveDeliveryStatusCommentTransformImpl,
} from './save-delivery-status-comment.service';
import { mockSaveDeliveryStatusCommentResponse } from './save-delivery-status-comment.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

// TODO: switch to using nock and fix tests
describe.skip('Save delivery status comment service', () => {
  const patientId = 1;
  const deliveryStatusId = '1a';
  const comment = 'comment';
  const token = 'magic token';
  const mockResponse = mockSaveDeliveryStatusCommentResponse;

  beforeAll(() => {
    jest.mock('src/utils/loaders');
  });

  beforeEach(() => {
    postJSON.mockClear();
  });

  describe('Loader implementation', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    postJSON.mockResolvedValue(mockResponse);

    it('Should call the API url with the provided patient ID', done => {
      expect.assertions(1);

      SaveDeliveryStatusCommentLoaderImpl(
        { patientId, deliveryStatusId, comment },
        token,
      ).then(data => {
        expect(postJSON).toBeCalledWith(
          `${BASE_URL}/patients/${patientId}/delivery-status/comment`,
          { id: deliveryStatusId, comment },
          { Authorization: `Bearer ${token}` },
        );
        done();
      });
    });
  });

  describe('Transform implementation', () => {
    it('Should apply the correct server to client transform', () => {
      expect(SaveDeliveryStatusCommentTransformImpl(mockResponse)).toEqual({
        trafficLightStatusComment: expect.any(String),
        trafficLightStatusDateCalculated: expect.any(String),
        trafficLightStatusId: expect.any(String),
      });
    });
  });

  describe('Service implementation', () => {
    it('Should apply the provided transform to the service response', done => {
      expect.assertions(1);

      const mockTransform = jest
        .fn()
        .mockName('save delivery status comment transform implementation')
        .mockReturnValue({});

      SaveDeliveryStatusCommentServiceImpl(postJSON, mockTransform)(
        { patientId, deliveryStatusId, comment },
        token,
      ).then(data => {
        expect(mockTransform).toBeCalledWith(mockResponse);
        done();
      });
    });
  });
});
