import { Action, PayloadAction } from '@roche/patterns-indicators/core';
import {
  ConfigState,
  Validation,
  ValidationConfig,
  Validators,
} from '@roche/patterns-indicators/types/config.types';
import { augmentConfigDetailsWithTemplates } from '@roche/patterns-indicators/utils';
import { Diff } from '@roche/patterns-indicators/utils/typescript';

export enum FormTemplateBuilderActionType {
  CHANGE_FORM = 'CHANGE_FORM',
  INIT_FORM_CONFIG = 'INIT_FORM_CONFIG',
  FETCH_INDICATORS_TEMPLATE_CONFIGURATIONS_START = 'FETCH_INDICATORS_TEMPLATE_CONFIGURATIONS_START',
  FETCH_INDICATORS_TEMPLATE_CONFIGURATIONS_SUCCESS = 'FETCH_INDICATORS_TEMPLATE_CONFIGURATIONS_SUCCESS',
  FETCH_INDICATORS_TEMPLATE_CONFIGURATIONS_ERROR = 'FETCH_INDICATORS_TEMPLATE_CONFIGURATIONS_ERROR',
}

export enum IndicatorsTemplateProfileType {
  METER = 'meter',
  INSULIN_PUMP = 'insulin-pump',
  BOLUS_CALCULATOR = 'bolus-calculator',
}

export interface FormTemplateBuilderState {
  config: {
    initialState: ConfigState;
    details: ReturnType<typeof augmentConfigDetailsWithTemplates>;
    validation: ValidationConfig;
  };
  currentState: ConfigState;
  validators: Validators;
}

export type ChangeFormPayload<T = any> = {
  path: string;
  fieldName: string;
  value: T;
};

export type ChangeFormAction = PayloadAction<
  typeof FormTemplateBuilderActionType.CHANGE_FORM,
  ChangeFormPayload,
  void
>;

export type InitializeFormConfigPayload = {
  state: ConfigState;
  validation: ValidationConfig;
  details: ReturnType<typeof augmentConfigDetailsWithTemplates>;
};

export type InitializeFormConfigAction = PayloadAction<
  typeof FormTemplateBuilderActionType.INIT_FORM_CONFIG,
  InitializeFormConfigPayload,
  void
>;

export interface FetchIndicatorsConfigurationTemplateStartPayload {
  profileType: IndicatorsTemplateProfileType;
}

export type FetchIndicatorsConfigurationTemplateStart = PayloadAction<
  FormTemplateBuilderActionType.FETCH_INDICATORS_TEMPLATE_CONFIGURATIONS_START,
  FetchIndicatorsConfigurationTemplateStartPayload,
  void
>;

export type FetchIndicatorsConfigurationTemplateSuccess = PayloadAction<
  FormTemplateBuilderActionType.FETCH_INDICATORS_TEMPLATE_CONFIGURATIONS_SUCCESS,
  ConfigState,
  void
>;

export type FetchIndicatorsConfigurationTemplateError = Action<
  FormTemplateBuilderActionType.FETCH_INDICATORS_TEMPLATE_CONFIGURATIONS_ERROR,
  void
>;

export type FetchIndicatorsConfigurationTemplateEpicActions = FetchIndicatorsConfigurationTemplateStart;

export type FetchIndicatorsConfigurationTemplateActions =
  | FetchIndicatorsConfigurationTemplateStart
  | FetchIndicatorsConfigurationTemplateSuccess
  | FetchIndicatorsConfigurationTemplateError;

export type FormTemplateBuilderActions =
  | FetchIndicatorsConfigurationTemplateStart
  | FetchIndicatorsConfigurationTemplateSuccess
  | FetchIndicatorsConfigurationTemplateError
  | ChangeFormAction
  | InitializeFormConfigAction;

export type FormTemplateBuilderEpicActions = FetchIndicatorsConfigurationTemplateStart;

// Without epic actions, all actions are reducer actions
export type FormTemplateBuilderReducerActions = Diff<
  FormTemplateBuilderActions,
  FormTemplateBuilderEpicActions
>;

export interface ValidationTarget {
  id: string;
  inputName: string;
  type: 'select' | 'number';
  validation: Validation;
  value: any;
}
