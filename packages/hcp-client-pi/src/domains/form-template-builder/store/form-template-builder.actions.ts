import { IndicatorsConfigurationTemplateName } from '@roche/patterns-indicators/constants/indicators-configuration-templates.constants';
import { createPayloadAction } from '@roche/patterns-indicators/core';
import { InitializeFormConfigPayload } from '@roche/patterns-indicators/domains/form-template-builder/store/form-template-builder.types';
import { ConfigState } from '@roche/patterns-indicators/types/config.types';

import {
  ChangeFormAction,
  FormTemplateBuilderActionType,
  InitializeFormConfigAction,
} from './form-template-builder.types';

export const changeForm = (
  path: string,
  fieldName: string,
  value: any,
): ChangeFormAction =>
  createPayloadAction(FormTemplateBuilderActionType.CHANGE_FORM, {
    value,
    fieldName,
    path,
  });

export const initializeFormConfig = ({
  state,
  validation,
  details,
}: InitializeFormConfigPayload): InitializeFormConfigAction =>
  createPayloadAction(FormTemplateBuilderActionType.INIT_FORM_CONFIG, {
    state,
    validation,
    details,
  });

export const fetchIndicatorsConfigurationTemplatesStart = (payload: {
  profileType: IndicatorsConfigurationTemplateName;
}) =>
  createPayloadAction(
    FormTemplateBuilderActionType.FETCH_INDICATORS_TEMPLATE_CONFIGURATIONS_START,
    payload,
  );

export const fetchIndicatorsConfigurationTemplatesSuccess = (
  configState: ConfigState,
) =>
  createPayloadAction(
    FormTemplateBuilderActionType.FETCH_INDICATORS_TEMPLATE_CONFIGURATIONS_SUCCESS,
    configState,
  );

export const fetchIndicatorsConfigurationTemplatesError = (error: any) =>
  createPayloadAction(
    FormTemplateBuilderActionType.FETCH_INDICATORS_TEMPLATE_CONFIGURATIONS_ERROR,
    error,
  );
