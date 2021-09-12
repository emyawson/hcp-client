import { getProcessEnv, getWindowEnv } from '../environment';

import { DynamicConfig, StaticConfig, StyleOutput } from './config.types';

export const isDevEnv = (): boolean =>
  getProcessEnv().NODE_ENV === 'development';

export const isTestEnv = (): boolean => getProcessEnv().NODE_ENV === 'test';

export const omitStylesFromTestEnv = (
  output: StyleOutput,
): StyleOutput | string => (isTestEnv() ? '' : output);

export const getStaticConfig = (): StaticConfig => getProcessEnv();
export const getDynamicConfig = (): DynamicConfig => getWindowEnv(window);
