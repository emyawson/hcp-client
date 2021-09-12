import { getJSON } from '@roche/patterns-indicators/utils';

import { ConfigState } from '@roche/patterns-indicators/types/config.types';

import { createService } from '../service';

import {
  IndicatorsConfigurationTemplateOptions,
  IndicatorsConfigurationTemplateService,
} from './indicators-configuration-template.types';

// TODO: add dynamic config for URL to hit
const indicatorsConfigurationTransform = indicatorsConfiguration =>
  indicatorsConfiguration;

/**
 * @param {string} token
 * @returns {Promise<ConfigState>}
 */
const indicatorsConfigurationRequest = (
  indicatorsConfigurationTemplateUrl: string,
) => ({
  profileType,
}: // token, TODO: add authentication
IndicatorsConfigurationTemplateOptions): Promise<ConfigState> =>
  getJSON(`${indicatorsConfigurationTemplateUrl}?profile_type=${profileType}`, {
    // headers: {
    // Authorization: token,
    // },
  });

export const indicatorsConfigurationTemplateService: IndicatorsConfigurationTemplateService = (
  indicatorsConfigurationTemplateUrl: string,
) =>
  createService(
    indicatorsConfigurationRequest('https://univ-uploader-dev.rochedc.accentureanalytics.com/hcp-backend-pi/v1/indicators-configuration-template'),
    indicatorsConfigurationTransform,
  );
