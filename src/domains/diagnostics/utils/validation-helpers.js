import {
  all,
  allPass,
  equals,
  find,
  isNil,
  isEmpty,
  not,
  pipe,
  values,
} from 'ramda';

export const isNotNil = pipe(
  isNil,
  not,
);
export const isNotEmpty = pipe(
  isEmpty,
  not,
);
export const hasValue = allPass([isNotNil, isNotEmpty]);
export const isNotFalse = pipe(
  equals(false),
  not,
);
export const pass = equals(true);
export const isNotEqual = val =>
  pipe(
    equals(val),
    not,
  );

// Apply "R.all" method to a keyed object
export const allObj = fn => obj =>
  pipe(
    values,
    all(fn),
  )(obj);

export const hasMatchingListItem = fn => obj =>
  pipe(
    find(fn),
    hasValue,
  )(obj);
