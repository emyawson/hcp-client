import * as React from 'react';
import { withTheme } from 'styled-components';

import { IndicatorsConfigurationTemplateName } from '@roche/patterns-indicators/constants/indicators-configuration-templates.constants';

import {
  Banner,
  Button,
  Card,
  Div,
  DropdownSelect,
} from '@roche/patterns-indicators/components';

import { SettingsMenuLink } from '@roche/patterns-indicators/dashboards/advanced-indicators/scenes/components';
import { translate } from '@roche/patterns-indicators/i18n/translate';
import { RenderIf } from '@roche/patterns-indicators/utils/markup';

import { PiProfileSetupProps, SelectOption } from './pi-profile-setup.types';

import {
  profileDropdownDefaultValues,
  profileDropdownOptions,
  profileTypeMap,
} from './pi-profile-setup.constants';

import {
  ButtonContainer,
  PiProfileSetupBody,
  PiProfileSetupBodyForm,
  PiProfileSetupBodyHeader,
  PiProfileSetupContainer,
  PiProfileSetupHeader,
  PiProfileSetupHeaderTextContainer,
  ProfileConfigContainer,
} from './pi-profile-setup.style';

import { findSelectOptionByValue } from './pi-profile-setup.utils';

const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  console.log('button clicked');
};

export class PiProfileSetupComponent extends React.Component<
  PiProfileSetupProps,
  any
> {
  public render() {
    const {
      children,
      calculationPeriod,
      cartridgeChange,
      profileType,
      theme,
      toggleDisplay,
      unit,
    } = this.props;

    const firstTimeUser = false; // TODO: determine this by info in store fetched from backend
    const selectedProfileType = profileType
      ? profileTypeMap[profileType]
      : null;
    return (
      <PiProfileSetupContainer>
        <Card>
          <RenderIf validate={firstTimeUser}>
            <Banner>Create a new patient profile message goes here</Banner>
          </RenderIf>
          <PiProfileSetupHeader firstTimeUser={firstTimeUser || !profileType}>
            <PiProfileSetupHeaderTextContainer>
              <span>Patient Setup</span>
            </PiProfileSetupHeaderTextContainer>
            <SettingsMenuLink
              caretDirection={firstTimeUser ? 'down' : 'up'}
              color={
                firstTimeUser || !profileType
                  ? theme.colors.grayMedium
                  : theme.colors.blue
              }
              onClick={toggleDisplay}
            />
          </PiProfileSetupHeader>
          <PiProfileSetupBody>
            <PiProfileSetupBodyHeader>
              <span>Configure Patient Profile</span>
            </PiProfileSetupBodyHeader>
            <PiProfileSetupBodyForm>
              <ProfileConfigContainer>
                <Div display="flex" flexDirection="column">
                  <span>
                    {translate('piProfileSelectors.profileSelect', null)}
                  </span>

                  <DropdownSelect
                    options={profileDropdownOptions}
                    placeholder="Select Profile"
                    optionFontSize={theme.fontSize.p}
                    onChange={this.setPiProfile}
                    selectedOption={findSelectOptionByValue(
                      profileDropdownOptions,
                      profileType,
                    )}
                  />
                </Div>
                <Div display="flex" flexDirection="column">
                  <span>
                    {translate(
                      'piProfileSelectors.calculationPeriodSelect',
                      null,
                    )}
                  </span>
                  <DropdownSelect
                    options={
                      profileType
                        ? selectedProfileType.calculationPeriodOptions
                        : []
                    }
                    disabled={!profileType}
                    defaultValue={
                      profileType
                        ? profileDropdownDefaultValues.calculationPeriodOptions
                        : undefined
                    }
                    placeholder="Select Calculation Period"
                    optionFontSize={theme.fontSize.p}
                    onChange={this.setCalculationPeriod}
                    selectedOption={
                      !profileType
                        ? undefined
                        : findSelectOptionByValue(
                            selectedProfileType.calculationPeriodOptions,
                            calculationPeriod,
                          )
                    }
                  />
                </Div>
                <Div display="flex" flexDirection="column">
                  <span>
                    {translate('piProfileSelectors.unitSelect', null)}
                  </span>
                  <DropdownSelect
                    options={profileType ? selectedProfileType.unitOptions : []}
                    disabled={!profileType}
                    defaultValue={
                      profileType
                        ? profileDropdownDefaultValues.unitOptions
                        : undefined
                    }
                    placeholder="Select Unit"
                    optionFontSize={theme.fontSize.p}
                    onChange={this.setUnit}
                    selectedOption={
                      !profileType
                        ? undefined
                        : findSelectOptionByValue(
                            selectedProfileType.unitOptions,
                            unit,
                          )
                    }
                  />
                </Div>
                {!profileType ||
                selectedProfileType.type ===
                  IndicatorsConfigurationTemplateName.INSULIN_PUMP ? (
                  <Div display="flex" flexDirection="column">
                    <span>
                      {translate(
                        'piProfileSelectors.cartridgeChangeSelect',
                        null,
                      )}
                    </span>
                    <DropdownSelect
                      options={
                        profileType
                          ? selectedProfileType.cartridgeChangeOptions
                          : []
                      }
                      disabled={!profileType}
                      defaultValue={
                        profileType
                          ? profileDropdownDefaultValues.cartridgeChangeOptions
                          : undefined
                      }
                      placeholder="Select Cartridge Change"
                      optionFontSize={theme.fontSize.p}
                      onChange={this.setCartridgeChange}
                      selectedOption={
                        !profileType
                          ? undefined
                          : findSelectOptionByValue(
                              selectedProfileType.cartridgeChangeOptions,
                              cartridgeChange,
                            )
                      }
                    />
                  </Div>
                ) : null}
              </ProfileConfigContainer>
            </PiProfileSetupBodyForm>
          </PiProfileSetupBody>
          <RenderIf validate={firstTimeUser}>
            <ButtonContainer>
              <Button
                onClick={handleClick}
                ariaLabel="Reset Configurations"
                type="secondary"
              >
                Reset Configurations
              </Button>
              <Button onClick={handleClick} ariaLabel="Save Configurations">
                Save Configurations
              </Button>
            </ButtonContainer>
          </RenderIf>
          <RenderIf validate={!firstTimeUser && profileType}>
            {children}
          </RenderIf>
        </Card>
      </PiProfileSetupContainer>
    );
  }

  private setCartridgeChange = (cartChange: SelectOption<number>) => {
    return this.props.setCatridgeChange(cartChange);
  };

  private setUnit = (unitVal: SelectOption<string>) => {
    return this.props.setUnit(unitVal);
  };

  private setCalculationPeriod = (calcPeriod: SelectOption<number>) => {
    return this.props.setCalculationPeriod(calcPeriod);
  };

  private setPiProfile = (profile: SelectOption<string>) => {
    return this.props.setPiProfile(profile);
  };
}

export const PiProfileSetup = withTheme(PiProfileSetupComponent);
