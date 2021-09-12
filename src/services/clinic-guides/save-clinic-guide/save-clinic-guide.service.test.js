import { postJSON } from 'src/utils/loaders';
import { Config } from 'src/core';

import {
  SaveClinicGuideLoaderImpl,
  SaveClinicGuideTransformImpl,
  SaveClinicGuideServiceImpl,
} from './save-clinic-guide.service';
import { mockSavedClinicGuide } from './save-clinic-guide.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

// TODO: switch to using nock and fix tests
describe.skip('Save clinic guide service', () => {
  const therapyId = 1;
  const name = 'custom guide';
  const period = 'weeks';
  const maximumStrips = 10;
  const minimumStrips = 2;
  const token = 'magic token';
  const mockResponse = mockSavedClinicGuide;
  const responseTransform = SaveClinicGuideTransformImpl;

  beforeAll(() => {
    jest.mock('src/utils/loaders');
  });

  beforeEach(() => {
    postJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    postJSON.mockResolvedValue(mockResponse);
    it('should call the API url with the provided params', done => {
      expect.assertions(1);

      SaveClinicGuideLoaderImpl(
        { therapyId, name, period, maximumStrips, minimumStrips },
        token,
      ).then(data => {
        expect(postJSON).toBeCalledWith(
          `${BASE_URL}/guides/custom`,
          { therapyId, name, period, maximumStrips, minimumStrips },
          { Authorization: `Bearer ${token}` },
        );
        done();
      });
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      expect.assertions(1);
      SaveClinicGuideServiceImpl(postJSON, responseTransform)(
        { therapyId, name, period, maximumStrips, minimumStrips },
        token,
      ).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
