import { getJSON } from 'src/utils/loaders';
import { Config } from 'src/core';

import {
  HelpLoaderImpl,
  HelpTransformImpl,
  HelpServiceImpl,
} from './help.service';
import { mockHelp } from './help.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

// TODO: switch to using nock and fix tests
describe.skip('Help service', () => {
  const token = 'magic token';
  const mockResponse = mockHelp;
  const responseTransform = HelpTransformImpl;

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

      HelpLoaderImpl({}, token).then(() => {
        expect(getJSON).toBeCalledWith(
          `${BASE_URL}/downloads/help-pdf`,
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

      HelpServiceImpl(getJSON, responseTransform)(token).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
