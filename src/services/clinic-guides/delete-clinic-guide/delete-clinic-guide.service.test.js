import { deleteJSON } from 'src/utils/loaders';
import { Config } from 'src/core';

import {
  DeleteClinicGuideLoaderImpl,
  DeleteClinicGuideTransformImpl,
  DeleteClinicGuideServiceImpl,
} from './delete-clinic-guide.service';
import { mockDeleteClinicGuideResponse } from './delete-clinic-guide.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

// TODO: switch to using nock and fix tests
describe.skip('Delete clinic guide service', () => {
  const clinicGuideId = '123';
  const token = 'magic token';
  const mockResponse = mockDeleteClinicGuideResponse;
  const responseTransform = DeleteClinicGuideTransformImpl;

  beforeAll(() => {
    jest.mock('src/utils/loaders');
  });

  beforeEach(() => {
    deleteJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    deleteJSON.mockResolvedValue(mockResponse);
    it('should call the API url with the provided clinicGuideId', done => {
      expect.assertions(1);

      DeleteClinicGuideLoaderImpl({ clinicGuideId }, token).then(data => {
        expect(deleteJSON).toBeCalledWith(
          `${BASE_URL}/guides/custom/${clinicGuideId}`,
          {},
          { Authorization: `Bearer ${token}` },
        );
        done();
      });
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      expect.assertions(1);
      DeleteClinicGuideServiceImpl(deleteJSON, responseTransform)(
        { clinicGuideId },
        token,
      ).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
