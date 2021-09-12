import {
  drop,
  isEmpty,
  join,
  lensIndex,
  map,
  mergeAll,
  over,
  pickAll,
  pipe,
  prepend,
  split,
  toLower,
  toUpper,
} from 'ramda';

import { pass } from 'src/utils';

import {
  GetPermissions,
  HasPermissions,
  TransformedPermissions,
} from './permissions.types';

export const verifyPermission = permissionsList => permission =>
  !!permissionsList[transformPermission(permission)];

export const hasPermissions = ({
  toValidate,
  current,
}: HasPermissions): boolean => {
  if (isEmpty(current)) {
    return false;
  }
  return toValidate.every(verifyPermission(current));
};

export const getPermissions = ({
  current,
  permissions,
}: GetPermissions): TransformedPermissions => {
  const matchedPermissions = pickAll(
    Object.keys(transformPermissions(permissions)),
    current,
  );
  return map<any, any>(val => pass(val), matchedPermissions);
};

const splitUnderScore = split('_');
const toTitleCase = map<any, any>(
  pipe<any, any, any, any>(
    toLower,
    over(lensIndex(0), toUpper),
    join(''),
  ),
);

const dropRole = drop(1);

// ROLE_PROFESSIONAL => hasProfessional: true
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
