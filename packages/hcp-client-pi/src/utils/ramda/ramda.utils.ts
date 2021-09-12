import { assoc, assocPath } from 'ramda';

export const set = <O, K extends keyof O>(key: keyof O, val: O[K], object: O) =>
  assoc(key, val, object);

export const setIn = (path, val, object) => assocPath(path, val, object);
