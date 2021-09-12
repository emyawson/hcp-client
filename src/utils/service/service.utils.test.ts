import * as nock from 'nock';

import { cleanupMockEndpoints, addMockEndpointDomain } from '../../test';

import {
  defaultContentTypeHeaders,
  deleteJSON,
  getJSON,
  handleResponse,
  handleResponseError,
  postJSON,
  putJSON,
} from './service.utils';

describe('service.utils tests', () => {
  let nockMock;
  let mockResult;
  beforeEach(() => {
    nockMock = nock(addMockEndpointDomain('/'), {
      reqheaders: defaultContentTypeHeaders,
    });
    mockResult = {};
  });

  afterAll(() => {
    cleanupMockEndpoints();
  });

  it('should handle error response', () => {
    const errResp = new Response(null, {
      status: 400,
      statusText: 'BAD_REQUEST',
    });
    try {
      expect(() =>
        handleResponseError(errResp, { error: 'something_failed' }),
      ).toThrow();
    } catch (e) {
      expect(e).toEqual({
        errorCode: 'something_failed',
        status: 400,
        statusText: 'BAD_REQUEST',
        url: '/some/url',
      });
    }
  });

  it('should handle OK response', () => {
    const okResp = new Response('{ "thing": "__dummybody__" }', {
      status: 200,
      statusText: 'OK',
    });
    handleResponse(okResp).then(result => {
      expect(result).toEqual({ thing: '__dummybody__' });
    });
  });

  it('should trigger a fetch using method GET', () => {
    nockMock.get('/').reply(200, mockResult);
    return getJSON(addMockEndpointDomain('/')).then(result => {
      expect(result).toEqual(mockResult);
    });
  });

  it('should trigger a fetch using method POST', () => {
    nockMock.post('/').reply(201, mockResult);
    return postJSON(addMockEndpointDomain('/')).then(result => {
      expect(result).toEqual(mockResult);
    });
  });

  it('should trigger a fetch using method PUT', () => {
    nockMock.put('/').reply(200, mockResult);
    return putJSON(addMockEndpointDomain('/')).then(result => {
      expect(result).toEqual(mockResult);
    });
  });

  it('should trigger a fetch using method DELETE', () => {
    nockMock.delete('/').reply(204, mockResult);
    return deleteJSON(addMockEndpointDomain('/')).then(result => {
      expect(result).toEqual(mockResult);
    });
  });
});
