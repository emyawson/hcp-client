import { Config } from 'src/core';
import { createAuthHeader, getJSON } from 'src/utils';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const TimeIntervalLoaderImpl: TimeIntervalLoader = (
  { patientId },
  token,
) =>
  getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/patients/${patientId}/time-intervals`,
    {},
    {
      Authorization: createAuthHeader(token),
    },
  );

export const TimeIntervalTransformImpl: TimeIntervalTransform = results =>
  results.timeIntervals.map(({ id, description, startTime, endTime }) => ({
    id,
    description,
    startTime,
    endTime,
  }));

export const TimeIntervalServiceImpl: TimeIntervalService = (
  load,
  transform,
) => (query, token) => load(query, token).then(transform);
