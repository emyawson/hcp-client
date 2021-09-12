import { StyledSystemProps } from 'src/theme/theme.types';

export type InputProps = any;

export type FormControlProps = {
  readonly model: string;
};

export type ControlledFieldProps = {
  readonly disabled: boolean;
  readonly onChange: (event: any) => void;
  readonly onFocus: (event: any) => void;
  readonly onKeyPress: (event: any) => void;
  readonly name: string;
};

export type ControlledInputProps = InputProps &
  FormControlProps &
  ControlledFieldProps;

export type InputTextProps = ControlledInputProps &
  StyledSystemProps & {
    hasError: boolean;
  };
