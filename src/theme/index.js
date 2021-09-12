import {
  boxShadows,
  boxShadow,
  fontSize,
  fontSizesMap,
  fontWeights,
  borderRadiusMap,
  breakpointsMap,
  spacingMap,
  spacing,
  colors,
  complexStyles,
  BASE_FONT_SIZE,
  transitions,
  transitionEasing,
  transitionSpeed,
  zIndexes,
  zIndexScale,
} from 'src/core/styles';

import { animations } from './animations';
import { letterSpacing } from './typography';

export const theme = {
  BASE_FONT_SIZE,
  animations,
  boxShadow,
  boxShadows,
  borderRadius: borderRadiusMap,
  breakpoints: breakpointsMap,
  colors,
  fontSize,
  fontSizes: fontSizesMap,
  fontWeights,
  letterSpacing,
  spacing,
  space: spacingMap,
  textStyles: complexStyles.textStyles,
  transitions,
  transitionEasing,
  transitionSpeed,
  zIndexScale,
  zIndexes,
};

export type ThemeInterface = typeof theme;
