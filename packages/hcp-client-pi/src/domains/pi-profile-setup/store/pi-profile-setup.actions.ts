import { IndicatorsConfigurationTemplateName } from '@roche/patterns-indicators/constants/indicators-configuration-templates.constants';
import { createPayloadAction } from '@roche/patterns-indicators/core';

import {
  PiProfileSetupActionTypes,
  SetCalculationPeriodAction,
  SetCatridgeChangeAction,
  SetPiProfileTypeAction,
  SetUnitAction,
} from './pi-profile-setup.types';

export const SetPiProfile = (
  profileType: IndicatorsConfigurationTemplateName,
): SetPiProfileTypeAction =>
  createPayloadAction(
    PiProfileSetupActionTypes.SET_PI_PROFILE_TYPE,
    profileType,
  );
export const SetUnit = (unit: string): SetUnitAction =>
  createPayloadAction(PiProfileSetupActionTypes.SET_UNIT, unit);
export const SetCalculationPeriod = (
  calculationPeriod: number,
): SetCalculationPeriodAction =>
  createPayloadAction(
    PiProfileSetupActionTypes.SET_CALCULATION_PERIOD,
    calculationPeriod,
  );
export const SetCatridgeChange = (
  cartridgeChange: number,
): SetCatridgeChangeAction =>
  createPayloadAction(
    PiProfileSetupActionTypes.SET_CATRIDGE_CHANGE,
    cartridgeChange,
  );
