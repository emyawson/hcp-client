import { epics } from './epic';
import { reducers } from './reducer';
import { IThemeInterface } from './theme';
import { AppConfig } from './types/app-config.types';
import { createModule } from './utils/module/module-factory';
import { isConfig } from './utils/validation/is-config.utils';

import { PATTERNS_AND_INDICATORS_NAMESPACE } from './constants/namespace.constants';
import { AdvancedIndicatorsContainer } from './dashboards';

export const createPatternsAndIndicators = createModule<
  typeof PATTERNS_AND_INDICATORS_NAMESPACE,
  any,
  any,
  {},
  AppConfig,
  IThemeInterface
>(
  PATTERNS_AND_INDICATORS_NAMESPACE,
  reducers,
  epics,
  isConfig,
  AdvancedIndicatorsContainer,
);
