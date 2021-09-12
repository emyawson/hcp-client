import {
  assoc,
  assocPath,
  path as ramdaPath,
  pathOr as ramdaPathOr,
  propOr as ramdaPropOr,
} from 'ramda';

export const set = <O, K extends keyof O>(key: keyof O, val: O[K], object: O) =>
  assoc(key, val, object);

export const setIn = (path, val, object) => assocPath(path, val, object);

export const getIn = (path, obj) => ramdaPath(path, obj);

export const propOr = <ObjectType, K extends keyof ObjectType>(
  val: ObjectType[K],
  prop: K,
  obj: ObjectType,
): ObjectType[K] => ramdaPropOr(val, prop, obj);

export const pathOr = (defaultValue, path, obj) =>
  ramdaPathOr(defaultValue, path, obj);
