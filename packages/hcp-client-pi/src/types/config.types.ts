import { ValidatorFunction } from '@roche/patterns-indicators/utils/templates/validation.types';

interface Const {
  text: string;
  value: string | number;
}

export interface ConstsContainer {
  [key: string]: Const[];
}

export interface Pattern {
  id: string;
  displayText: string;
  configText: string;
  informationText: string[];
  consts?: ConstsContainer;
}

export interface Category {
  id: string;
  patterns: Pattern[];
  underlyingCategory?: boolean | undefined;
}

export interface ConfigDetails {
  categories: Category[];
}

export interface TranslationText {
  [key: string]: string;
}

export interface ConfigState {
  [key: string]: {
    [key: string]: string | number | boolean | undefined;
  };
}

export interface ValidationConfig {
  [key: string]: PatternValidation | CategoryValidation;
}

export interface Validators {
  [key: string]: ValidatorFunction;
}

export type Validation = (NumberValidation | SelectValidation) & {
  required: boolean;
};

export interface PatternValidation {
  [key: string]: Validation;
}
export type CategoryValidation = PatternValidation;

export interface NumberValidation {
  min: number;
  max: number;
  type: 'number';
}

export interface SelectValidation {
  type: 'select';
}
