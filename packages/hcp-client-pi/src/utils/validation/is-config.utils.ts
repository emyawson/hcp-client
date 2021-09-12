import { AppConfig } from '@roche/patterns-indicators/types/app-config.types';

import { composeValidators, TypeValidator } from './types.utils';

const isString = (x): x is string => typeof x === 'string';

export const isConfig = (x: any): x is AppConfig =>
  TypeValidator<AppConfig>({
    endpoints: TypeValidator<AppConfig['endpoints']>({
      indicatorsConfigurationTemplate: composeValidators(isString),
    }),
  })(x);
