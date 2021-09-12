import { ValidationMap } from './validation.utils';

export type ValidatorFunction = typeof ValidationMap[keyof typeof ValidationMap];
