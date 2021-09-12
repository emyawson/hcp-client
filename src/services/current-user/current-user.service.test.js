import { getJSON } from 'src/utils/loaders';
import { Config } from 'src/core';

import {
  CurrentUserLoaderImpl,
  CurrentUserTransformImpl,
  CurrentUserServiceImpl,
} from './current-user.service';
import { mockCurrentUser } from './current-user.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

// TODO: switch to using nock and fix tests
describe.skip('Current user service', () => {
  const token = 'magic token';
  const mockResponse = mockCurrentUser;
  const responseTransform = CurrentUserTransformImpl;

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

      CurrentUserLoaderImpl(token).then(data => {
        expect(getJSON).toBeCalledWith(
          `${BASE_URL}/current-user`,
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

      CurrentUserServiceImpl(getJSON, responseTransform)(token).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
