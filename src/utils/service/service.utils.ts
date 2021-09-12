import 'isomorphic-fetch';
import { propOr } from 'ramda';

import { isString, StringMap } from '../typescript';

import { ErrorResponseBody } from './service.utils.types';

export const defaultContentTypeHeaders: StringMap = {
  'Content-Type': 'application/json',
};

export const handleResponseError = (
  response: Response,
  errorResponseBody: any,
): ErrorResponseBody => {
  throw {
    url: response.url,
    errorCode: propOr(undefined, 'error', errorResponseBody),
    status: response.status,
    statusText: response.statusText,
  };
};

export const handleResponse = (response: Response) =>
  response
    .json()
    .then(
      (responseBody: any) =>
        response.ok
          ? responseBody
          : handleResponseError(response, responseBody),
    );

export const stringifyBody = (body: any): string =>
  isString(body) ? body : JSON.stringify(body);

const buildDefaultHeaders = (headers?: StringMap): StringMap => ({
  ...defaultContentTypeHeaders,
  ...headers,
});

const buildDefaultOptions = ({
  headers,
  body,
  ...options
}: RequestInit): RequestInit => ({
  headers: buildDefaultHeaders(headers as StringMap),
  body: stringifyBody(body),
  ...options,
});

export const fetchJSON = (url: RequestInfo, options: RequestInit = {}) =>
  fetch(url, buildDefaultOptions(options)).then(handleResponse);

export const getJSON = (url: RequestInfo, options: RequestInit = {}) =>
  fetchJSON(url, { method: 'GET', ...options });

export const postJSON = (url: RequestInfo, options: RequestInit = {}) =>
  fetchJSON(url, { method: 'POST', ...options });

export const putJSON = (url: RequestInfo, options: RequestInit = {}) =>
  fetchJSON(url, { method: 'PUT', ...options });

export const deleteJSON = (url: RequestInfo, options: RequestInit = {}) =>
  fetchJSON(url, { method: 'DELETE', ...options });
