import { toString } from 'ramda';

import { ProfileType } from 'src/services/department/profile-types/profile-types.types';

const PATIENT = 'PATIENT';

export const verifyType = (type: ProfileType) => profileType =>
  type.profile &&
  type.profile.role === PATIENT &&
  toString(type.profile.id) === profileType;
