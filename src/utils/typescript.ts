export type Diff<T, U> = T extends U ? never : T;

export type StringMap = { [key: string]: string };

export const ensureNever = (action: never) => action;

export const isString = <T>(val: T): boolean => typeof val === 'string';

export type ValueOf<T> = T[keyof T];

export type Mutable<T extends { [x: string]: any }, K extends string> = {
  [P in K]: T[P]
};
