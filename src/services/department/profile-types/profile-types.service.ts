import { Config } from 'src/core/env/config';
import { getJSON } from 'src/utils/service/service.utils';

import {
  ProfileTypesParams,
  ProfileTypesResponse,
} from './profile-types.types';

const { REACT_APP_EC6_API_ROOT } = Config;

export const ProfileTypesLoaderImpl = (
  { departmentId }: ProfileTypesParams,
  token: string,
) =>
  getJSON(`${REACT_APP_EC6_API_ROOT}/department/${departmentId}/profile`, {
    headers: { Authorization: token },
  });

export const ProfileTypesTransformImpl = ({ model }): ProfileTypesResponse =>
  model;

export const ProfileTypesServiceImpl = (load, transform) => (query, token) =>
  load(query, token).then(transform);
