import * as styledComponents from 'styled-components';

import { animations } from './animations';
import { borderRadius } from './border-radius';
import { boxShadow, boxShadows } from './box-shadow';
import { breakpoints } from './breakpoints';
import { colors } from './colors';
import { space, spacing } from './spacing';
import { StyledSystemProps } from './theme.types';
import { transitions } from './transitions';
import {
  BASE_FONT_SIZE,
  fontSize,
  fontSizes,
  letterSpacing,
} from './typography';
import { fontWeights } from './weight';
import { zIndexes, zIndexScale } from './z-index';

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  IThemeInterface
>;

export interface IThemeInterface {
  BASE_FONT_SIZE: number;
  boxShadow: typeof boxShadow;
  boxShadows: { [key: string]: string };
  animations: { [key: string]: string };
  borderRadius: string[];
  breakpoints: number[];
  colors: { [key: string]: string };
  fontSize: { [key: string]: string };
  fontSizes: number[];
  fontWeights: { [key: string]: number };
  letterSpacing: { [key: string]: string };
  spacing: { [key: string]: string };
  space: string[];
  textStyles: any;
  transitions: { [key: string]: string };
  zIndexes: typeof zIndexes;
}

export const theme = {
  BASE_FONT_SIZE,
  animations,
  boxShadow,
  boxShadows,
  borderRadius,
  breakpoints,
  colors,
  fontSize,
  fontSizes,
  fontWeights,
  letterSpacing,
  spacing,
  space,
  textStyles: {
    caps: {
      textTransform: 'uppercase',
    },
    italic: {
      fontStyle: 'italic',
    },
  },
  transitions,
  zIndexScale,
  zIndexes,
};

export default styled;
export { css, injectGlobal, keyframes, StyledSystemProps, ThemeProvider };
