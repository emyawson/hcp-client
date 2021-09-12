import { Config } from 'src/core';
import { postJSON, createAuthHeader } from 'src/utils';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const LostStripsLoaderImpl = (
  { patientId, stripModelId, numberOfLostStrips },
  token,
) =>
  postJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/patients/${patientId}/strips-information/lost-strips`,
    {
      numberOfLostStrips,
      stripModelId,
    },
    {
      Authorization: createAuthHeader(token),
    },
  );

export const LostStripsTransformImpl = results => results;

export const LostStripsServiceImpl = (load, transform) => (query, token) =>
  load(query, token).then(transform);
