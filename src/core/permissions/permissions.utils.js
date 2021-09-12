import {
  pickAll,
  isEmpty,
  pipe,
  split,
  drop,
  map,
  prepend,
  toLower,
  lensIndex,
  over,
  toUpper,
  join,
  mergeAll,
} from 'ramda';

import { pass } from 'src/utils/validation-helpers';

export const verifyPermission = permissionsList => permission =>
  !!permissionsList[transformPermission(permission)];

export const hasPermissions = ({ toValidate, current }) => {
  if (isEmpty(current)) {
    return null;
  }
  return toValidate.every(verifyPermission(current));
};

export const getPermissions = ({ current, permissions }) => {
  const matchedPermissions = pickAll(
    Object.keys(transformPermissions(permissions)),
    current,
  );
  return map(val => pass(val), matchedPermissions);
};

const splitUnderScore = split('_');
const toTitleCase = map(
  pipe(
    toLower,
    over(lensIndex(0), toUpper),
    join(''),
  ),
);
const dropRole = drop(1);

// ROLE_PROFESSIONAL
// hasProfessional: true
export const toKeys = key => ({ [key]: true });
export const transformPermission = pipe(
  splitUnderScore,
  dropRole,
  toTitleCase,
  prepend('has'),
  join(''),
);
export const transformPermissions = permissions =>
  mergeAll(permissions.map(transformPermission).map(toKeys));
