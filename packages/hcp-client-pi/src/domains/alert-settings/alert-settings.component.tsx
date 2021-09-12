import * as React from 'react';
import { withTheme } from 'styled-components';

import { RightChevronIcon } from '@roche/patterns-indicators/assets/icons/right-chevron-icon';
import { ChangeHandler, Div, ToggleSwitch } from '@roche/patterns-indicators/components';
import { FormTemplateBuilderContainer } from '@roche/patterns-indicators/domains';
import { IThemeInterface } from '@roche/patterns-indicators/theme';
import {
  Category,
  ConfigDetails,
  ConfigState,
  TranslationText,
  ValidationConfig,
} from '@roche/patterns-indicators/types/config.types';
import { RenderIf } from '@roche/patterns-indicators/utils/markup/render-if.utils';

import { StyledAlertSettings } from './alert-settings.style';
import { VerticalTab, VerticalTabs } from './components/vertical-tabs';

export interface AlertSettingsProps {
  changeHandler: ChangeHandler;
  configDetails: ConfigDetails;
  configState: ConfigState;
  theme: IThemeInterface;
  translationText: TranslationText;
  validationConfig: ValidationConfig;
}

export interface AlertSettingsState {
  selectedTabIndex: number;
}

class AlertSettingsComponent extends React.Component<
  AlertSettingsProps,
  AlertSettingsState
> {
  constructor(props: AlertSettingsProps) {
    super(props);
    this.state = {
      selectedTabIndex: 0,
    };
  }

  public makeChangeHandler(path, fieldName) {
    return (event: React.ChangeEvent<any>) => {
      const eventValue = event.target.checked;

      // tslint:disable-next-line:no-unused-expression
      this.props.changeHandler &&
        this.props.changeHandler(path, fieldName, eventValue);
    };
  }

  public render() {
    const {
      configDetails,
      configState,
      translationText,
      validationConfig,
    } = this.props;

    return (
      <StyledAlertSettings>
        {/* TODO: get translation string */}
        <VerticalTabs
          headerText="Personal Alert Settings"
          minHeight={250}
          setSelectedTabIndex={this.setSelectedTabIndex}
          tabs={configDetails.categories.reduce(
            (
              categoryForms: VerticalTab[],
              category: Category,
              index: number,
            ) => {
              if (!configState[category.id]) {
                return categoryForms;
              }
              const toggleEnabled =
                configState[category.id] && configState[category.id].enabled
                  ? true
                  : false;

              return [
                ...categoryForms,
                {
                  enabled: toggleEnabled,
                  label:
                    !configState || !configState[category.id] ? (
                      <React.Fragment />
                    ) : (
                      <Div display="flex">
                        <Div
                          flex="1 1 auto"
                          color={this.getColor(index, toggleEnabled)}
                        >
                          {translationText[category.id].toUpperCase()}
                        </Div>
                        <Div display="flex" flex="0 1 auto">
                          <RenderIf validate={!category.underlyingCategory}>
                            <ToggleSwitch
                              changeHandler={
                                this.makeChangeHandler(
                                  category.id,
                                  'enabled',
                                ) as () => void
                              }
                              checked={toggleEnabled}
                              id={`${index}`}
                              label=""
                            />
                          </RenderIf>
                          <RightChevronIcon
                            strokeColor={this.getColor(index, toggleEnabled)}
                          />
                        </Div>
                      </Div>
                    ),
                  content: (
                    <FormTemplateBuilderContainer
                      categoryDetails={category}
                      configState={configState}
                      headerText={`${
                        translationText[category.id]
                      } Configurations`}
                      translationText={translationText}
                      validationConfig={validationConfig}
                    />
                  ),
                  selected: false,
                  toggled: false,
                  shouldShowToggle: true,
                },
              ];
            },
            [],
          )}
        />
      </StyledAlertSettings>
    );
  }

  private getColor = (index: number, enabled: boolean) => {
    const { theme } = this.props;
    if (!theme) {
      return undefined;
    }

    if (!enabled) {
      return theme.colors.grayLight;
    }

    return index === this.state.selectedTabIndex
      ? theme.colors.darkBlueMarine
      : theme.colors.black;
  };

  private setSelectedTabIndex = (index: number) => {
    this.setState({ selectedTabIndex: index });
  };
}

export const AlertSettings = withTheme(AlertSettingsComponent);
