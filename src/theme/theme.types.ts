/**
 * Link number types and arrays to theme types
 */
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
  flex?: boolean | number;
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
  backgroundImage?: string;
  boxShadow?: string;
  textAlign?: string;
};

export enum BreakpointSizes {
  MEDIUM = 'medium',
  LARGE = 'large',
}
