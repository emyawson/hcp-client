import {
  FlattenInterpolation,
  ThemedOuterStyledProps,
} from 'styled-components';

export type StaticConfig = {
  REACT_APP_VERSION: string;
};

export type DynamicConfig = {
  NODE_PATH: string;
  REACT_APP_API_VERSION: string;
  REACT_APP_API_ROOT: string;
  REACT_APP_GIGYA_TOKEN: string;
};

export type StyledComponentsOutput = Array<
  FlattenInterpolation<ThemedOuterStyledProps<any, any>>
>;

export type StyleOutput = StyledComponentsOutput | string;
