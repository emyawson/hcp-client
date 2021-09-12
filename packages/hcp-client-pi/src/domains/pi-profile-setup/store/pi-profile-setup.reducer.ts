import { IndicatorsConfigurationTemplateName } from '@roche/patterns-indicators/constants/indicators-configuration-templates.constants';

import {
  PiProfileSetupActionTypes,
  PiProfileSetupReducerActions,
  PiProfileSetupState,
} from './pi-profile-setup.types';

export const initialPiProfileSetupState: PiProfileSetupState = {
  profileType: undefined,
  calculationPeriod: undefined,
  cartridgeChange: undefined,
  unit: '',
};

export const piProfileSetupReducer = (
  state = initialPiProfileSetupState,
  action: PiProfileSetupReducerActions,
): PiProfileSetupState => {
  switch (action.type) {
    case PiProfileSetupActionTypes.SET_PI_PROFILE_TYPE:
      return action.payload !== IndicatorsConfigurationTemplateName.INSULIN_PUMP
        ? {
            ...state,
            cartridgeChange: undefined,
            profileType: action.payload,
          }
        : {
            ...state,
            profileType: action.payload,
          };
    case PiProfileSetupActionTypes.SET_CALCULATION_PERIOD:
      return {
        ...state,
        calculationPeriod: action.payload,
      };
    case PiProfileSetupActionTypes.SET_UNIT:
      return {
        ...state,
        unit: action.payload,
      };
    case PiProfileSetupActionTypes.SET_CATRIDGE_CHANGE:
      return {
        ...state,
        cartridgeChange: action.payload,
      };
    case PiProfileSetupActionTypes.SET_CALCULATION_PERIOD:
      return {
        ...state,
        calculationPeriod: action.payload,
      };
    case PiProfileSetupActionTypes.SET_UNIT:
      return {
        ...state,
        unit: action.payload,
      };
    case PiProfileSetupActionTypes.SET_CATRIDGE_CHANGE:
      return {
        ...state,
        cartridgeChange: action.payload,
      };
    default:
      return state;
  }
};
