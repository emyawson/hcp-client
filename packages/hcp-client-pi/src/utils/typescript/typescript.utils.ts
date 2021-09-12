export type Diff<T, U> = T extends U ? never : T;

export type StringMap = { [key: string]: string };

export type ValueOf<T> = T[keyof T];

export const ensureNever = (action: never) => action;

export const isString = <T>(val: T): boolean => typeof val === 'string';

export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

export type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };
