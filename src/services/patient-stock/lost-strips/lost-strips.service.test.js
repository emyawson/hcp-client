import { postJSON } from 'src/utils';
import { Config } from 'src/core';

import {
  LostStripsLoaderImpl,
  LostStripsTransformImpl,
  LostStripsServiceImpl,
} from './lost-strips.service';
import { mockLostStripsData } from './lost-strips.mock';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

jest.mock('src/utils/loaders');

describe('LostStrips Service Test Suite', () => {
  const patientId = 12345;
  const token = 'magic token';
  const mockResponse = mockLostStripsData;
  const responseTransform = LostStripsTransformImpl;

  const stripModelId = 123;
  const numberOfLostStrips = 25;

  beforeEach(() => {
    postJSON.mockClear();
  });

  describe('JSON Loader', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    postJSON.mockResolvedValue(mockResponse);

    it('should call the API url with the provided patientId', done => {
      expect.assertions(1);

      LostStripsLoaderImpl(
        { patientId, numberOfLostStrips, stripModelId },
        token,
      ).then(data => {
        expect(postJSON).toBeCalledWith(
          `${BASE_URL}/patients/${patientId}/strips-information/lost-strips`,
          { numberOfLostStrips, stripModelId },
          { Authorization: `Bearer ${token}` },
        );
        done();
      });
    });
  });

  describe('Response Transform', () => {
    it('should pass all fields to the FE', () => {
      const transformed = responseTransform(mockResponse);
      expect(transformed).toEqual(mockResponse);
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      expect.assertions(1);

      LostStripsServiceImpl(postJSON, responseTransform)(
        { patientId },
        token,
      ).then(result => {
        expect(result).toEqual(responseTransform(mockResponse));
        done();
      });
    });
  });
});
