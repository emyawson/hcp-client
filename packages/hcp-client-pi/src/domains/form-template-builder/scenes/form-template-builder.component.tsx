import { isEmpty } from 'ramda';
import * as React from 'react';
import { withTheme } from 'styled-components';

import { Button, ChangeHandler, SectionHeader } from '@roche/patterns-indicators/components';
import {
  FormControlStateContainer,
  FormTemplateComponent,
} from '@roche/patterns-indicators/components/form-template';
import { IThemeInterface } from '@roche/patterns-indicators/theme';
import {
  Category,
  ConfigState,
  ConstsContainer,
  NumberValidation,
  SelectValidation,
  TranslationText,
  ValidationConfig,
} from '@roche/patterns-indicators/types/config.types';
import { RenderIf } from '@roche/patterns-indicators/utils/markup/render-if.utils';
import { ValidationMap } from '@roche/patterns-indicators/utils/templates/validation.utils';

import { ToggleSwitch } from '../../../components/toggle-switch/toggle-switch.component';
import { ButtonContainer } from '../../pi-profile-setup/scenes/pi-profile-setup.style';
import { ValidationTarget } from '../store/form-template-builder.types';

import { ErrorMessagesContainer } from './error-messages/error-messages.container';
import { ENABLED } from './form-template-builder.constant';
import {
  CategoryHeader,
  PatternContainer,
  PatternHeader,
  ToggleSwitchContainer,
} from './form-template-builder.style';

export interface FormTemplateBuilderProps {
  categoryDetails: Category;
  changeHandler: ChangeHandler;
  configState: ConfigState;
  headerText: string;
  theme: IThemeInterface;
  translationText: TranslationText;
  validationConfig: ValidationConfig;
}

export const convertStatePatternToFormTemplateState = (
  categoryId: string,
  patternId: string,
  consts: ConstsContainer,
  configState: ConfigState,
): FormControlStateContainer => {
  const patternState = configState[patternId];

  return Object.keys(patternState).reduce((patternFields, patternField) => {
    if (patternField === ENABLED) {
      return patternFields;
    }

    if (!consts[patternField]) {
      return {
        ...patternFields,
        [patternField]: {
          name: patternField,
          value: patternState[patternField],
          path: patternId,
        },
      };
    }

    return {
      ...patternFields,
      [patternField]: {
        name: patternField,
        options: consts[patternField],
        value: patternState[patternField],
        path: patternId,
      },
    };
  }, {});
};

class FormTemplateBuilderComponent extends React.Component<
  FormTemplateBuilderProps
> {
  constructor(props: FormTemplateBuilderProps) {
    super(props);
  }

  // TODO: check that this includes radio button after adding to validation config
  public flattenPatternInputs(): ValidationTarget[] {
    const { categoryDetails, validationConfig, configState } = this.props;
    const inputTargets: ValidationTarget[] = [];

    categoryDetails.patterns.map(pattern => {
      const currentConfig = validationConfig[pattern.id];

      if (
        currentConfig &&
        pattern.id &&
        configState &&
        configState[pattern.id]
      ) {
        Object.keys(currentConfig).map(inputName => {
          const currentInput = {
            id: pattern.id,
            inputName,
            type: currentConfig[inputName].type,
            validation: currentConfig[inputName],
            value: configState[pattern.id][inputName] as number,
          };
          inputTargets.push(currentInput);
        });
      }
    });

    return inputTargets;
  }

  public validateCurrentInput(currentInput: ValidationTarget): boolean {
    switch (currentInput.type) {
      case 'number':
        const numberValidation = ValidationMap.number(
          currentInput.validation as NumberValidation & { required: boolean },
        );
        return numberValidation(currentInput.value);

      case 'select':
        const selectValidation = ValidationMap.select(
          currentInput.validation as SelectValidation & { required: boolean },
        );
        return selectValidation(currentInput.value);

      default:
        return false;
    }
  }

  public checkAllFieldsValid(): boolean {
    const { configState } = this.props;
    if (configState === undefined) {
      return false;
    }
    return this.flattenPatternInputs().every(this.validateCurrentInput);
  }

  public makeChangeHandler(path, fieldName) {
    return (event: React.ChangeEvent<any>) => {
      const eventValue = event.target.checked;

      // tslint:disable-next-line:no-unused-expression
      this.props.changeHandler &&
        this.props.changeHandler(path, fieldName, eventValue);
    };
  }

  public mockReset = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  public mockSave = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  public mockFormHandler = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
  };

  public render() {
    const {
      categoryDetails,
      changeHandler,
      configState,
      headerText,
      theme,
      translationText,
      validationConfig,
    } = this.props;

    // necessary for TypeScript validation
    if (isEmpty(configState)) {
      return <React.Fragment />;
    }

    return (
      <form
        id={categoryDetails.id}
        key={`form-${categoryDetails.id}`}
        onSubmit={this.mockFormHandler}
      >
        <CategoryHeader>
          <SectionHeader
            borderColor={theme.colors.silverDark}
            title={headerText}
          />
        </CategoryHeader>
        {categoryDetails.patterns.map(pattern => {
          let toggleEnabled;

          if (!configState || !configState[pattern.id]) {
            return <React.Fragment key={pattern.id + 'container'} />;
          }

          const enabledValue = configState[pattern.id].enabled;
          const togglePresent = enabledValue !== undefined;
          if (togglePresent) {
            if (enabledValue === true) {
              toggleEnabled = true;
            } else if (enabledValue === false) {
              toggleEnabled = false;
            }
          } else if (!togglePresent) {
            toggleEnabled = true;
          }

          return (
            <RenderIf
              key={pattern.id + 'container'}
              validate={configState[pattern.id]}
            >
              <PatternContainer key={pattern.id}>
                <PatternHeader>
                  {translationText[pattern.id]}
                  <RenderIf
                    validate={
                      configState &&
                      configState[pattern.id].enabled !== undefined
                    }
                  >
                    <ToggleSwitchContainer>
                      <ToggleSwitch
                        checked={toggleEnabled}
                        changeHandler={
                          this.makeChangeHandler(
                            pattern.id,
                            'enabled',
                          ) as () => void
                        }
                        id={`toggle-switch-${pattern.id}`}
                        label=""
                      />
                    </ToggleSwitchContainer>
                  </RenderIf>
                </PatternHeader>
                <RenderIf validate={configState[pattern.id] && toggleEnabled}>
                  <FormTemplateComponent
                    key={`form-template-${pattern.id}`}
                    onChange={changeHandler}
                    state={convertStatePatternToFormTemplateState(
                      categoryDetails.id,
                      pattern.id,
                      pattern.consts ? pattern.consts : {},
                      configState,
                    )}
                    template={translationText[pattern.configText]}
                    keyValue={pattern.id}
                    validationConfig={validationConfig[pattern.id]}
                  />
                </RenderIf>
                <RenderIf validate={validationConfig[pattern.id]}>
                  <ErrorMessagesContainer pattern={pattern.id} />
                </RenderIf>
              </PatternContainer>
            </RenderIf>
          );
        })}
        <ButtonContainer>
          <Button
            disabled={this.checkAllFieldsValid() === false}
            onClick={this.mockReset}
            ariaLabel="Reset Configurations"
            type="secondary"
          >
            Reset Configurations
          </Button>
          <Button
            onClick={this.mockSave}
            ariaLabel="Save Configurations"
            disabled={this.checkAllFieldsValid() === false}
          >
            Save Configurations
          </Button>
        </ButtonContainer>
      </form>
    );
  }
}

export const FormTemplateBuilder = withTheme(FormTemplateBuilderComponent);
