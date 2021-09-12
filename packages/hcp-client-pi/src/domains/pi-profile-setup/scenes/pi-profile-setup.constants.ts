import { IndicatorsConfigurationTemplateName } from '@roche/patterns-indicators/constants/indicators-configuration-templates.constants';

import {
  BolusProfileType,
  InsulinProfileType,
  MeterProfileType,
  SelectOption,
} from './pi-profile-setup.types';

const CALCULATION_PERIOD_OPTIONS = [
  {
    label: '2 Weeks',
    value: 14,
  },
  {
    label: '4 Weeks',
    value: 28,
    default: true,
  },
  {
    label: '6 Weeks',
    value: 42,
  },
  {
    label: '8 Weeks',
    value: 56,
  },
  {
    label: '12 Weeks',
    value: 84,
  },
];

const UNIT_OPTIONS = [
  {
    label: 'mg/dL',
    value: 'mg/dL',
    default: true,
  },
]; // TODO implement mmol/L later

const createCartridgeChangeOptions = (): Array<SelectOption<number>> => {
  const options: Array<SelectOption<number>> = [];
  for (let i = 1; i <= 14; i++) {
    options.push({
      label: `Every ${i} Day${i > 1 ? 's' : ''}`,
      value: i,
    });
  }
  return options;
};

export const CARTRIDGE_CHANGE_OPTIONS = createCartridgeChangeOptions();

const insulinProfileType: InsulinProfileType = {
  type: IndicatorsConfigurationTemplateName.INSULIN_PUMP,
  cartridgeChangeOptions: CARTRIDGE_CHANGE_OPTIONS,
  calculationPeriodOptions: CALCULATION_PERIOD_OPTIONS,
  unitOptions: UNIT_OPTIONS,
};

const meterProfileType: MeterProfileType = {
  type: IndicatorsConfigurationTemplateName.METER,
  calculationPeriodOptions: CALCULATION_PERIOD_OPTIONS,
  unitOptions: UNIT_OPTIONS,
};

const bolusProfileType: BolusProfileType = {
  type: IndicatorsConfigurationTemplateName.BOLUS_CALCULATOR,
  calculationPeriodOptions: CALCULATION_PERIOD_OPTIONS,
  unitOptions: UNIT_OPTIONS,
};

export const profileTypeMap = {
  [IndicatorsConfigurationTemplateName.BOLUS_CALCULATOR]: bolusProfileType,
  [IndicatorsConfigurationTemplateName.METER]: meterProfileType,
  [IndicatorsConfigurationTemplateName.INSULIN_PUMP]: insulinProfileType,
};

export const profileDropdownOptions: Array<SelectOption<string>> = [
  {
    label: 'Bolus Calculator',
    value: IndicatorsConfigurationTemplateName.BOLUS_CALCULATOR,
  },
  {
    label: 'Insulin Pump',
    value: IndicatorsConfigurationTemplateName.INSULIN_PUMP,
  },
  {
    label: 'Meter',
    value: IndicatorsConfigurationTemplateName.METER,
  },
];

export const profileDropdownDefaultValues = {
  calculationPeriodOptions: CALCULATION_PERIOD_OPTIONS[1],
  unitOptions: UNIT_OPTIONS[0],
  cartridgeChangeOptions: CARTRIDGE_CHANGE_OPTIONS[6],
};
