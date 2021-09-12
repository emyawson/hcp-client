import { getJSON } from 'src/utils/loaders';
import { Config } from 'src/core';

import {
  DateRangeLoaderImpl,
  DateRangeServiceImpl,
} from './patient-date-range.service';
import { mockDateRangeData } from './patient-date-range.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

// TODO: switch to using nock and fix tests
describe.skip('Patient date range service', () => {
  const patientId = 1;
  const token = 'magic token';
  const mockResponse = mockDateRangeData;

  beforeAll(() => {
    jest.mock('src/utils/loaders');
  });

  beforeEach(() => {
    getJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    getJSON.mockResolvedValue(mockResponse);

    it('should call the API url with patient ID', done => {
      expect.assertions(1);

      DateRangeLoaderImpl({ patientId }, token).then(data => {
        expect(getJSON).toBeCalledWith(
          `${BASE_URL}/patients/${patientId}/date-range`,
          {},
          { Authorization: `Bearer ${token}` },
        );
        done();
      });
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response and include patient ID from the original query', done => {
      expect.assertions(1);
      DateRangeServiceImpl(getJSON)({ patientId }, token).then(result => {
        expect(result).toEqual({ ...mockDateRangeData, patientId });
        done();
      });
    });
  });
});
