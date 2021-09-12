import { ConfigState } from '@roche/patterns-indicators/types/config.types';

import { Service } from '../service.types';

export interface IndicatorsConfigurationTemplateOptions {
  profileType: string;
  token?: string;
}

export type IndicatorsConfigurationTemplateService = (
  indicatorsConfigurationTemplateUrl: string,
) => Service<IndicatorsConfigurationTemplateOptions, ConfigState>;
