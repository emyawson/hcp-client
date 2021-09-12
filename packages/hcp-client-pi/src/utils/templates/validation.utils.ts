import { T } from 'ramda';

import {
  CategoryValidation,
  NumberValidation,
  PatternValidation,
  SelectValidation,
  Validation,
  ValidationConfig,
} from '@roche/patterns-indicators/types/config.types';

export const ValidationMap = {
  number: (validation: NumberValidation & { required: boolean }) => (
    value: number,
  ) => {
    return (
      value >= validation.min &&
      value <= validation.max &&
      (validation.required ? value != null : true)
    );
  },
  select: (validation: SelectValidation & { required: boolean }) => (
    value: number,
  ) => {
    return validation.required ? value != null : true;
  },
};

// TODO: should potentially use different names for fields in error messages?
export const ValidationErrorMap = {
  number: (
    validation: NumberValidation & { required: boolean },
    fieldName,
  ): string => {
    return `Must be a value between ${validation.min} and ${validation.max}`;
  },

  select: (
    validation: SelectValidation & { required: boolean },
    fieldName,
  ): string => {
    return `${fieldName} requires a value from the dropdown`;
  },
};

export const makeValidator = (
  patternFieldName: string,
  validation: Validation,
) => {
  // @ts-ignore
  if (ValidationMap.hasOwnProperty(validation.type)) {
    // @ts-ignore
    return ValidationMap[validation.type](validation);
  }

  /* we don't have a validator for this case, and we really shouldn't be
   * asking for this validator, but if we are ... always return true */
  return T;
};

export const makeValidationError = (
  patternFieldName: string,
  validation?: Validation,
) => {
  // @ts-ignore
  if (validation && ValidationErrorMap.hasOwnProperty(validation.type)) {
    // @ts-ignore
    return ValidationErrorMap[validation.type](validation, patternFieldName);
  }

  /* we don't have a validation error message for this case, and we really shouldn't be
   * asking for this error message, but if we are ... always return a generic string */
  return 'Error';
};

export const makeValidators = (validationConfig: ValidationConfig) => {
  return Object.keys(validationConfig).reduce(
    (acc, patternOrCategoryValidationPath: keyof ValidationConfig) => {
      const patternOrCategoryValidation:
        | PatternValidation
        | CategoryValidation =
        validationConfig[patternOrCategoryValidationPath];

      return {
        ...acc,
        [patternOrCategoryValidationPath]: {
          ...Object.keys(patternOrCategoryValidation).reduce(
            (patternOrCategoryAcc, fieldName: string) => ({
              ...patternOrCategoryAcc,
              [fieldName]: makeValidator(
                fieldName,
                patternOrCategoryValidation[fieldName],
              ),
            }),
            {},
          ),
        },
      };
    },
    {},
  );
};
