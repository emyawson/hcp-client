import { EXAMPLE_CONFIG } from 'src/constants/app-config.constants';

import { ConfigState } from './config.types';

export const configReducer = (state = {}, { type, payload }): ConfigState =>
  EXAMPLE_CONFIG;
