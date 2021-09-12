import { PATTERNS_AND_INDICATORS_NAMESPACE } from '@roche/patterns-indicators/constants/namespace.constants';
import { IThemeInterface } from '@roche/patterns-indicators/theme';
import { AppConfig } from '@roche/patterns-indicators/types/app-config.types';
import { createModule } from '@roche/patterns-indicators/utils/module/module-factory';
import { isConfig } from '@roche/patterns-indicators/utils/validation/is-config.utils';

import { CounterContainer } from './scenes';
import { counterEpic, counterReducer } from './store';

export const createCounterModule = createModule<
  typeof PATTERNS_AND_INDICATORS_NAMESPACE,
  any,
  any,
  any,
  AppConfig,
  IThemeInterface
>(
  PATTERNS_AND_INDICATORS_NAMESPACE,
  {
    counter: counterReducer,
  },
  [counterEpic],
  isConfig,
  CounterContainer,
);
