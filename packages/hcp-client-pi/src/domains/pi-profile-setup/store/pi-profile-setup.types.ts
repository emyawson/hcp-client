import { IndicatorsConfigurationTemplateName } from '@roche/patterns-indicators/constants/indicators-configuration-templates.constants';
import { PayloadAction } from '@roche/patterns-indicators/core';

export enum PiProfileSetupActionTypes {
  SET_PI_PROFILE_TYPE = 'SET_PI_PROFILE_TYPE',
  SET_CALCULATION_PERIOD = 'SET_CALCULATION_PERIOD',
  SET_UNIT = 'SET_UNIT',
  SET_CATRIDGE_CHANGE = 'SET_CATRIDGE_CHANGE',
}

export type PiProfileSetupState = {
  readonly profileType: string | undefined;
  readonly calculationPeriod: number | undefined;
  readonly cartridgeChange?: number | undefined;
  readonly unit: string;
};

export type SetPiProfileTypeAction = PayloadAction<
  PiProfileSetupActionTypes.SET_PI_PROFILE_TYPE,
  IndicatorsConfigurationTemplateName
>;
export type SetCalculationPeriodAction = PayloadAction<
  PiProfileSetupActionTypes.SET_CALCULATION_PERIOD,
  number
>;
export type SetUnitAction = PayloadAction<
  PiProfileSetupActionTypes.SET_UNIT,
  string
>;
export type SetCatridgeChangeAction = PayloadAction<
  PiProfileSetupActionTypes.SET_CATRIDGE_CHANGE,
  number
>;

export type PiProfileSetupActions =
  | SetPiProfileTypeAction
  | SetCalculationPeriodAction
  | SetUnitAction
  | SetCatridgeChangeAction;

export type PiProfileSetupReducerActions = PiProfileSetupActions;
