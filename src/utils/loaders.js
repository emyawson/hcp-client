import { propOr } from 'ramda';

import { buildUrl } from 'src/utils';

const defaultContentTypeHeaders = {
  'content-type': 'application/json',
};

const handleResponse = res =>
  res.ok
    ? res.json()
    : res.json().then(responseBody =>
        Promise.reject({
          url: res.url,
          errorCode: propOr(undefined, 'error')(responseBody),
          status: res.status,
          statusText: res.statusText,
        }),
      );

export const postJSON = (
  url: string,
  body: Map<string> = new Map(),
  headers: Map<string> = new Map(),
): Promise<*> =>
  fetch(url, {
    method: 'POST',
    headers: {
      ...defaultContentTypeHeaders,
      ...headers,
    },
    body: JSON.stringify(body),
  }).then(handleResponse);
export const putJSON = (
  url: string,
  body: Map<string> = new Map(),
  headers: Map<string> = new Map(),
): Promise<*> =>
  fetch(`${url}`, {
    method: 'PUT',
    headers: {
      ...defaultContentTypeHeaders,
      ...headers,
    },
    body: JSON.stringify(body),
  }).then(handleResponse);

export const getJSON = (
  url: string,
  queryParams: Map<string> = new Map(),
  headers: Map<string> = new Map(),
): Promise<*> => {
  const urlWithQueryParams = buildUrl(url, queryParams);
  return fetch(`${urlWithQueryParams}`, {
    method: 'GET',
    headers: {
      ...defaultContentTypeHeaders,
      ...headers,
    },
  }).then(handleResponse);
};

export const deleteJSON = (
  url: string,
  queryParams: Map<string> = new Map(),
  headers: Map<string> = new Map(),
): Promise<*> => {
  const urlWithQueryParams = buildUrl(url, queryParams);
  return fetch(`${urlWithQueryParams}`, {
    method: 'DELETE',
    headers: {
      ...defaultContentTypeHeaders,
      ...headers,
    },
  }).then(handleResponse);
};
