import { IndicatorsConfigurationTemplateName } from '@roche/patterns-indicators/constants/indicators-configuration-templates.constants';
import { FetchIndicatorsConfigurationTemplateStartPayload } from '@roche/patterns-indicators/domains/form-template-builder/store';

export type PiProfileSetupProps = {
  children?: JSX.Element;
  fetchIndicatorsConfigurationTemplatesStart: (
    payload: FetchIndicatorsConfigurationTemplateStartPayload,
  ) => void;
  calculationPeriod?: number;
  cartridgeChange?: number;
  profileType?: string;
  unit?: string;
  setCalculationPeriod: (calc: SelectOption<number>) => void;
  setCatridgeChange: (cartridge: SelectOption<number>) => void;
  setPiProfile: (profileType: SelectOption<string>) => void;
  setUnit: (unit: SelectOption<string>) => void;
  theme?: any;
  toggleDisplay: () => void;
};

export interface SelectOption<T> {
  label: string;
  value: T;
}

export type BolusProfileType = {
  type: IndicatorsConfigurationTemplateName.BOLUS_CALCULATOR;
} & ProfileOptions;

export type InsulinProfileType = {
  type: IndicatorsConfigurationTemplateName.INSULIN_PUMP;
  cartridgeChangeOptions: Array<SelectOption<number>>;
} & ProfileOptions;

export type MeterProfileType = {
  type: IndicatorsConfigurationTemplateName.METER;
} & ProfileOptions;

export type ProfileOptions = {
  calculationPeriodOptions: Array<SelectOption<number>>;
  unitOptions: Array<SelectOption<string>>;
};

export type ProfileType =
  | BolusProfileType
  | InsulinProfileType
  | MeterProfileType;
