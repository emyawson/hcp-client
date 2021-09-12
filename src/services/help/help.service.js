import { Config } from 'src/core';
import { createAuthHeader, getJSON } from 'src/utils';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const HelpLoaderImpl = (payload, token) =>
  getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/downloads/help-pdf`,
    {},
    {
      Authorization: createAuthHeader(token),
    },
  );

export const HelpTransformImpl = data => data;

export const HelpServiceImpl = (loader, transform) => (query, token) =>
  loader(query, token).then(transform);
