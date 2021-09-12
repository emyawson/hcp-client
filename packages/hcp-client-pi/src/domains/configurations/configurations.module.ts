import { PATTERNS_AND_INDICATORS_NAMESPACE } from '@roche/patterns-indicators/constants/namespace.constants';
import {
  formTemplateBuilderEpic,
  formTemplateBuilderReducer,
} from '@roche/patterns-indicators/domains/form-template-builder/store';
import {
  piProfileSetupEpic,
  piProfileSetupReducer,
} from '@roche/patterns-indicators/domains/pi-profile-setup/store';
import { IThemeInterface } from '@roche/patterns-indicators/theme';
import { AppConfig } from '@roche/patterns-indicators/types/app-config.types';
import { createModule } from '@roche/patterns-indicators/utils/module/module-factory';
import { isConfig } from '@roche/patterns-indicators/utils/validation/is-config.utils';

import { ConfigurationsProps } from './configurations.component';
import { ConfigurationsContainer } from './configurations.container';

export const createConfigurationsModule = createModule<
  typeof PATTERNS_AND_INDICATORS_NAMESPACE,
  any,
  any,
  ConfigurationsProps,
  AppConfig,
  IThemeInterface
>(
  PATTERNS_AND_INDICATORS_NAMESPACE,
  {
    forms: formTemplateBuilderReducer,
    piProfileSetup: piProfileSetupReducer,
  },
  [formTemplateBuilderEpic, piProfileSetupEpic],
  isConfig,
  ConfigurationsContainer,
);
