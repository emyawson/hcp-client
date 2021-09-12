import * as nock from 'nock';

import { Config } from 'src/core';
import { cleanupMockEndpoints } from 'src/test';

import {
  GetActiveSystemLanguagesLoaderImpl,
  GetActiveSystemLanguagesTransformImpl,
  GetActiveSystemLanguagesServiceImpl,
} from './active-system-languages.service';
import { mockActiveLanguages } from './active-system-languages.mock';

const { REACT_APP_EC6_API_ROOT } = Config;

describe('Get active system languages service', () => {
  const token = 'magic token';
  const responseTransform = GetActiveSystemLanguagesTransformImpl;
  const url = `${REACT_APP_EC6_API_ROOT}/language/active`;

  afterAll(() => {
    cleanupMockEndpoints();
  });

  describe('JSON Loader', () => {
    nock(url)
      .persist()
      .get('')
      .reply(200, mockActiveLanguages);

    it('should call api to EC6 languages', done => {
      GetActiveSystemLanguagesLoaderImpl(token).then(data => {
        expect(data).toEqual(mockActiveLanguages);
        done();
      });
    });
  });

  describe('Response Transform', () => {
    it('should present server data ready for the client to display', () => {
      const transformed = responseTransform(mockActiveLanguages);
      expect(transformed[0].name).toEqual('Spanish');
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      nock(url)
        .persist()
        .get('')
        .reply(200, mockActiveLanguages);

      GetActiveSystemLanguagesServiceImpl(
        GetActiveSystemLanguagesLoaderImpl,
        responseTransform,
      )(token).then(result => {
        expect(result).toEqual(responseTransform(mockActiveLanguages));
        done();
      });
    });
  });
});
