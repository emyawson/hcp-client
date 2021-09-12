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
  AlertSettingsContainer,
  AlertSettingsContainerProps,
} from './alert-settings.container';

export const createAlertSettingsModule = createModule<
  typeof PATTERNS_AND_INDICATORS_NAMESPACE,
  any,
  any,
  AlertSettingsContainerProps,
  AppConfig,
  IThemeInterface
>(
  PATTERNS_AND_INDICATORS_NAMESPACE,
  {
    forms: formTemplateBuilderReducer,
  },
  [formTemplateBuilderEpic],
  isConfig,
  AlertSettingsContainer,
);
