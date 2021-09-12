import { getJSON } from 'src/utils/loaders';
import { Config } from 'src/core';

import { DTCLoaderImpl, DTCTransformImpl, DTCServiceImpl } from './dtc.service';
import { mockDTC } from './dtc.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

// TODO: switch to using nock and fix tests
describe.skip('DTC service', () => {
  const token = 'magic token';
  const mockResponse = mockDTC;
  const responseTransform = DTCTransformImpl;

  beforeAll(() => {
    jest.mock('src/utils/loaders');
  });

  beforeEach(() => {
    getJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    getJSON.mockResolvedValue(mockResponse);
    it('should call the API url', done => {
      expect.assertions(1);

      DTCLoaderImpl({}, token).then(() => {
        expect(getJSON).toBeCalledWith(
          `${BASE_URL}/downloads/dtc-installer`,
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

      DTCServiceImpl(getJSON, responseTransform)(token).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
