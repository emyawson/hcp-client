import { mergeDeepRight } from 'ramda';

export const makeOverwrite = object => overwrite =>
  mergeDeepRight(object, overwrite);
