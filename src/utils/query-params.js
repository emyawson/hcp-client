import { isEmpty, isNil } from 'ramda';

export const buildQueryString = (params, mapping = {}) =>
  Object.keys(params)
    .sort()
    .reduce((result, key) => {
      const value = params[key];
      return isNil(value) || isEmpty(value)
        ? result
        : result.concat(
            `${encodeURIComponent(mapping[key] || key)}=${encodeURIComponent(
              value,
            )}`,
          );
    }, [])
    .join('&');
