import { getJSON } from 'src/utils';
import { Config } from 'src/core';

import {
  GetOrgStockLoaderImpl,
  GetOrgStockTransform,
  GetOrgStockServiceImpl,
} from './get-org-stock.service';
import { mockOrgStock } from './get-org-stock.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

jest.mock('src/utils/loaders');

describe('GetOrgStock Service Test Suite', () => {
  const clinicId = 12345;
  const token = 'magic token';
  const mockResponse = mockOrgStock;
  const responseTransform = GetOrgStockTransform;

  beforeEach(() => {
    getJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    getJSON.mockResolvedValue(mockResponse);

    it('should call the API url with the provided clinicId', done => {
      expect.assertions(1);

      GetOrgStockLoaderImpl({ clinicId }, token).then(data => {
        expect(getJSON).toBeCalledWith(
          `${BASE_URL}/organization-stock/${clinicId}`,
          {},
          { Authorization: `Bearer ${token}` },
        );
        done();
      });
    });
  });

  describe('Response Transform', () => {
    it('should rename and reorganize server shipment data', () => {
      const transformed = responseTransform(mockResponse);
      expect(transformed.aggregateStripStock).toBeGreaterThan(0);
      expect(transformed.stripModelStocks).toBeDefined();
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      expect.assertions(1);

      GetOrgStockServiceImpl(getJSON, responseTransform)(
        { clinicId },
        token,
      ).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
