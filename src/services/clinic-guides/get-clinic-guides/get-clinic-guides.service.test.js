import { getJSON } from 'src/utils/loaders';
import { Config } from 'src/core';

import {
  GetClinicGuidesLoaderImpl,
  GetClinicGuidesTransformImpl,
  GetClinicGuidesServiceImpl,
} from './get-clinic-guides.service';
import { mockClinicGuides } from './get-clinic-guides.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

// TODO: switch to using nock and fix tests
describe.skip('Get clinic guides service', () => {
  const therapyId = 1;
  const token = 'magic token';
  const mockResponse = mockClinicGuides;
  const responseTransform = GetClinicGuidesTransformImpl;

  beforeAll(() => {
    jest.mock('src/utils/loaders');
  });

  beforeEach(() => {
    getJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    getJSON.mockResolvedValue(mockResponse);
    it('should call the API url with the provided therapyId', done => {
      expect.assertions(1);

      GetClinicGuidesLoaderImpl({ therapyId }, token).then(data => {
        expect(getJSON).toBeCalledWith(
          `${BASE_URL}/guides`,
          { therapyId },
          { Authorization: `Bearer ${token}` },
        );
        done();
      });
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      expect.assertions(1);
      GetClinicGuidesServiceImpl(getJSON, responseTransform)(
        { therapyId },
        token,
      ).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
