import {
  assoc,
  assocPath,
  path as ramdaPath,
  pathOr as ramdaPathOr,
  propOr as ramdaPropOr,
} from 'ramda';

import { GetIn, PathOr, SetIn } from './ramda.utils.types';

export const set = <O, K extends keyof O>(key: keyof O, val: O[K], object: O) =>
  assoc(key as string, val, object);

export const setIn: SetIn = (path, val, object) => assocPath(path, val, object);

export const getIn: GetIn = (path, obj) => ramdaPath(path, obj);

export const propOr = <ObjectType, K extends keyof ObjectType>(
  val: ObjectType[K],
  prop: K,
  obj: ObjectType,
): ObjectType[K] => ramdaPropOr(val, prop as string, obj);

export const pathOr: PathOr = (defaultValue, path, obj) =>
  ramdaPathOr(defaultValue, path, obj);
