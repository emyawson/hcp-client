import { getJSON } from 'src/utils';
import { Config } from 'src/core';

import {
  GetAlertsLoaderImpl,
  GetAlertsTransformImpl,
  GetAlertsServiceImpl,
} from './get-alerts.service';
import { mockAlertsData } from './get-alerts.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

jest.mock('src/utils/loaders');

describe('Get Alerts Service', () => {
  const patientId = 12345;
  const token = 'magic token';
  const mockResponse = mockAlertsData;
  const responseTransform = GetAlertsTransformImpl;

  beforeEach(() => {
    getJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    getJSON.mockResolvedValue(mockResponse);

    it('should call the API url with the provided patientID', done => {
      expect.assertions(1);

      GetAlertsLoaderImpl({ patientId }, token).then(data => {
        expect(getJSON).toBeCalledWith(
          `/${BASE_URL}/patients/${patientId}/glucose-alerts`,
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
      GetAlertsServiceImpl(getJSON, responseTransform)(
        { patientId },
        token,
      ).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
