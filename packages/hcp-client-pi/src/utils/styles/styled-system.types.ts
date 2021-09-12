/**
 * Link number types and arrays to theme types
 */

import { Omit } from 'ramda';

/* P should contain a bunch of props, including a theme that is not directly
* provided to the ThemeConsumer */
export type ThemeConsumer<P extends { theme: P['theme'] }> = Omit<P, 'theme'>;

export type StyledSystemProps = {
  m?: string | number;
  mt?: string | number;
  mr?: string | number;
  mb?: string | number;
  ml?: string | number;
  p?: string | number;
  pt?: string | number;
  pr?: string | number;
  pb?: string | number;
  pl?: string | number;
  px?: string | number;
  py?: string | number;
  width?: string | number;
  w?: string | number;
  fontSize?: string | number;
  lineHeight?: string | number;
  fontWeight?: string | number;
  letterSpacing?: string | number;
  f?: string | number;
  color?: string;
  bg?: string;
  display?: string;
  maxWidth?: string | number;
  minWidth?: string | number;
  height?: string | number;
  maxHeight?: string | number;
  minHeight?: string | number;
  size?: number | number[];
  alignItems?: string;
  alignContent?: string;
  justifyContent?: string;
  flexWrap?: string;
  flexBasis?: string;
  flexDirection?: string;
  flex?: string | boolean;
  justifySelf?: string;
  alignSelf?: string;
  order?: string;
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderColor?: string;
  borderRadius?: string | number;
  position?: string;
  zIndex?: number;
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
};
