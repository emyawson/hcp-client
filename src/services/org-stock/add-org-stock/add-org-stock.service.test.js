import { postJSON } from 'src/utils';
import { Config } from 'src/core';

import {
  AddOrgStockLoaderImpl,
  AddOrgStockTransform,
  AddOrgStockServiceImpl,
} from './add-org-stock.service';
import { mockOrgStock } from './add-org-stock.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

jest.mock('src/utils/loaders');

describe('AddOrgStock Service Test Suite', () => {
  const clinicId = 111;
  const token = 'magic token';
  const mockResponse = mockOrgStock;
  const responseTransform = AddOrgStockTransform;

  beforeEach(() => {
    postJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    postJSON.mockResolvedValue(mockResponse);

    it('should call the API url with the provided clinicId', done => {
      expect.assertions(1);

      AddOrgStockLoaderImpl({ clinicId }, token).then(data => {
        expect(postJSON).toBeCalledWith(
          `${BASE_URL}/organization-stock/${clinicId}/strips-received`,
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

      AddOrgStockServiceImpl(postJSON, responseTransform)(
        { clinicId },
        token,
      ).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
