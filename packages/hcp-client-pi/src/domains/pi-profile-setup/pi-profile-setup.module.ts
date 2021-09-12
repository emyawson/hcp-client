import { PATTERNS_AND_INDICATORS_NAMESPACE } from '@roche/patterns-indicators/constants/namespace.constants';
import {
  formTemplateBuilderEpic,
  formTemplateBuilderReducer,
} from '@roche/patterns-indicators/domains/form-template-builder/store';
import { IThemeInterface } from '@roche/patterns-indicators/theme';
import { AppConfig } from '@roche/patterns-indicators/types/app-config.types';
import { createModule } from '@roche/patterns-indicators/utils/module/module-factory';
import { isConfig } from '@roche/patterns-indicators/utils/validation/is-config.utils';

import {
  PiProfileSetupContainer,
  PiProfileSetupContainerProps,
} from './scenes';
import { piProfileSetupReducer } from './store';

export const createPiProfileSetupModule = createModule<
  typeof PATTERNS_AND_INDICATORS_NAMESPACE,
  any,
  any,
  PiProfileSetupContainerProps,
  AppConfig,
  IThemeInterface
>(
  PATTERNS_AND_INDICATORS_NAMESPACE,
  {
    forms: formTemplateBuilderReducer,
    piProfileSetup: piProfileSetupReducer,
  },
  [formTemplateBuilderEpic],
  isConfig,
  PiProfileSetupContainer,
);
