import { putJSON } from 'src/utils';
import { Config } from 'src/core';

import {
  SaveAlertsLoaderImpl,
  SaveAlertsTransformImpl,
  SaveAlertsServiceImpl,
} from './save-alerts.service';
import { saveAlertsMockData } from './save-alerts.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

jest.mock('src/utils/loaders');

describe('Save Alerts Service', () => {
  const patientId = 12345;
  const token = 'magic token';
  const alerts = saveAlertsMockData;
  const mockResponse = saveAlertsMockData;
  const responseTransform = SaveAlertsTransformImpl;

  beforeEach(() => {
    putJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    putJSON.mockResolvedValue(mockResponse);

    it('should call the API url with the provided patientID', done => {
      expect.assertions(1);

      SaveAlertsLoaderImpl({ patientId, alerts }, token).then(data => {
        expect(putJSON).toBeCalledWith(
          `/${BASE_URL}/patients/${patientId}/glucose-alerts`,
          alerts,
          { Authorization: `Bearer ${token}` },
        );
        done();
      });
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      expect.assertions(1);
      SaveAlertsServiceImpl(putJSON, responseTransform)(
        { patientId, alerts },
        token,
      ).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
