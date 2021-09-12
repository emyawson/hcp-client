import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Dispatch } from 'redux';

import { SelectOption } from '@roche/patterns-indicators/components';
import { IndicatorsConfigurationTemplateName } from '@roche/patterns-indicators/constants/indicators-configuration-templates.constants';
import { State } from '@roche/patterns-indicators/core';
import { fetchIndicatorsConfigurationTemplatesStart } from '@roche/patterns-indicators/domains/form-template-builder/store';
import { Omit } from '@roche/patterns-indicators/utils/typescript';

import {
  SetCalculationPeriod,
  SetCatridgeChange,
  SetPiProfile,
  SetUnit,
} from '../store';

import { PiProfileSetup } from './pi-profile-setup.component';
import { selectProfile } from './pi-profile-setup.selector';
import { PiProfileSetupProps } from './pi-profile-setup.types';

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
  fetchIndicatorsConfigurationTemplatesStart: payload =>
    dispatch(fetchIndicatorsConfigurationTemplatesStart(payload)),
  setPiProfile: ({
    value,
  }: SelectOption<IndicatorsConfigurationTemplateName>) =>
    dispatch(SetPiProfile(value)),
  setCalculationPeriod: ({ value }: SelectOption<number>) =>
    dispatch(SetCalculationPeriod(value)),
  setUnit: ({ value }: SelectOption<string>) => dispatch(SetUnit(value)),
  setCatridgeChange: ({ value }: SelectOption<number>) =>
    dispatch(SetCatridgeChange(value)),
});

type DispatchProps =
  | 'fetchIndicatorsConfigurationTemplatesStart'
  | 'setCalculationPeriod'
  | 'setCatridgeChange'
  | 'setPiProfile'
  | 'setUnit';

type StateProps = 'profileType';

type ContainerProps = DispatchProps | StateProps;

export type PiProfileSetupContainerProps = Omit<
  PiProfileSetupProps,
  ContainerProps
>;

export const PiProfileSetupContainer: React.ComponentClass<
  PiProfileSetupContainerProps
> = compose<
  Pick<PiProfileSetupProps, ContainerProps>,
  PiProfileSetupContainerProps
>(
  connect(
    selectProfile,
    mapDispatchToProps,
  ),
)(PiProfileSetup);
