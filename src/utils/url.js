import { isNil } from 'ramda';

const keyValueToParamString = ({ key, value }) =>
  `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;

export const queryParamsToQueryString = params => {
  if (!params) return '';

  return Object.keys(params)
    .reduce((result, key) => {
      const value = params[key];
      return isNil(value)
        ? result
        : result.concat(keyValueToParamString({ key, value }));
    }, [])
    .join('&');
};

export const buildUrl = (url, params) => {
  const queryString = queryParamsToQueryString(params);
  return queryString.length === 0 ? url : `${url}?${queryString}`;
};
