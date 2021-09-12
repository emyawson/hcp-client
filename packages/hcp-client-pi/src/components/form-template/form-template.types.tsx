import { PatternValidation } from '../../types/config.types';

export interface SelectOption<T> {
  text: string;
  value: T;
}

export interface InputProps {
  disabled?: boolean;
  name: string;
  path: string;
  changeHandler?: ChangeHandler;
  value: number | string; // radio options string, everything else number
}

export interface RadioProps extends SelectProps<string> {
  groupName: string;
}

export interface SelectProps<T = number> extends InputProps {
  options: Array<SelectOption<T>>;
}

export interface NumberInputProps extends InputProps {
  value: number;
  validationConfig: PatternValidation;
}

export type FormControlState = SelectProps<any> | NumberInputProps | boolean;
export type FormControlStateContainer = { [key: string]: FormControlState };
export type ChangeHandler = <T>(
  path: string,
  fieldName: string,
  value: T,
) => void;

export interface FormTemplateProps {
  onChange: ChangeHandler;
  template: string;
  state: FormControlStateContainer;
  keyValue: string;
  validationConfig: PatternValidation;
}
