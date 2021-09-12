import { path, T } from 'ramda';
import * as React from 'react';
import { withTheme } from 'styled-components';

import { ErrorMessagesContainerState } from '@roche/patterns-indicators/domains/form-template-builder/scenes/error-messages/error-messages.container';
import { IThemeInterface } from '@roche/patterns-indicators/theme';
import {
  ConfigState,
  Validation,
  ValidationConfig,
  Validators,
} from '@roche/patterns-indicators/types/config.types';
import { augmentConfigDetailsWithTemplates } from '@roche/patterns-indicators/utils';
import { getOrderedListOfFieldsInTemplate } from '@roche/patterns-indicators/utils/templates/templates.utils';
import { makeValidationError } from '@roche/patterns-indicators/utils/templates/validation.utils';
import { ValidatorFn } from 'react-redux-form';

import { ErrorMessagesContent } from './error-messages.style';

export type ConnectedErrorMessageProps = ErrorMessagesProps &
  ErrorMessagesContainerState;

export interface ErrorMessagesProps {
  theme: IThemeInterface;
  pattern: string;
}

class ErrorMessagesComponent extends React.Component<
  ConnectedErrorMessageProps,
  {}
> {
  public static getValidationMap(
    pattern: string,
    currentState?: ConfigState,
    validators?: Validators,
    details?: ReturnType<typeof augmentConfigDetailsWithTemplates>,
  ) {
    if (!details || !currentState || !validators) {
      return;
    }

    const patternTemplate = path<string>([pattern, 'template'], details) || '';

    return getOrderedListOfFieldsInTemplate(patternTemplate).reduce(
      (validationAcc, orderedField) => {
        const orderedFieldValue = path([pattern, orderedField], currentState);

        const orderedFieldValidator =
          path<ValidatorFn>([pattern, orderedField], validators) || T;

        return [
          ...validationAcc,
          [
            [`${pattern}`, `${orderedField}`],
            orderedFieldValidator(orderedFieldValue),
          ],
        ];
      },
      [],
    );
  }

  public static getErrorList(
    validations?: ReturnType<typeof ErrorMessagesComponent.getValidationMap>,
  ) {
    return (validations || []).reduce(
      (
        validationsAcc,
        [[fieldPath, fieldName], isValid]: [[string, string], boolean],
      ) => {
        if (!isValid) {
          return [...validationsAcc, [fieldPath, fieldName]];
        }

        return validationsAcc;
      },
      [],
    );
  }

  public static getErrorMessage(
    [fieldPath, fieldName]: [string, string],
    validationConfig?: ValidationConfig,
  ) {
    const fieldValidation = path<Validation>(
      [fieldPath, fieldName],
      validationConfig,
    );

    return makeValidationError(fieldName, fieldValidation);
  }

  constructor(props: ConnectedErrorMessageProps) {
    super(props);
  }

  public render() {
    const {
      pattern,
      currentState,
      config,
      validators,
    }: ConnectedErrorMessageProps = this.props;

    const details = config && config.details;
    const validationConfig = config && config.validation;
    const areValid = ErrorMessagesComponent.getValidationMap(
      pattern,
      currentState,
      validators,
      details,
    );

    const errorList = ErrorMessagesComponent.getErrorList(areValid);
    return (
      <React.Fragment>
        {errorList.length > 0 ? (
          <ErrorMessagesContent>
            {' '}
            {errorList.map(([fieldPath, fieldName]: string[], i) => (
              <li key={i}>
                {ErrorMessagesComponent.getErrorMessage(
                  [fieldPath, fieldName],
                  validationConfig,
                )}
              </li>
            ))}
          </ErrorMessagesContent>
        ) : null}
      </React.Fragment>
    );
  }
}

export const ErrorMessagesBuilder = withTheme(ErrorMessagesComponent);
